import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    adventures: [
        {
            id: 1,
            title: "post 1",
            body:
                "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
        },
        {
            id: 2,
            title: "post 2",
            body:
                "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
        },
    ],
}

const adventureReducer = (
    state: CampaignState = initialCampaignState,
    action: AdventureAction
): CampaignState => {
    switch (action.type) {
        case actionTypes.ADD_ADVENTURE:
            const newAdventure: IAdventure = {
                id: Math.random(), // not really unique
                title: action.adventure.title,
                body: action.adventure.body,
            }
            return {
                ...state,
                adventures: state.adventures.concat(newAdventure),
            }
        case actionTypes.REMOVE_ADVENTURE:
            const updatedAdventures: IAdventure[] = state.adventures.filter(
                adventure => adventure.id !== action.adventure.id
            )
            return {
                ...state,
                adventures: updatedAdventures,
            }
    }
    return state
}

export default adventureReducer
