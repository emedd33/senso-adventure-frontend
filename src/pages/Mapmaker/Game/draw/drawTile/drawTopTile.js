import {
    TEXTURE_HEIGHT, MATRIX_WIDTH,
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

export function drawTopTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    const topIndex = index - MATRIX_WIDTH
    const topTile = gameMatrix[topIndex]
    if (topTile === CENTER) {
        return
    }
    if ([NO_TILE, BOTTOMRIGHT, BOTTOMLEFT, BOTTOMLEFT_BOTTOMRIGHT].includes(topTile)) {
        drawSprite(app, gameMatrix, textures.bottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM)
    }
    else if (topTile === LEFT) {
        drawSprite(app, gameMatrix, textures.swingDownRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT)
    }
    else if (topTile === RIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightUp, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP)
    }
    else if (topTile === RIGHT_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightUpTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (topTile === TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.bottomTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPRIGHT)
    } else if (topTile === TOP) {
        drawSprite(app, gameMatrix, textures.topBottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, TOP_BOTTOM)
    } else if (topTile === TOPLEFT || topTile === TOPLEFT_BOTTOMLEFT || topTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || topTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.bottomTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT)
    } else if (topTile === SWING_UP_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_RIGHT)
    } else if (topTile === SWING_RIGHT_DOWN) {
        drawSprite(app, gameMatrix, textures.UFromLeft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_LEFT)
    }
    else if (topTile === U_FROM_BOTTOM) {
        drawSprite(app, gameMatrix, textures.circle, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, CIRCLE)
    }
    else if (topTile === SWING_UP_RIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.UFromRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_RIGHT)
    }
    else if (topTile === SWING_RIGHT_DOWN_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.UFromLeft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_LEFT)
    }
    else if (topTile === LEFT_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromTop, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_TOP)
    }
    else if (topTile === LEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.swingDownRightTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (topTile === LEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingDownRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT)
    }
    else if (topTile === TOP_BOTTOMLEFT || topTile === TOP_BOTTOMRIGHT || topTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, TOP_BOTTOM)
    }
    else if (topTile === RIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightUp, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP)
    }
    else if (topTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingDownRightTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (topTile === RIGHT_BOTTOMLEFT_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightUpTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (topTile === TOPLEFT_TOPRIGHT || topTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || topTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || topTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.bottomTopleftTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (topTile === TOPLEFT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.bottomTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT)
    }
    else if (topTile === TOPRIGHT_BOTTOMRIGHT || topTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || topTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.bottomTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPRIGHT)
    }


}