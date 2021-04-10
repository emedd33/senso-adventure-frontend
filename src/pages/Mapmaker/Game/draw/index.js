
import * as PIXI from 'pixi.js'
import backgroundPath from "../../assets/background.png"
import dungeonTile1Path from "../../assets/textures/dungeon-tile/dungeon-tile-1.png"
import dungeonTile2Path from "../../assets/textures/dungeon-tile/dungeon-tile-2.png"
import dungeonTile3Path from "../../assets/textures/dungeon-tile/dungeon-tile-3.png"
import dungeonTile4Path from "../../assets/textures/dungeon-tile/dungeon-tile-4.png"
import dungeonTile5Path from "../../assets/textures/dungeon-tile/dungeon-tile-5.png"
import dungeonTile6Path from "../../assets/textures/dungeon-tile/dungeon-tile-6.png"
import dungeonTile7Path from "../../assets/textures/dungeon-tile/dungeon-tile-7.png"
import dungeonTile8Path from "../../assets/textures/dungeon-tile/dungeon-tile-8.png"
import dungeonTile9Path from "../../assets/textures/dungeon-tile/dungeon-tile-9.png"
import dungeonTile10Path from "../../assets/textures/dungeon-tile/dungeon-tile-10.png"
import dungeonTile11Path from "../../assets/textures/dungeon-tile/dungeon-tile-11.png"
import dungeonTile12Path from "../../assets/textures/dungeon-tile/dungeon-tile-12.png"
import dungeonTile13Path from "../../assets/textures/dungeon-tile/dungeon-tile-13.png"
import dungeonTile14Path from "../../assets/textures/dungeon-tile/dungeon-tile-14.png"
import dungeonTile15Path from "../../assets/textures/dungeon-tile/dungeon-tile-15.png"
import dungeonTile16Path from "../../assets/textures/dungeon-tile/dungeon-tile-16.png"
import dungeonTile17Path from "../../assets/textures/dungeon-tile/dungeon-tile-17.png"
import dungeonTile18Path from "../../assets/textures/dungeon-tile/dungeon-tile-18.png"
import dungeonTile19Path from "../../assets/textures/dungeon-tile/dungeon-tile-19.png"
import dungeonTile20Path from "../../assets/textures/dungeon-tile/dungeon-tile-20.png"
import dungeonTile21Path from "../../assets/textures/dungeon-tile/dungeon-tile-21.png"
import dungeonTile22Path from "../../assets/textures/dungeon-tile/dungeon-tile-22.png"
import dungeonTile23Path from "../../assets/textures/dungeon-tile/dungeon-tile-23.png"
import dungeonTile24Path from "../../assets/textures/dungeon-tile/dungeon-tile-24.png"
import dungeonTile25Path from "../../assets/textures/dungeon-tile/dungeon-tile-25.png"
import dungeonTile26Path from "../../assets/textures/dungeon-tile/dungeon-tile-26.png"
import dungeonTile27Path from "../../assets/textures/dungeon-tile/dungeon-tile-27.png"
import dungeonTile28Path from "../../assets/textures/dungeon-tile/dungeon-tile-28.png"
import dungeonTile29Path from "../../assets/textures/dungeon-tile/dungeon-tile-29.png"
import dungeonTile30Path from "../../assets/textures/dungeon-tile/dungeon-tile-30.png"
import dungeonTile31Path from "../../assets/textures/dungeon-tile/dungeon-tile-31.png"
import dungeonTile32Path from "../../assets/textures/dungeon-tile/dungeon-tile-32.png"
import dungeonTile33Path from "../../assets/textures/dungeon-tile/dungeon-tile-33.png"
import dungeonTile34Path from "../../assets/textures/dungeon-tile/dungeon-tile-34.png"
import dungeonTile35Path from "../../assets/textures/dungeon-tile/dungeon-tile-35.png"
import dungeonTile36Path from "../../assets/textures/dungeon-tile/dungeon-tile-36.png"
import dungeonTile37Path from "../../assets/textures/dungeon-tile/dungeon-tile-37.png"
import dungeonTile38Path from "../../assets/textures/dungeon-tile/dungeon-tile-38.png"
import dungeonTile39Path from "../../assets/textures/dungeon-tile/dungeon-tile-39.png"
import dungeonTile40Path from "../../assets/textures/dungeon-tile/dungeon-tile-40.png"
import dungeonTile41Path from "../../assets/textures/dungeon-tile/dungeon-tile-41.png"
import dungeonTile42Path from "../../assets/textures/dungeon-tile/dungeon-tile-42.png"
import dungeonTile43Path from "../../assets/textures/dungeon-tile/dungeon-tile-43.png"
import dungeonTile44Path from "../../assets/textures/dungeon-tile/dungeon-tile-44.png"
import dungeonTile45Path from "../../assets/textures/dungeon-tile/dungeon-tile-45.png"
import dungeonTile46Path from "../../assets/textures/dungeon-tile/dungeon-tile-46.png"
import dungeonTile47Path from "../../assets/textures/dungeon-tile/dungeon-tile-47.png"
import item from "../../assets/textures/items/item.png"
import { getTilePosition, getGameMatrixIndex } from "../../utils/position"
import { CENTER, WIDTH } from "../../assets/Constants"
import { drawSprite, drawSurroundingSprites } from "./drawTile/index"
export function setUpGrid(app, gameMatrix) {

    const loader = new PIXI.Loader(); // you can also create your own if you want
    const textures = {}
    let drawType = "tiles";
    loader
        .add("dungeonTile1", dungeonTile1Path)
        .add("dungeonTile2", dungeonTile2Path)
        .add("dungeonTile3", dungeonTile3Path)
        .add("dungeonTile4", dungeonTile4Path)
        .add("dungeonTile5", dungeonTile5Path)
        .add("dungeonTile6", dungeonTile6Path)
        .add("dungeonTile7", dungeonTile7Path)
        .add("dungeonTile8", dungeonTile8Path)
        .add("dungeonTile9", dungeonTile9Path)
        .add("dungeonTile10", dungeonTile10Path)
        .add("dungeonTile11", dungeonTile11Path)
        .add("dungeonTile12", dungeonTile12Path)
        .add("dungeonTile13", dungeonTile13Path)
        .add("dungeonTile14", dungeonTile14Path)
        .add("dungeonTile15", dungeonTile15Path)
        .add("dungeonTile16", dungeonTile16Path)
        .add("dungeonTile17", dungeonTile17Path)
        .add("dungeonTile18", dungeonTile18Path)
        .add("dungeonTile19", dungeonTile19Path)
        .add("dungeonTile20", dungeonTile20Path)
        .add("dungeonTile21", dungeonTile21Path)
        .add("dungeonTile22", dungeonTile22Path)
        .add("dungeonTile23", dungeonTile23Path)
        .add("dungeonTile24", dungeonTile24Path)
        .add("dungeonTile25", dungeonTile25Path)
        .add("dungeonTile26", dungeonTile26Path)
        .add("dungeonTile27", dungeonTile27Path)
        .add("dungeonTile28", dungeonTile28Path)
        .add("dungeonTile29", dungeonTile29Path)
        .add("dungeonTile30", dungeonTile30Path)
        .add("dungeonTile31", dungeonTile31Path)
        .add("dungeonTile32", dungeonTile32Path)
        .add("dungeonTile33", dungeonTile33Path)
        .add("dungeonTile34", dungeonTile34Path)
        .add("dungeonTile35", dungeonTile35Path)
        .add("dungeonTile36", dungeonTile36Path)
        .add("dungeonTile37", dungeonTile37Path)
        .add("dungeonTile38", dungeonTile38Path)
        .add("dungeonTile39", dungeonTile39Path)
        .add("dungeonTile40", dungeonTile40Path)
        .add("dungeonTile41", dungeonTile41Path)
        .add("dungeonTile42", dungeonTile42Path)
        .add("dungeonTile43", dungeonTile43Path)
        .add("dungeonTile44", dungeonTile44Path)
        .add("dungeonTile45", dungeonTile45Path)
        .add("dungeonTile46", dungeonTile46Path)
        .add("dungeonTile47", dungeonTile47Path)
        .add("background", backgroundPath)

        .add("item", item)

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
        if (this.dragging) {
            const newPosition = getTilePosition(event.data.getLocalPosition(this.parent));
            if (newPosition.x !== this.data.x || newPosition.y !== this.data.y) {
                this.alpha = 0.5;
                this.data = newPosition
                addToGrid(newPosition, textures)

            }
        }
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
            console.log("asd")
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
            .on('pointermove', onDragMove);

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