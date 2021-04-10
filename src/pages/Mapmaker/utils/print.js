import {MATRIX_WIDTH} from "../assets/Constants"
export function printGameMatrix(gameMatrix, indexAdded) {
    console.log("GAME MATRIX");
    let rowNumber = 0;
    let rowString = `row ${rowNumber}: `
    let columnCounter = 0
    for (var i = 0; i < gameMatrix.length; i++) {
        if (i === indexAdded){
            rowString += `@${gameMatrix[i]} `
        } else  {
            rowString += `${gameMatrix[i]}, `
        }
        columnCounter++
        if (columnCounter >= MATRIX_WIDTH){
            console.log(rowString)
            columnCounter = 0
            rowNumber++
            rowString = `row ${rowNumber}: `
        }
        
    }
}