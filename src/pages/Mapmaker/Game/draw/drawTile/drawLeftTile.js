import {
    TEXTURE_WIDTH, MATRIX_WIDTH,
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
    TOP_BOTTOMLEFT_BOTTOMRIGHT,
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

export function drawLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {

    let leftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        leftIndex = index - 1
    }
    const leftTile = gameMatrix[leftIndex]
    if (leftTile === CENTER) {
        return
    }
    if ([NO_TILE, BOTTOMRIGHT, TOPRIGHT, TOPRIGHT_BOTTOMRIGHT].includes(leftTile)) {
        drawSprite(app, gameMatrix, textures.right, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT)
    }
    else if (leftTile === BOTTOM) {
        drawSprite(app, gameMatrix, textures.swingRightUp, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP)
    }
    else if (leftTile === LEFT) {
        drawSprite(app, gameMatrix, textures.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOP) {
        drawSprite(app, gameMatrix, textures.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === TOPLEFT) {
        drawSprite(app, gameMatrix, textures.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === SWING_UP_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromBottom, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_BOTTOM)
    }
    else if (leftTile === SWING_DOWN_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromTop, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_TOP)
    }
    else if (leftTile === U_FROM_RIGHT) {
        drawSprite(app, gameMatrix, textures.circle, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, CIRCLE)
    }
    else if (leftTile === SWING_UP_RIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.UFromBottom, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_BOTTOM)
    }
    else if (leftTile === SWING_DOWN_RIGHT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.UFromTop, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_TOP)
    }
    else if (leftTile === TOP_BOTTOM) {
        drawSprite(app, gameMatrix, textures.UFromLeft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_LEFT)
    }
    else if (leftTile === LEFT_TOPRIGHT || leftTile === LEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === TOP_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightDownBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (leftTile === TOP_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === BOTTOM_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightUp, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP)
    }
    else if (leftTile === BOTTOM_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightUpTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (leftTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightDownBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (leftTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightUpTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.rightTopleftBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.rightTopleftBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
}