interface IAuth {
    user?: IUser,
    status: number,
    login: () => void,
    loginPassword : (formData) => void,
    logout: () => void,
    setDetail: (user: IUser) => void
}