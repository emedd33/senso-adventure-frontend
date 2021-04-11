import {
    TEXTURE_WIDTH, TEXTURE_HEIGHT, MATRIX_WIDTH,
    NO_TILE,
    BOTTOMRIGHT,
    BOTTOMLEFT,
    CENTER,
    LEFT,
    TOPRIGHT,
    TOP,
    TOPLEFT,
    SWING_UP_RIGHT,
    SWING_UP_RIGHT_BOTTOMRIGHT,
    LEFT_TOPRIGHT,
    LEFT_BOTTOMRIGHT,
    TOP_BOTTOMLEFT,
    TOP_BOTTOMRIGHT,
    TOP_BOTTOMLEFT_BOTTOMRIGHT,
    LEFT_TOPRIGHT_BOTTOMRIGHT,
    TOPLEFT_TOPRIGHT,
    TOPLEFT_BOTTOMLEFT,
    BOTTOMLEFT_BOTTOMRIGHT,
    TOPRIGHT_BOTTOMRIGHT,
    TOPLEFT_TOPRIGHT_BOTTOMRIGHT,
    TOPLEFT_TOPRIGHT_BOTTOMLEFT,
    TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT,
    TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT,
    TOPRIGHT_BOTTOMLEFT,
    TOPLEFT_BOTTOMRIGHT,
    TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT
} from "../../../assets/Constants"
import { drawSprite } from "./index"

export function drawTopLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let topLeftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        topLeftIndex = index - MATRIX_WIDTH - 1
    }
    const topLeftTile = gameMatrix[topLeftIndex]
    if (topLeftTile === CENTER) {
        return
    }
    if (topLeftTile === NO_TILE) {
        drawSprite(app, gameMatrix, textures.bottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, BOTTOMRIGHT)
    }
    if (topLeftTile === BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.bottomLeftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === LEFT) {
        drawSprite(app, gameMatrix, textures.leftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, LEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.toprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPRIGHT_BOTTOMRIGHT)

    } else if (topLeftTile === TOP) {
        drawSprite(app, gameMatrix, textures.topBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOP_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT) {
        drawSprite(app, gameMatrix, textures.topleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === SWING_UP_RIGHT) {
        drawSprite(app, gameMatrix, textures.swingUpRightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === LEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.LeftToprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOP_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.toprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }


}