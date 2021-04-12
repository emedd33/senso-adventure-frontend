import * as PIXI from 'pixi.js';
// import backgroundPath from "../assets/background.png"
import { setUpGame } from "./draw/draw"
import { HEIGHT, MATRIX_HEIGHT, MATRIX_WIDTH, WIDTH } from "../assets/Constants"
export function createGame() {
    const app = new PIXI.Application({
        width: WIDTH,
        height: HEIGHT
    })
    const gameMatrix = new Array(MATRIX_WIDTH * MATRIX_HEIGHT).fill(0);
    app.renderer.backgroundColor = 0xFAEBD7
    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    setUpGame(app, gameMatrix)

    return app
}