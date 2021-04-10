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

export function drawTopRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let topRightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        topRightIndex = index - MATRIX_WIDTH + 1
    }
    const topRightTile = gameMatrix[topRightIndex]
    if (topRightTile === NO_TILE) {
        drawSprite(app, gameMatrix, textures.bottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, BOTTOMLEFT)
    }
    if (topRightTile === BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.bottomLeftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === RIGHT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, RIGHT_BOTTOMLEFT)
    }
    else if (topRightTile === TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.toprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPRIGHT_BOTTOMLEFT)

    } else if (topRightTile === TOP) {
        drawSprite(app, gameMatrix, textures.topBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOP_BOTTOMLEFT)
    }
    else if (topRightTile === TOPLEFT) {
        drawSprite(app, gameMatrix, textures.topleftBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_BOTTOMLEFT)
    }
    else if (topRightTile === SWING_RIGHT_DOWN) {
        drawSprite(app, gameMatrix, textures.swingRightDownBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (topRightTile === TOP_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === RIGHT_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.rightTopleftBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (topRightTile === TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (topRightTile === TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.toprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftToprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }

    else if (topRightTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topleftBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
}