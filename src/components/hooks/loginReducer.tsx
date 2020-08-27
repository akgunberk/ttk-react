type AppState = {
  userId: string;
  active: boolean;
};
export type Action =
  | { type: "userId"; payload: string }
  | { type: "active"; payload: boolean };

export const AppState = {
  userId: "",
  active: false,
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "userId":
      return { ...state, userId: action.payload };
    case "active":
      return { ...state, active: true };
    default:
      return state;
  }
}
