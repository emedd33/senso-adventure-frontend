import * as PIXI from 'pixi.js';
// import backgroundPath from "../assets/background.png"
import { setUpGame } from "./draw"
import { HEIGHT, WIDTH } from "../assets/Constants"
export function createGame() {
    const app = new PIXI.Application({
        width: WIDTH,
        height: HEIGHT
    })
    const tilesMatrix = new Array((WIDTH / 32) * (HEIGHT / 32)).fill(0);
    app.renderer.backgroundColor = 0xFAEBD7
    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const loader = new PIXI.Loader(); // you can also create your own if you want
    const textures = {}

    setUpGame(app, tilesMatrix)

    return app
}