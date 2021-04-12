
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
    // app.stage.width = 6000
    // app.stage.width = .7
    app.stage.scale.x = 0.5
    app.stage.scale.y = 0.5

    // app.stage.position.x = 128
    // app.stage.position.y = 128
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
        // no implemented yet
        // TODO make zooming work
        let wDelta = event.wheelDelta < 0 ? 'down' : 'up';
        // Initial scale is set to 1.5, so user can zoom out to 1.05 and zoom in to 1.95 
        if (wDelta === "down") {
            if (app.stage.width >= 3800) {
                app.stage.scale.x -= .05
                app.stage.scale.y -= .05
                console.log(app.stage.width)
            } 
        } else if (wDelta === "up") {
            if (app.stage.scale.y <= 1) {

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
            // sprite.scale = 0.9
            sprite.y = pos.y
            sprite.x = pos.x;
            sprite.scale.set(0.5)
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
        // app.view.addEventListener("mousewheel", onScroll)
        textures.bottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.bottomright.frame = new PIXI.Rectangle(0,0,32,32)
        textures.bottom = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.bottom.frame = new PIXI.Rectangle(32,0,32,32)
        textures.bottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.bottomleft.frame = new PIXI.Rectangle(32*2,0,32,32)
        textures.right = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.right.frame = new PIXI.Rectangle(32*3,0,32,32)
        textures.center = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.center.frame = new PIXI.Rectangle(32*4,0,32,32)
        textures.left = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.left.frame = new PIXI.Rectangle(32*5,0,32,32)
        textures.topright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.topright.frame = new PIXI.Rectangle(32*6,0,32,32)
        textures.top = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.top.frame = new PIXI.Rectangle(0,32,32,32)
        textures.topleft = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.topleft.frame = new PIXI.Rectangle(32,32,32,32)
        textures.swingUpRight = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingUpRight.frame = new PIXI.Rectangle(32*2,32,32,32)
        textures.swingRightDown = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingRightDown.frame = new PIXI.Rectangle(32*3,32,32,32)
        textures.swingRightUp = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingRightUp.frame = new PIXI.Rectangle(32*4,32,32,32)
        textures.swingDownRight = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingDownRight.frame = new PIXI.Rectangle(32*5,32,32,32)
        textures.UFromLeft = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.UFromLeft.frame = new PIXI.Rectangle(32*6,32,32,32)
        textures.UFromTop = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.UFromTop.frame = new PIXI.Rectangle(0,32*2,32,32)
        textures.UFromRight = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.UFromRight.frame = new PIXI.Rectangle(32,32*2,32,32)
        textures.UFromBottom = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.UFromBottom.frame = new PIXI.Rectangle(32*3,32*2,32,32)
        textures.circle = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.circle.frame = new PIXI.Rectangle(32*4,32*2,32,32)
        textures.swingUpRightBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingUpRightBottomright.frame = new PIXI.Rectangle(32*5,32*2,32,32)
        textures.swingRightUpTopleft = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingRightUpTopleft.frame = new PIXI.Rectangle(32*6,32*2,32,32)
        textures.swingDownRightTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.swingDownRightTopright.frame = new PIXI.Rectangle(0,32*3,32,32)
        textures.leftRight = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.leftRight.frame = new PIXI.Rectangle(32,32*3,32,32)
        textures.topBottom = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.topBottom.frame = new PIXI.Rectangle(32*2,32*3,32,32)
        textures.leftTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.leftTopright.frame = new PIXI.Rectangle(32*3,32*3,32,32)
        textures.leftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
        textures.leftBottomright.frame = new PIXI.Rectangle(32*4,32*3,32,32)
        textures.topBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
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
    console.log(app.stage.width)


    })

}