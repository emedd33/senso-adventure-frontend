import { SET_IS_LOADING } from "../admin/adminActions"
import { GET_ADVENTURES } from "./campaignActions"

const campaigns: IAdventure[] = [
    {
        id: 2,
        title: "The second day",
        story: "Curse of Strahd",
        body: "Harum Harum Harum Harum Harum Harum Harum Harum Harum Harum Harum Harum Harum \
        quidem quidem quidem quidem quidem quidem quidem quidem quidem quidem quidem quidem quidem \
        rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum rerum\
        facilis facilis facilis facilis facilis facilis facilis facilis facilis facilis facilis \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        distinctio distinctio distinctio distinctio distinctio distinctio distinctio distinctio \
        ",
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

