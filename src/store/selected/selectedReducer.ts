import { SET_SELECTED_CAMPAIGN } from "./selectedActions"

const initialSelectedState = {}
const selectedReducer = (
    state: SelectedState = initialSelectedState,
    action: SelectedActions
): SelectedState => {
    switch (action.type) {
        case SET_SELECTED_CAMPAIGN:
            return {
                selectedCampaign: action.payload,
                ...state
            }
    }
    return state
}
export default selectedReducer