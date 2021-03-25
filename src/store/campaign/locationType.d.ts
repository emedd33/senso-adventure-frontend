
interface ILocation {
    name: string,
    slug: string,
    isPublished: string,
    nickNames: string[],
    description: string,
    characters: { name: string, description: string }[],
    religion?: string,
    governRule?: string,
    resources: { name: string, description: string }[],
    connectedPlaces: { location: ILocation, distance: string }[],
    keyElements: { name: string, description: string }[],
}