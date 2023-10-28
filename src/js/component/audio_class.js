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
// function stopAllAudio() {
// 	audioPlayerContainers.forEach(container => {
// 		const audio = container.querySelector('audio');
// 		const playButton = container.querySelector('.audio-player__play');
// 		audio.pause();
// 		playAnimation(playButton).pause();
// 	});
// }
const calculateTime = (secs) => {
	const minutes = Math.floor(secs / 60);
	const seconds = Math.floor(secs % 60);
	const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
	return `${minutes}:${returnedSeconds}`;
}

// class Player {
// 	constructor(container){
// 		this.container = container;
// 		// this.audio = container.querySelector('audio');
// 		this.playButton = container.querySelector('.audio-player__play');
// 		this.muteIconContainer = container.querySelector('.audio-player__mute');
// 		this.seekSlider = container.querySelector('.audio-player__slider_track input[type="range"]');
// 		this.currentTimeContainer = container.querySelector('.currentTime');
// 		this.volumeSlider = container.querySelector('.audio-player__slider_volume input');
// 		this.durationContainer = container.querySelector('.duration');
// 		this.outputContainer = document.querySelector('.volume-output');

// 		this.playState = 'play';
// 		this.muteState = 'unmute';
// 		this.raf = null;

// 		this.player = playAnimation(this.playButton);

// 		this.playerInit();

// 		this.mute = muteAnimation(this.muteIconContainer, this.audio);

// 		this.setupEventListeners();
// 	}
// 	// helper functions
// 	displayDuration(){
// 		return this.durationContainer.textContent = calculateTime(this.audio.duration);
// 	}
// 	setSliderMax(){
// 		return this.seekSlider.max = Math.floor(this.audio.duration);
// 	}
// 	displayBufferedAmount(){
// 		if (this.audio?.buffered?.length > 0) {
// 			const bufferedAmount = Math.floor(this.audio.buffered.end(this.audio.buffered.length - 1));
// 			this.container.style.setProperty('--buffered-width', `${(bufferedAmount / this.seekSlider.max) * 100}%`);
// 		}
// 	}
// 	whilePlaying(){
// 		this.seekSlider.value = Math.floor(this.audio.currentTime);
// 		this.currentTimeContainer.textContent = calculateTime(this.seekSlider.value);
// 		this.container.style.setProperty('--seek-before-width', `${this.seekSlider.value / this.seekSlider.max * 100}%`);
// 		this.raf = requestAnimationFrame(this.whilePlaying);
// 	}
// 	showRangeProgress(rangeInput){
// 		if(rangeInput === this.seekSlider) {
// 			this.container.style.setProperty('--seek-before-width', this.rangeInput.value / this.rangeInput.max * 100 + '%');
// 		} else {
// 			this.container.style.setProperty('--volume-before-width', this.rangeInput.value / this.rangeInput.max * 100 + '%');
// 		}
// 	}

// 	// event listeners
// 	setupEventListeners(){

// 		this.playButton.addEventListener('click', () => {
// 			// stopAllAudio();

// 			if(this.playState === 'play') {
// 				this.audio.play();
// 				this.player.play();
// 				requestAnimationFrame(this.whilePlaying);
// 				this.playState = 'pause';
// 			} else {
// 				this.audio.pause();
// 				this.player.pause();
// 				cancelAnimationFrame(this.raf);
// 				this.playState = 'play';
// 			}
// 		});

// 		this.muteIconContainer.addEventListener('click', () => {
// 			if(this.muteState === 'unmute') {
// 				this.mute.mute();
// 				this.audio.muted = true;
// 				this.muteState = 'mute';
// 			} else {
// 				this.mute.unmute();
// 				this.audio.muted = false;
// 				this.muteState = 'unmute';
// 			}
// 		});


// 		this.seekSlider.addEventListener('input', (e) => {
// 			this.showRangeProgress(e.target);

// 			this.currentTimeContainer.textContent = calculateTime(seekSlider.value);
// 			if(!this.audio.paused) {
// 				cancelAnimationFrame(this.raf);
// 			}
// 		});

// 		this.seekSlider.addEventListener('change', () => {
// 			this.audio.currentTime = this.seekSlider.value;
// 			if(!this.audio.paused) {
// 				requestAnimationFrame(this.whilePlaying);
// 			}
// 		});

// 		this.volumeSlider.addEventListener('input', (e) => {
// 			this.showRangeProgress(e.target);

// 			const value = e.target.value;

// 			this.outputContainer.textContent = value;
// 			this.audio.volume = value / 100;
// 		});
// 	}

// 	playerInit() {
// 		this.audio = this.container.querySelector('audio');
// 		if (this.audio.readyState > 0) {
// 		  this.initPlayer();
// 		} else {
// 		  const loadedmetadataHandler = () => {
// 			this.audio.removeEventListener('loadedmetadata', loadedmetadataHandler);
// 			this.initPlayer();
// 		  };
// 		  this.audio.addEventListener('loadedmetadata', loadedmetadataHandler);
// 		}
// 	  }

// 	  initPlayer() {
// 			this.displayDuration();
// 			this.setSliderMax();
// 			this.displayBufferedAmount();
// 			this.player.pause();
// 			this.audio.addEventListener('progress', this.displayBufferedAmount);
// 	  }

// }

// class AudioPlayer {
// 	constructor(container) {
// 		this.audio = container.querySelector('audio');
// 		this.playButton = container.querySelector('.audio-player__play');
// 		this.muteIconContainer = container.querySelector('.audio-player__mute');
// 		this.seekSlider = container.querySelector('.audio-player__slider_track input[type="range"]');
// 		this.currentTimeContainer = container.querySelector('.currentTime');
// 		this.volumeSlider = container.querySelector('.audio-player__slider_volume input');
// 		this.durationContainer = container.querySelector('.duration');
// 		this.outputContainer = document.querySelector('.volume-output');

// 		this.player = this.playAnimation(this.playButton);
// 		this.mute = this.muteAnimation(this.muteIconContainer, this.audio);

// 		this.playState = 'play';
// 		this.muteState = 'unmute';
// 		this.raf = null;

// 		this.player.pause();

// 		if (this.audio.readyState > 0) {
// 			this.displayDuration();
// 			this.setSliderMax();
// 			this.displayBufferedAmount();
// 		} else {
// 			this.audio.addEventListener('loadedmetadata', () => {
// 				this.displayDuration();
// 				this.setSliderMax();
// 				this.displayBufferedAmount();
// 			});
// 		}

// 		this.audio.addEventListener('progress', this.displayBufferedAmount);

// 		this.playButton.addEventListener('click', () => {
// 			if (this.playState === 'play') {
// 				this.audio.play();
// 				this.player.play();
// 				requestAnimationFrame(this.whilePlaying);
// 				this.playState = 'pause';
// 			} else {
// 				this.audio.pause();
// 				this.player.pause();
// 				cancelAnimationFrame(this.raf);
// 				this.playState = 'play';
// 			}
// 		});

// 		this.muteIconContainer.addEventListener('click', () => {
// 			if (this.muteState === 'unmute') {
// 				this.mute.mute();
// 				this.audio.muted = true;
// 				this.muteState = 'mute';
// 			} else {
// 				this.mute.unmute();
// 				this.audio.muted = false;
// 				this.muteState = 'unmute';
// 			}
// 		});

// 		this.seekSlider.addEventListener('input', (e) => {
// 			this.showRangeProgress(e.target);

// 			this.currentTimeContainer.textContent = this.calculateTime(this.seekSlider.value);
// 			if (!this.audio.paused) {
// 				cancelAnimationFrame(this.raf);
// 			}
// 		});

// 		this.seekSlider.addEventListener('change', () => {
// 			this.audio.currentTime = this.seekSlider.value;
// 			if (!this.audio.paused) {
// 				requestAnimationFrame(this.whilePlaying);
// 			}
// 		});

// 		this.volumeSlider.addEventListener('input', (e) => {
// 			this.showRangeProgress(e.target);

// 			const value = e.target.value;

// 			this.outputContainer.textContent = value;
// 			this.audio.volume = value / 100;
// 		});
// 	}

// 	playAnimation(playButton) {
// 		// implementation
// 	}

// 	muteAnimation(muteIconContainer, audio) {
// 		// implementation
// 	}

// 	calculateTime(secs) {
// 		// implementation
// 	}

// 	displayDuration() {
// 		// implementation
// 	}

// 	setSliderMax() {
// 		// implementation
// 	}

// 	displayBufferedAmount() {
// 		// implementation
// 	}

// 	whilePlaying() {
// 		// implementation
// 	}

// 	showRangeProgress(rangeInput) {
// 		// implementation
// 	}
// }


audioPlayerContainers.forEach(container => {
	// new Player(container);
	const audio = container.querySelector('audio');
	const playButton = container.querySelector('.audio-player__play');
	const muteIconContainer = container.querySelector('.audio-player__mute');
	const seekSlider = container.querySelector('.audio-player__slider_track input[type="range"]');
	const currentTimeContainer = container.querySelector('.currentTime');
	const volumeSlider = container.querySelector('.audio-player__slider_volume input');
	const durationContainer = container.querySelector('.duration');
	const outputContainer = document.querySelector('.volume-output');


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

	if (audio.readyState > 0) {
		displayDuration();
		setSliderMax();
		displayBufferedAmount();
	} else {
		audio.addEventListener('loadedmetadata', () => {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
		});
	}

	audio.addEventListener('progress', displayBufferedAmount);


	// play/stop audio
	playButton.addEventListener('click', () => {
		// stopAllAudio();
		// playAudio(audio);

		if(playState === 'play') {
			audio.play();
			player.play();
			requestAnimationFrame(whilePlaying);
			playState = 'pause';
		} else {
			audio.pause();
			player.pause();
			cancelAnimationFrame(raf);
			playState = 'play';
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
		console.log(rangeInput === seekSlider);
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

// helper functions
function createNodeListIterator(nodeList) {
	let index = 0;

	return {
		get: function (index) {
			if (index >= 0 && index < nodeList.length) {
				this.index = index;
				return {
					value: nodeList[index],
					done: false
				};
			} else {
				return {
					done: true
				};
			}
		},
		next: function () {
			if (index < nodeList.length - 1) {
				index++;
				return {
					value: nodeList[index],
					done: false
				};
			} else {
				return {
					done: true
				};
			}
		},
		prev: function () {
			if (index > 0) {
				index--;
				return {
					value: nodeList[index],
					done: false
				};
			} else {
				return {
					done: true
				};
			}
		},
	}
}


if (listMusic.length) {
	listMusic.forEach(list => {
		const players = list.querySelectorAll('.hps__player');
		// const players = createNodeListIterator(players);
		// console.log(players.get(0));
		// console.log(players.next());
		// console.log(players.next());
		// console.log(players.prev());
		players.forEach(player => {
			const playButton = player.querySelector('.hps__player-btn');
			playButton.addEventListener('click', (e) => {
				const currentLineIndex = +e.target.closest('.js-list-music-item').dataset.index;
				const activePlayer = list.querySelector('.is-player-active');

				if (player === activePlayer) {
					player.classList.remove('is-player-active');
				} else {
					if (activePlayer) {
						activePlayer.classList.remove('is-player-active');
					}
					player.classList.add('is-player-active');
				}
			});
		});
	});

	document.addEventListener('click', (e) => {
		if (!e.target.closest('.hps__player')) {
			const activePlayer = document.querySelector('.is-player-active');
			if (activePlayer) {
				activePlayer.classList.remove('is-player-active');
			}
		}
	});
}
