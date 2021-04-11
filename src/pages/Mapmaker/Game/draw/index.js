
import * as PIXI from 'pixi.js'
import { getTilePosition, getGameMatrixIndex } from "../../utils/position"
import { CENTER } from "../../assets/Constants"
import { drawSprite, drawSurroundingSprites } from "./drawTile/index"
import { loadBackground, loadObjects, loadTiles } from '../loadAssets';
export function setUpGame(app, gameMatrix) {

    const loader = new PIXI.Loader(); // you can also create your own if you want
    const textures = {}
    let drawType = "tiles";
    loadTiles(loader)
    loadObjects(loader)
    loadBackground(loader)
    app.stage.scale.x = 1.5
    app.stage.scale.y = 1.5
    function onClick(event) {
        const pos = event.data.getLocalPosition(this.parent)
        addToGrid(pos, textures)
    }
    function onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = getTilePosition(event.data);
        this.dragging = true;
    }

    function onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }


    function onDragMove(event) {
        if (this.dragging && drawType === "tiles") {
            const newPosition = getTilePosition(event.data.getLocalPosition(this.parent));
            if (newPosition.x !== this.data.x || newPosition.y !== this.data.y) {
                this.alpha = 0.5;
                this.data = newPosition
                addToGrid(newPosition, textures)

            }
        }
    }

    function onScroll(event) {
        let wDelta = event.wheelDelta < 0 ? 'down' : 'up';
        // Initial scale is set to 1.5, so user can zoom out to 1.05 and zoom in to 1.95 
        if (wDelta === "down") {
            if (app.stage.scale.y >= 1.05) {
                app.stage.scale.x -= .05
                app.stage.scale.y -= .05
            }
        } else if (wDelta === "up") {
            if (app.stage.scale.y <= 1.9) {

                app.stage.scale.x += .05
                app.stage.scale.y += .05
            }
        }

        event.preventDefault()

    }
    function addToGrid(pos, tileTextures) {
        if (drawType === "tiles") {

            const transformedPos = getTilePosition(pos)
            const index = getGameMatrixIndex(transformedPos.x, transformedPos.y)
            drawSprite(app, gameMatrix, textures.center, transformedPos.y, transformedPos.x, index, CENTER)
            drawSurroundingSprites(
                app,
                gameMatrix,
                tileTextures,
                transformedPos.x,
                transformedPos.y,
                index,
            )
        } else if (drawType === "items") {
            const sprite = new PIXI.Sprite(PIXI.utils.TextureCache.item);
            sprite.y = pos.y
            sprite.x = pos.x;
            sprite.anchor.set(0.5)
            app.stage.addChild(sprite)
        }

    }
    loader.load((loader, resources) => {

        const backgroundSprite = new PIXI.Sprite(PIXI.utils.TextureCache.background);
        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = app.screen.width / 2;
        backgroundSprite.y = app.screen.height / 2;
        backgroundSprite.interactive = true;
        backgroundSprite.buttonMode = true;
        document.getElementById("change-to-items").addEventListener("click", function () {
            drawType = "items"
        })
        document.getElementById("change-to-tiles").addEventListener("click", function () {
            drawType = "tiles"
        })
        backgroundSprite.on('pointerdown', onClick)
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove)
            .on("mousewheel", onScroll)
        app.view.addEventListener("mousewheel", onScroll)
        textures.bottomright = PIXI.utils.TextureCache.dungeonTile1
        textures.bottom = PIXI.utils.TextureCache.dungeonTile2
        textures.bottomleft = PIXI.utils.TextureCache.dungeonTile3
        textures.right = PIXI.utils.TextureCache.dungeonTile4
        textures.center = PIXI.utils.TextureCache.dungeonTile5
        textures.left = PIXI.utils.TextureCache.dungeonTile6
        textures.topright = PIXI.utils.TextureCache.dungeonTile7
        textures.top = PIXI.utils.TextureCache.dungeonTile8
        textures.topleft = PIXI.utils.TextureCache.dungeonTile9
        textures.swingUpRight = PIXI.utils.TextureCache.dungeonTile10
        textures.swingRightDown = PIXI.utils.TextureCache.dungeonTile11
        textures.swingRightUp = PIXI.utils.TextureCache.dungeonTile12
        textures.swingDownRight = PIXI.utils.TextureCache.dungeonTile13
        textures.UFromLeft = PIXI.utils.TextureCache.dungeonTile14
        textures.UFromTop = PIXI.utils.TextureCache.dungeonTile15
        textures.UFromRight = PIXI.utils.TextureCache.dungeonTile16
        textures.UFromBottom = PIXI.utils.TextureCache.dungeonTile17
        textures.circle = PIXI.utils.TextureCache.dungeonTile18
        textures.swingUpRightBottomright = PIXI.utils.TextureCache.dungeonTile19
        textures.swingRightDownBottomleft = PIXI.utils.TextureCache.dungeonTile20
        textures.swingRightUpTopleft = PIXI.utils.TextureCache.dungeonTile21
        textures.swingDownRightTopright = PIXI.utils.TextureCache.dungeonTile22
        textures.leftRight = PIXI.utils.TextureCache.dungeonTile23
        textures.topBottom = PIXI.utils.TextureCache.dungeonTile24
        textures.leftTopright = PIXI.utils.TextureCache.dungeonTile25
        textures.leftBottomright = PIXI.utils.TextureCache.dungeonTile26
        textures.topBottomleft = PIXI.utils.TextureCache.dungeonTile27
        textures.topBottomright = PIXI.utils.TextureCache.dungeonTile28
        textures.rightTopleft = PIXI.utils.TextureCache.dungeonTile29
        textures.rightBottomleft = PIXI.utils.TextureCache.dungeonTile30
        textures.bottomTopright = PIXI.utils.TextureCache.dungeonTile31
        textures.bottomTopleft = PIXI.utils.TextureCache.dungeonTile32
        textures.LeftToprightBottomright = PIXI.utils.TextureCache.dungeonTile33
        textures.topBottomleftBottomright = PIXI.utils.TextureCache.dungeonTile34
        textures.rightTopleftBottomleft = PIXI.utils.TextureCache.dungeonTile35
        textures.bottomTopleftTopright = PIXI.utils.TextureCache.dungeonTile36
        textures.topleftTopright = PIXI.utils.TextureCache.dungeonTile37
        textures.topleftBottomleft = PIXI.utils.TextureCache.dungeonTile38
        textures.bottomLeftBottomright = PIXI.utils.TextureCache.dungeonTile39
        textures.toprightBottomright = PIXI.utils.TextureCache.dungeonTile40
        textures.topleftToprightBottomright = PIXI.utils.TextureCache.dungeonTile41
        textures.topleftToprightBottomleft = PIXI.utils.TextureCache.dungeonTile42
        textures.topleftBottomleftBottomright = PIXI.utils.TextureCache.dungeonTile43
        textures.toprightBottomleftBottomright = PIXI.utils.TextureCache.dungeonTile44
        textures.toprightBottomleft = PIXI.utils.TextureCache.dungeonTile45
        textures.topleftBottomright = PIXI.utils.TextureCache.dungeonTile46
        textures.topleftToprightBottomleftBottomright = PIXI.utils.TextureCache.dungeonTile47
        app.stage.addChild(backgroundSprite);

    })

}