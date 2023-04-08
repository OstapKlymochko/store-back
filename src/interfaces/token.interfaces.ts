export interface ITokenPair {
    _id?: string;
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    _id: string;
    firstName: string;
    lastName: string;
}