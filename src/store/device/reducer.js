import {
  GET_DEVICES_START,
  GET_DEVICES_SUCCESS,
  GET_DEVICES_FAIL,
  CREATE_DEVICES_SUCCESS,
  CREATE_DEVICES_FAIL,
  GET_EDIT_DEVICE,
  EDIT_DEVICES_SUCCESS,
  EDIT_DEVICES_FAIL,
  GET_DEVICE_DELETE,
  DELETE_DEVICES_SUCCESS,
  DELETE_DEVICES_FAIL,
} from './types';

const initialState = {
  devices: [],
  error: null,
  loading: true,
  devicetodelete: null,
  devicetoedit: null
}

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES_START:
      return {
        ...state,
        loading: action.payload
      }
    case CREATE_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        devices: [...state.devices, action.payload]
      }
    case GET_EDIT_DEVICE:
      return {
        ...state,
        devicetoedit: action.payload,
        loading: false
      }
    case EDIT_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        devices: state.devices.map( device => device.id === action.payload.id ? device = action.payload : device)
      }
    case GET_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        devices: action.payload
      }
    case GET_DEVICE_DELETE:
      return {
        ...state,
        devicetodelete: action.payload
      }
    case DELETE_DEVICES_SUCCESS:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== state.devicetodelete),
        devicetodelete: null
      }
    case GET_DEVICES_FAIL:
    case CREATE_DEVICES_FAIL:
    case DELETE_DEVICES_FAIL:
    case EDIT_DEVICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}