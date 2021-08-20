import {
  GET_ALERTS_START,
  GET_ALERTS_SUCCESS,
  GET_ALERTS_FAIL,
  SEND_ALERT_START,
  SEND_ALERT_SUCCESS,
  GENERATE_ALERT_START,
  GENERATE_ALERT_FINISH,
  SEND_ALERT_FAIL,
  GET_DELETE_ALERT,
  DELETE_ALERT_SUCCESS,
  DELETE_ALERT_FAIL,
  GET_ALERT_BY_DEVICE_START,
  GET_ALERT_BY_DEVICE_SUCCESS,
  GET_ALERT_BY_DEVICE_FAIL
} from './types';

const initialState = {
  alerts: [],
  alertByDevice: [],
  generateAlert: null,
  error: null,
  loading: true,
  alerttodelete: null,
}

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS_START:
    case GET_ALERT_BY_DEVICE_START:
    case SEND_ALERT_START:
      return {
        ...state,
        loading: action.payload
      }
    case SEND_ALERT_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: [...state.alerts, action.payload]
      }
    case GENERATE_ALERT_START:
      return {
        ...state,
        generateAlert: action.payload
      }
    case GENERATE_ALERT_FINISH:
      return {
        ...state,
        generateAlert: null
      }
    case GET_ALERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        alerts: action.payload
      }
    case GET_ALERT_BY_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        alertByDevice: action.payload
      }
    case GET_DELETE_ALERT:
      return {
        ...state,
        alerttodelete: action.payload
      }
    case DELETE_ALERT_SUCCESS:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== state.alerttodelete),
        alertByDevice: state.alertByDevice.filter(alert => alert.id !== state.alerttodelete),
        alerttodelete: null
      }
    case GET_ALERTS_FAIL:
    case SEND_ALERT_FAIL:
    case DELETE_ALERT_FAIL:
    case GET_ALERT_BY_DEVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}