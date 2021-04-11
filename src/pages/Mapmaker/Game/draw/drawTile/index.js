import * as PIXI from 'pixi.js'
import { printGameMatrix } from "../../../utils/print"
import { drawTopLeftTile } from "./drawTopLeftTile"
import { drawTopTile } from './drawTopTile';
import { drawTopRightTile } from './drawTopRightTile';
import { drawLeftTile } from './drawLeftTile';
import { drawRightTile } from './drawRightTile';
import { drawBottomLeftTile } from './drawBottomLeftTile';
import { drawBottomTile } from './drawBottomTile';
import { drawBottomRightTile } from './drawBottomRightTile';
export function drawSprite(app, gameMatrix, texture, x, y, index, indexValue) {
    const sprite = new PIXI.Sprite(texture);
    sprite.y = x
    sprite.x = y;
    app.stage.addChild(sprite)
    gameMatrix[index] = indexValue
}
export function drawSurroundingSprites(app, gameMatrix, textures, columnPx, rowPx, index) {
    drawTopLeftTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawTopTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawTopRightTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawLeftTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawRightTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawBottomLeftTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawBottomTile(app, gameMatrix, index, textures, columnPx, rowPx)
    drawBottomRightTile(app, gameMatrix, index, textures, columnPx, rowPx)
}