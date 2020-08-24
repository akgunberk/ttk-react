import { UserElement } from "../../assets/propTypes";
import { USER } from '../actionTypes';

const initialState: UserElement = {
  type: "Default",
  environment: "Test",
  job: false,
  country: 'tr',
  service: 156,
  deal: undefined,
  loading: false,
  bm: '1',
};

type action = {
  type: string,
  payload: any
}


export default function (state = initialState, action: action) {
  switch (action.type) {

    case USER.TYPE: {
      return { ...state, type: action.payload }
    }
    case USER.ENVIRONMENT: {
      return { ...state, environment: action.payload }
    }
    case USER.COUNTRY: {
      return { ...state, country: action.payload }
    }
    case USER.BUSINESSMODEL: {
      return { ...state, bm: action.payload }
    }
    case USER.JOB: {
      return { ...state, service: action.payload, job: action.payload !== '' ? true : false }
    }
    case USER.DEAL: {
      return { ...state, deal: action.payload }
    }
    case USER.DATE: {
      return { ...state, date: action.payload }
    }
    default:
      return state
  }
}