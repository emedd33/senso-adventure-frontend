import {
    WIDTH, TEXTURE_WIDTH, TEXTURE_HEIGHT, MATRIX_WIDTH,
    NO_TILE,
    BOTTOMRIGHT,
    BOTTOM,
    BOTTOMLEFT,
    RIGHT,
    CENTER,
    LEFT,
    TOPRIGHT,
    TOP,
    TOPLEFT,
    SWING_UP_RIGHT,
    SWING_RIGHT_DOWN,
    SWING_RIGHT_UP,
    SWING_DOWN_RIGHT,
    U_FROM_TOP,
    U_FROM_RIGHT,
    U_FROM_BOTTOM,
    U_FROM_LEFT,
    CIRCLE, SWING_DOWN_RIGHT_TOPRIGHT,
    SWING_RIGHT_DOWN_BOTTOMLEFT,
    SWING_RIGHT_UP_TOPLEFT,
    SWING_UP_RIGHT_BOTTOMRIGHT,
    LEFT_RIGHT,
    TOP_BOTTOM,
    LEFT_TOPRIGHT,
    LEFT_BOTTOMRIGHT,
    TOP_BOTTOMLEFT,
    TOP_BOTTOMRIGHT,
    RIGHT_TOPLEFT,
    RIGHT_BOTTOMLEFT,
    BOTTOM_TOPRIGHT,
    BOTTOM_TOPLEFT,
    RIGHT_BOTTOM_LEFT_BOTTOM_RIGHT_TILE,
    TOP_BOTTOMLEFT_BOTTOMRIGHT,
    TOP_BOTTOM_RIGHT_BOTTOM_LEFT,
    LEFT_TOPRIGHT_BOTTOMRIGHT,
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

export function drawBottomLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let bottomLeftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        bottomLeftIndex = index + MATRIX_WIDTH - 1
    }
    const bottomLeftTile = gameMatrix[bottomLeftIndex]
    if (bottomLeftTile === CENTER) {
        return
    }
    if (bottomLeftTile === NO_TILE) {
        drawSprite(app, gameMatrix, textures.topright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT) {
        drawSprite(app, gameMatrix, textures.topleftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === LEFT) {
        drawSprite(app, gameMatrix, textures.leftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, LEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.toprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMLEFT)

    } else if (bottomLeftTile === BOTTOM) {
        drawSprite(app, gameMatrix, textures.bottomTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, BOTTOM_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.toprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === SWING_DOWN_RIGHT) {
        drawSprite(app, gameMatrix, textures.swingDownRightTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOM_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.bottomTopleftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === LEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.LeftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.toprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }

}