const isValidSessionSlug = (slug) => {
    if (slug) {
        if (slug !== "new") {
            return true
        }
    }
    return false
}
export default isValidSessionSlug