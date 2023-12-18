export interface ISignInRequest {
    email: string,
    password: string
}

export interface ISignInResponse {
    id: string,
    email: string,
    username: string,
    created_at: string,
    updated_at: string,
    access_token: string,
    refresh_token: string,
  }

export interface IAuthResponse {

}