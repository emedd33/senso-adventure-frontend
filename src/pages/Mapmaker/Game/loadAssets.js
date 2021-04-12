
import backgroundPath from "../assets/background.png"
import dungeonTilesPath from "../assets/textures/dungeon-tile/dungeon-tile.png"
import item from "../assets/textures/items/Table-1.png"

export const loadTiles = (loader) => {
    loader

        .add("dungeonTiles", dungeonTilesPath)

}
export const loadBackground = (loader) => {
    loader.add("background", backgroundPath)
}

export const loadObjects = (loader) => {
    loader.add("item", item)
}