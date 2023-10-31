
(function audioPlayers() {

	const audioPlayerContainers = document.querySelectorAll('.audio-player');
	const listMusic = document.querySelectorAll('.js-list-music');

	// helper functions
	function playAnimation(playIconContainer) {
		return {
			play: () => {
				playIconContainer.classList.add('is-playing');
			},
			pause: () => {
				playIconContainer.classList.remove('is-playing');
			}
		};
	}

	function muteAnimation(muteIconContainer, audio) {
		return {
			mute: () => {
				muteIconContainer.classList.add('is-muted');
				audio.muted = true;
			},
			unmute: () => {
				muteIconContainer.classList.remove('is-muted');
				audio.muted = false;
			}
		};
	}
	function stopAllAudio() {
		audioPlayerContainers.forEach(container => {
			const audio = container.querySelector('audio');
			const playButton = container.querySelector('.audio-player__play');
			audio.pause();
			playAnimation(playButton).pause();
		});
	}
	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	}

	let audioPlayers = [];


	audioPlayerContainers.forEach((container, i) => {
		const audio = container.querySelector('audio');
		const playButton = container.querySelector('.js-Player-play');
		const muteIconContainer = container.querySelector('.js-Player-mute');
		const seekSlider = container.querySelector('.audio-player__slider_track input[type="range"]');
		const currentTimeContainer = container.querySelector('.currentTime');
		const volumeSlider = container.querySelector('.audio-player__slider_volume input');
		const durationContainer = container.querySelector('.duration');
		const outputContainer = document.querySelector('.volume-output');

		const closestLine = container.closest('.js-list-music-item');
		const closestList = container.closest('.js-list-music');

		let songId = i;

		if(!!closestLine && !!closestList){
			songId = closestList?.dataset?.musicList + '' + closestLine?.dataset?.index;
		}


		const player = playAnimation(playButton);
		const mute = muteAnimation(muteIconContainer, audio);

		let playState = 'play';
		let muteState = 'unmute';
		let raf = null;


		player.pause();


		// helper functions

		const displayDuration = () => {
			durationContainer.textContent = calculateTime(audio.duration);
		}
		const setSliderMax = () => {
			seekSlider.max = Math.floor(audio.duration);
		}
		const displayBufferedAmount = () => {
			if (audio.buffered.length > 0) {
				const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
				container.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
			}
		}
		const whilePlaying = () => {
			seekSlider.value = Math.floor(audio.currentTime);
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
			container.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);

			raf = requestAnimationFrame(whilePlaying);
		}
		const letsPlay = function() {
			audio.play();
			player.play();
			requestAnimationFrame(whilePlaying);
			playState = 'pause';

		};

		const letsStop = function() {
			audio.pause();
			player.pause();
			cancelAnimationFrame(raf);
			playState = 'play';
		}


		const pushThisAudio = () => {
			audioPlayers.push({'id': songId, 'player': audio, letsPlay: letsPlay, letsStop: letsStop});
		}



		if (audio.readyState > 0) {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
			pushThisAudio();
		} else {
			audio.addEventListener('loadedmetadata', () => {
				displayDuration();
				setSliderMax();
				displayBufferedAmount();
				pushThisAudio();
			});
		}

		audio.addEventListener('progress', displayBufferedAmount);




		// play/stop audio
		playButton.addEventListener('click', (e) => {

			// stopAllAudio();
			// playAudio(audio);

			if(playState === 'play') {
				letsPlay()
			} else {
				letsStop()
			}
		});

		// mute/unmute audio
		muteIconContainer.addEventListener('click', () => {
			if(muteState === 'unmute') {
				mute.mute();
				audio.muted = true;
				muteState = 'mute';
			} else {
				mute.unmute();
				audio.muted = false;
				muteState = 'unmute';
			}
		});

		const showRangeProgress = (rangeInput) => {
			// console.log(rangeInput === seekSlider);
			if(rangeInput === seekSlider) {
				container.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
			} else {
				container.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
			}
		}


		seekSlider.addEventListener('input', (e) => {
			showRangeProgress(e.target);

			currentTimeContainer.textContent = calculateTime(seekSlider.value);
			if(!audio.paused) {
				cancelAnimationFrame(raf);
			}
		});

		seekSlider.addEventListener('change', () => {
			audio.currentTime = seekSlider.value;
			if(!audio.paused) {
				requestAnimationFrame(whilePlaying);
			}
		});

		volumeSlider.addEventListener('input', (e) => {
			showRangeProgress(e.target);

			const value = e.target.value;

			outputContainer.textContent = value;
			audio.volume = value / 100;
		});

	});


	// console.log(audioPlayers);

	// helper functions
	function createNodeListIterator(nodeList) {
		let index = 0;

		return {
			get: function(index) {
				if (index >= 0 && index < nodeList.length) {
					this.index = index;
					return { value: nodeList[index], done: false };
				} else {
					return { done: true };
				}
			},
			next: function() {
				if (index < nodeList.length - 1) {
					index++;
					return { value: nodeList[index], done: false };
				} else {
					return { done: true };
				}
			},
			prev: function() {
				if (index > 0) {
					index--;
					return { value: nodeList[index], done: false };
				} else {
					return { done: true };
				}
			},
		}
	}
	function getCurrentLineIndex(elem) {
		return +elem.closest('.js-list-music-item').dataset.index;
	}
	function getCurrentIndex(elem) {
		const listIndx = elem.closest('.js-list-music').dataset.musicList;
		const lineIndx = elem.closest('.js-list-music-item').dataset.index;
		return listIndx + '' + lineIndx ;
	}

	function getNeededPlayer(innerId) {
		return audioPlayers.filter(player => player.id === innerId)[0];
	}

	function getActivePlayer() {
		return audioPlayers.filter(audioPlayer => !audioPlayer.player.paused);
	}

	function playNext(player, currentLineIndex, players, fullIndx){
		player.classList.remove('is-player-active');
		getNeededPlayer(fullIndx).letsStop();
		players[currentLineIndex + 1].classList.add('is-player-active');
		getNeededPlayer(getCurrentIndex(players[currentLineIndex + 1])).letsPlay();
	}

	if(listMusic.length){
		listMusic.forEach(list =>{
			const players = list.querySelectorAll('.hps__player');
			const btnPlayAll = list.querySelector('.js-play-all');


			// const players = createNodeListIterator(players);
			// console.log(players.get(0));
			// console.log(players.next());
			// console.log(players.next());
			// console.log(players.prev());

			// const iconNote = list.querySelector('.icon-note');

			// iconNote.addEventListener('click', () => {
			// 	console.log(getActivePlayer())
			// });

			players.forEach(player => {
				const playButton = player.querySelector('.hps__player-btn');
				const prevTrackButton = player.querySelector('.js-Player-prev');
				const nextTrackButton = player.querySelector('.js-Player-next');
				const currentLineIndex  = getCurrentLineIndex(player);

				const fullIndx = getCurrentIndex(player);
				// console.log(fullIndx);

				if(currentLineIndex === 0){
					prevTrackButton.classList.add('is-disabled');
				}
				if(currentLineIndex === players.length - 1){
					nextTrackButton.classList.add('is-disabled');
				}






				playButton.addEventListener('click', (e) => {
					const currentPlayer = getNeededPlayer(fullIndx);
					if(player.classList.contains('is-player-active')) {
						player.classList.remove('is-player-active');
						currentPlayer.letsStop();
					} else {
						if(getActivePlayer().length){
							const activeModalPlayer = document.querySelectorAll('.is-player-active');
							if(activeModalPlayer.length){
								activeModalPlayer.forEach(activePlayer => {
									activePlayer.classList.remove('is-player-active');
								});
							}
							getActivePlayer().forEach(activePlayer => {
								getNeededPlayer(activePlayer.id).letsStop();
							});
						}
						player.classList.add('is-player-active');
						currentPlayer.letsPlay();



						const endedHandler = () => {
							player.classList.remove('is-player-active');
							currentPlayer.letsStop();

							console.log('sdf');
							const nextPlayerBtnWrapper = currentPlayer.player.closest('.js-list-music-item').nextElementSibling;
							if (nextPlayerBtnWrapper) {
								const btn = nextPlayerBtnWrapper.querySelector('.hps__player-btn')
								btn.click();
							} else {
								if(btnPlayAll.classList.contains('is-playing')) {
									btnPlayAll.classList.remove('is-playing');
								}
							}

							currentPlayer.player.removeEventListener('ended', endedHandler);
						};


						currentPlayer.player.addEventListener('ended', endedHandler);

					}
				});

				nextTrackButton.addEventListener('click', () => {
					const nextPlayerBtnWrapper = nextTrackButton.closest('.js-list-music-item').nextElementSibling;
					if (nextPlayerBtnWrapper) {
						const btn = nextPlayerBtnWrapper.querySelector('.hps__player-btn')
						btn.click();
					}
				// if(currentLineIndex < players.length - 1){
				// 		playNext(player, currentLineIndex, players, fullIndx);
				// 	}
				});

				prevTrackButton.addEventListener('click', () => {
					const prevPlayerBtnWrapper = prevTrackButton.closest('.js-list-music-item').previousElementSibling;
					if (prevPlayerBtnWrapper) {
						const btn = prevPlayerBtnWrapper.querySelector('.hps__player-btn')
						btn.click();
					}
					// if(currentLineIndex > 0){
					// 	player.classList.remove('is-player-active');
					// 	getNeededPlayer(fullIndx).letsStop();
					// 	players[currentLineIndex - 1].classList.add('is-player-active');
					// 	getNeededPlayer(getCurrentIndex(players[currentLineIndex - 1])).letsPlay();
					// }
				});


			});

			btnPlayAll.addEventListener('click', () => {
				if(btnPlayAll.classList.contains('is-playing')) {
					btnPlayAll.classList.remove('is-playing');
					getActivePlayer().forEach(activePlayer => {
						getNeededPlayer(activePlayer.id).letsStop();
					});
					return;
				} else {
					btnPlayAll.classList.add('is-playing');
					const firstPlayer = players[0];
					setTimeout(() => {
						firstPlayer.querySelector('.hps__player-btn').click();
					}, 100);
				}
			});
		});

		document.addEventListener('click', (e) => {
			if(!e.target.closest('.hps__player')){
				const activePlayers = document.querySelectorAll('.is-player-active');
				if(activePlayers.length){
					activePlayers.forEach(activePlayer => {
						activePlayer.classList.remove('is-player-active');
						getNeededPlayer(getCurrentIndex(activePlayer)).letsStop();
					});


					const btnPlayAll = document.querySelectorAll('.js-play-all');
					// console.log(btnPlayAll);
					btnPlayAll.forEach(btn => {
						if(btn.classList.contains('is-playing')) {
							btn.classList.remove('is-playing');
						}
					});

				}
			}
		});
	}

})();
