
interface ILocation {
    name: string,
    slug: string,
    isPublished: string,
    nickNames: string[],
    summary: string,
    characters: { character: ICharacter, role: string }[],
    religion?: string,
    governRule?: string,
    resources: { name: string, description: string }[],
    connectedPlaces: { location: ILocation, distance: string }[],
    keyElements: { name: string, description: string }[],

}