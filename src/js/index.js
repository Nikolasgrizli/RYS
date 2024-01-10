import "../pug/index.pug";
import "../scss/index.scss";
import "./component/index.js";

// SVG
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('../svgSprite/', true, /\.svg$/));



