const isValidSlug = (slug) => {
    if (slug) {
        if (slug !== "new") {
            return true
        }
    }
    return false
}
export default isValidSlug

