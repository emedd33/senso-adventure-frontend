import * as actionTypes from "./campaignActions"
import { SET_IS_LOADING } from "../admin/adminActions"
import { GET_ADVENTURES } from "./campaignActions"
const initialCampaignState: CampaignState = {
    adventures: [
        {
            id: 1,
            title: "the first day",
            story: "Curse of Strahd",
            body:
                "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
        },
        {
            id: 2,
            title: "The second day",
            story: "Curse of Strahd",
            body:
                "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
        },
        {
            id: 2,
            title: "post 2",
            story: "Pearls of Even",
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
        case actionTypes.GET_ADVENTURES:
            fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json())
                .then(json => console.log(json))
            return state
    }
    return state
}

// Thunk function
export async function fetchCampaigns(dispatch: any) {
    dispatch({ type: SET_IS_LOADING, payload: true })
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => dispatch({ type: GET_ADVENTURES, payload: response }))
        .finally(() => dispatch({ type: SET_IS_LOADING, payload: false }))
}
export default adventureReducer
