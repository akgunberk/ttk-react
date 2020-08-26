import { CardElement } from "../../../assets/propTypes";
import { DEFAULT_USER } from "../actionTypes";

const initialState: CardElement = {
    environment: "",
    email: "",
    password: "",
    id: "",
    accessToken: "",
};

type action = {
    type: string;
    payload: any;
};

export default function (state = initialState, action: action) {
    switch (action.type) {
        case DEFAULT_USER: {
            return {
                ...state,
                userId: action.payload.user_id,
                email: action.payload.email,
                password: action.payload.password,
                accessToken: action.payload.accessToken,
            };
        }
        default:
            return state;
    }
}
