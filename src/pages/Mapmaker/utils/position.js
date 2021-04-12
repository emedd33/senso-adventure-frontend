import { WIDTH } from "../assets/Constants"
export function getTilePosition(pos) {
    // const newX = pos.x - (pos.x + 128) % 32
    const newX = pos.x - pos.x % 32
    const newY = pos.y - pos.y % 32
    return { x: newX, y: newY }
}

export function getGameMatrixIndex(x, y) {
    return x / 32 + WIDTH / 32 * y / 32
}
