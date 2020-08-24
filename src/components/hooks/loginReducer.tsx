type AppState = {
  email: string;
  password: string;
  error: string;
  active: boolean;
  modal: boolean;
};
type Action =
  | { type: "email"; payload: string }
  | { type: "password"; payload: string }
  | { type: "error"; payload: string }
  | { type: "active"; payload: boolean }
  | { type: "modal"; payload: boolean };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "error":
      return { ...state, error: action.payload, active: false };
    case "active":
      return { ...state, active: true };
    case "modal":
      return { ...state, modal: action.payload, active: false };
    default:
      return state;
  }
}
