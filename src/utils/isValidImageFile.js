export const isValidImageFile = (file) => {
    if (file.file.dataURL) {
        return true
    }
    return false
}