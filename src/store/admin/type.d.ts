
type AdminState = {
    isLoading: boolean
}

type AdminAction = {
    type: string
    isLoading: boolean
}


type AdminDispatchType = (args: AdminAction) => AdminAction