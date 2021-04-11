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

export function drawRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let rightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        rightIndex = index + 1
    }
    const rightTile = gameMatrix[rightIndex]
    if (rightTile === CENTER) {
        return
    }
    if ([NO_TILE, TOPLEFT, TOPLEFT_BOTTOMLEFT, BOTTOMLEFT].includes(rightTile)) {
        drawSprite(app, gameMatrix, textures.left, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT)
    }
    else if (rightTile === BOTTOM || rightTile === BOTTOM_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingDownRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_DOWN_RIGHT)
    }
    else if (rightTile === RIGHT || rightTile === RIGHT_TOPLEFT || rightTile === RIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.leftRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_RIGHT)
    }
    else if (rightTile === BOTTOMRIGHT || rightTile === BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.leftBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_BOTTOMRIGHT)
    }
    else if (rightTile === TOP || rightTile === TOP_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.swingUpRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_UP_RIGHT)
    }
    else if (rightTile === SWING_RIGHT_DOWN || rightTile === SWING_RIGHT_DOWN_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.UFromBottom, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_BOTTOM)
    }
    else if (rightTile === SWING_RIGHT_UP || rightTile === SWING_RIGHT_UP_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.UFromTop, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_TOP)
    }
    else if (rightTile === U_FROM_LEFT) {
        drawSprite(app, gameMatrix, textures.circle, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, CIRCLE)
    }

    else if (rightTile === TOP_BOTTOM) {
        drawSprite(app, gameMatrix, textures.UFromRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_RIGHT)
    }
    else if (rightTile === TOP_BOTTOMRIGHT || rightTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingUpRightBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (rightTile === BOTTOM_TOPRIGHT || rightTile === LEFT_TOPRIGHT_BOTTOMRIGHT || rightTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.swingDownRightTopright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (rightTile === TOPLEFT_TOPRIGHT || rightTile === TOPRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || rightTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.leftTopright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_TOPRIGHT)
    }
    else if (rightTile === TOPRIGHT_BOTTOMRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || rightTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.LeftToprightBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }

}