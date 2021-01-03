import { SET_IS_LOADING } from "../admin/adminActions"
import { GET_ADVENTURES } from "./campaignActions"

const campaigns: IAdventure[] = [
    {
        id: 1,
        title: "the first day",
        story: "Curse of Strahd",
        body: "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
        date: "2020-12-12"
    },
    {
        id: 2,
        title: "The second day",
        story: "Curse of Strahd",
        body: "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
        date: "2020-12-16"
    },
    {
        id: 2,
        title: "post 2",
        story: "Pearls of Even",
        body: "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
        date: "2020-12-25"
    }
]

// Thunk function
export async function fetchCampaigns(dispatch: any) {
    dispatch({ type: SET_IS_LOADING, payload: true })
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => dispatch({ type: GET_ADVENTURES, payload: campaigns }))
        // TODO switch out campaigns with response
        .finally(() => dispatch({ type: SET_IS_LOADING, payload: false }))
}

