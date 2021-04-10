import * as PIXI from 'pixi.js';
// import backgroundPath from "../assets/background.png"
import { setUpGrid } from "./draw"
const WIDTH = 128 * 6
const HEIGHT = 128 * 6
export function createGame() {
    const app = new PIXI.Application({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8
    })
    const tilesMatrix = new Array((WIDTH / 32) * (HEIGHT / 32)).fill(0);
    app.renderer.backgroundColor = 0xFAEBD7
    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const loader = new PIXI.Loader(); // you can also create your own if you want
    const textures = {}

    // loader
    //     .add("background", backgroundPath)
    // loader.load((loader, resources) => {

    //     const backgroundSprite = new PIXI.Sprite(PIXI.utils.TextureCache.background);
    //     backgroundSprite.anchor.set(0.5);
    //     backgroundSprite.x = app.screen.width / 2;
    //     backgroundSprite.y = app.screen.height / 2;
    //     backgroundSprite.interactive = true;
    //     backgroundSprite.buttonMode = true;
    //     app.stage.addChild(backgroundSprite);

    // })
    setUpGrid(app, tilesMatrix)

    return app
}