
type AdminState = {
    isLoading: boolean
}

type AdminAction = {
    type: string
    payload?: any
}


type AdminDispatchType = (args: AdminAction) => AdminAction