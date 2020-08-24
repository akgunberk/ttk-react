export interface CardElement {
    email: string,
    password: string,
    id: string,
    accessToken: string
    environment: string,
    country?: any,
    name?: string
}

export interface UserElement {
    type: string,
    environment: string,
    country: string,
    loading: false,
    password?: string,
    job?: boolean,
    bm?: string,
    service?: number,
    quoteNumber?: number,
    deal?: number | undefined,
    date?: string
}
