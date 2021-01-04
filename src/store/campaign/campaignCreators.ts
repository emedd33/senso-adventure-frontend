import { SET_IS_LOADING } from "../admin/adminActions"
import { GET_ADVENTURES } from "./campaignActions"

const campaigns: IAdventure[] = [
    {
        id: 2,
        title: "The second day",
        story: "Curse of Strahd",
        body: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
        date: "2020-12-16"
    },

]

// Thunk function
export async function fetchCampaigns(dispatch: any) {
    dispatch({ type: SET_IS_LOADING, payload: true })
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => dispatch({ type: GET_ADVENTURES, payload: campaigns }))
        // TODO switch out campaigns with response
        .finally(() => dispatch({ type: SET_IS_LOADING, payload: false }))
}

