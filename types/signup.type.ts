export interface ISignUp {
    username: string,
    email: string,
    password: string,
}

export interface ISignUpResponse {
    id: string,
    username: string,
    email: string,
    created_at: string,
    updated_at: string,
    access_token: string
}