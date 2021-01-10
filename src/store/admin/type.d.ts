
interface IAuthUser {
    user: any
    username: string,
    firstname: string,
    lastname: string,
    email: string
}
interface IError {
    errorMessage: string,
    isError: boolean
}
type AdminState = {
    isLoading: boolean
    authUser?: IAuthUser
    error: IError
}
type ILogin = {
    email: string,
    password: string
}

type AdminAction = {
    type: string
    payload?: any
}


type AdminDispatchType = (args: AdminAction) => AdminAction