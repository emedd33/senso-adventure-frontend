import { TEXTURE_WIDTH, TEXTURE_HEIGHT, MATRIX_WIDTH } from "../assets/Constants"
export function getTilePosition(pos) {
    const newX = pos.x - pos.x % 32
    const newY = pos.y - pos.y % 32
    return { x: newX, y: newY } 
}

export function getGameMatrixIndex(x, y) {
    let index = x / TEXTURE_WIDTH + y/TEXTURE_HEIGHT*MATRIX_WIDTH
    return index
}
