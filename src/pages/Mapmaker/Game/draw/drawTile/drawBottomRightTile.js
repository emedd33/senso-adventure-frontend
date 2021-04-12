import {
    TEXTURE_WIDTH, TEXTURE_HEIGHT, MATRIX_WIDTH,
    NO_TILE,
    BOTTOMRIGHT,
    BOTTOM,
    BOTTOMLEFT,
    RIGHT,
    CENTER,
    TOPRIGHT,
    TOPLEFT,

    SWING_RIGHT_UP,

    SWING_RIGHT_UP_TOPLEFT,

    RIGHT_TOPLEFT,
    RIGHT_BOTTOMLEFT,
    BOTTOM_TOPRIGHT,
    BOTTOM_TOPLEFT,

    RIGHT_BOTTOMLEFT_TOPLEFT,
    BOTTOM_TOPLEFT_TOPRIGHT,
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

export function drawBottomRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let bottomRightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        bottomRightIndex = index + MATRIX_WIDTH + 1
    }
    const bottomRightTile = gameMatrix[bottomRightIndex]
    if (bottomRightTile === CENTER) {
        return
    }
    if (bottomRightTile === NO_TILE) {
        drawSprite(app, gameMatrix, textures.topleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT)
    }
    if (bottomRightTile === TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftTopright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT)
    }
    else if (bottomRightTile === RIGHT) {
        drawSprite(app, gameMatrix, textures.rightTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, RIGHT_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMRIGHT)

    } else if (bottomRightTile === BOTTOM) {
        drawSprite(app, gameMatrix, textures.bottomTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, BOTTOM_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMLEFT)
    }
    else if (bottomRightTile === SWING_RIGHT_UP) {
        drawSprite(app, gameMatrix, textures.swingRightUpTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOM_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.bottomTopleftTopright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (bottomRightTile === RIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.rightTopleftBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
}