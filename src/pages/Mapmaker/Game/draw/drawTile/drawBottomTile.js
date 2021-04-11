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

export function drawBottomTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    const bottomIndex = index + MATRIX_WIDTH
    const bottomTile = gameMatrix[bottomIndex]
    if (bottomTile === CENTER) {
        return
    }
    if ([NO_TILE, TOPRIGHT, TOPLEFT, TOPLEFT_TOPRIGHT].includes(bottomTile)) {
        drawSprite(app, gameMatrix, textures.top, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP)
    }
    else if (bottomTile === LEFT) {
        drawSprite(app, gameMatrix, textures.swingUpRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT)
    }
    else if (bottomTile === RIGHT) {
        drawSprite(app, gameMatrix, textures.swingRightDown, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN)
    }
    else if (bottomTile === BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMRIGHT)
    } else if (bottomTile === BOTTOM) {
        drawSprite(app, gameMatrix, textures.topBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOM)
    } else if (bottomTile === BOTTOMLEFT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || bottomTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    } else if (bottomTile === SWING_DOWN_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_RIGHT)
    } else if (bottomTile === SWING_RIGHT_UP) {
        drawSprite(app, gameMatrix, textures.UFromLeft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_LEFT)
    }
    else if (bottomTile === U_FROM_TOP) {
        drawSprite(app, gameMatrix, textures.circle, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, CIRCLE)
    }
    else if (bottomTile === SWING_DOWN_RIGHT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.UFromRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_RIGHT)
    }
    else if (bottomTile === SWING_RIGHT_UP_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.UFromLeft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_LEFT)
    }
    else if (bottomTile === LEFT_RIGHT) {
        drawSprite(app, gameMatrix, textures.UFromBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_BOTTOM)
    }
    else if (bottomTile === LEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingUpRightBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (bottomTile === LEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.swingUpRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT)
    }
    else if (bottomTile === BOTTOM_TOPLEFT || bottomTile === BOTTOM_TOPRIGHT || bottomTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOM)
    }
    else if (bottomTile === RIGHT_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightDown, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN)
    }
    else if (bottomTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.swingUpRightBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (bottomTile === RIGHT_BOTTOMLEFT_TOPLEFT) {
        drawSprite(app, gameMatrix, textures.swingRightDownBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (bottomTile === BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomTile === TOPLEFT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    }
    else if (bottomTile === TOPRIGHT_BOTTOMLEFT) {
        drawSprite(app, gameMatrix, textures.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    }
    else if (bottomTile === TOPRIGHT_BOTTOMRIGHT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || bottomTile === TOPLEFT_BOTTOMRIGHT) {
        drawSprite(app, gameMatrix, textures.topBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMRIGHT)
    }

}