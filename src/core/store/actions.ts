import { USER, DEFAULT_USER } from "./actionTypes";

export const dispatchDeal = (payload: number) => ({
    type: USER.DEAL,
    payload
});

export const dispatchDate = (payload: number) => ({
    type: USER.DATE,
    payload
});

export const dispatchSelectable = (type: string, payload: any) => ({
    type,
    payload
})

export const dispatchDefaultUser = (payload: { user_id: string, email: string, password: string, accessToken: string, name: string, imageId: number }) => (
    {
        type: DEFAULT_USER,
        payload
    }
)

