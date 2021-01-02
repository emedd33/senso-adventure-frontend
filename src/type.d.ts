interface IAdventure {
    id: number
    title: string
    body: string
    //date: string
    //story: string
}
type AdventureState = {
    adventures: IAdventure[]
}

type AdventureAction = {
    type: string
    adventure: IAdventure
}


type DispatchType = (args: AdventureAction) => AdventureAction