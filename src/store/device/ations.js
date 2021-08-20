import axiosConfig from '../../config/axiosConfig';
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
  DELETE_DEVICES_FAIL
} from './types';

// GET DEVICE ACTION
export function getDevicesAction() {
  return async (dispatch) => {
    dispatch(getDevices());
    try {
      const response = await axiosConfig.get('/device');
      const { device } = response.data;
      return Promise.resolve(dispatch(getDevicesSuccess(device)));
    } catch (error) {
      return Promise.reject(dispatch(getDevicesError()));
    }
  }
}
const getDevices = () => ({
  type: GET_DEVICES_START,
  payload: true
});
const getDevicesSuccess = devices => ({
  type: GET_DEVICES_SUCCESS,
  payload: devices
});
const getDevicesError = () => ({
  type: GET_DEVICES_FAIL,
  payload: true
});

// CREATE DEVICE ACTION
export function createNewDeviceAction(newDevice) {
  return async (dispatch) => {
    try {
      const response = await axiosConfig.post('/device', newDevice);
      const { device } = response.data;
      return Promise.resolve(
        dispatch(createDeviceSuccess(device))
      );
    } catch (error) {
      return Promise.reject(
        dispatch(createDeviceError(true))
      );
    }
  }
}
const createDeviceSuccess = device => ({
  type: CREATE_DEVICES_SUCCESS,
  payload: device
})
const createDeviceError = state => ({
  type: CREATE_DEVICES_FAIL,
  payload: state
});

// DELECTE DEVICE ACTION
export function deleteDeviceAction(id) {
  return async (dispatch) => {
    dispatch(getDeviceDelete(id));
    try {
      await axiosConfig.delete(`/device/${id}`);
      return Promise.resolve(dispatch(deleteDeviceSuccess()));
    } catch (error) {
      return Promise.reject(dispatch(deleteDeviceError()));
    }
  }
}
const getDeviceDelete = id => ({
  type: GET_DEVICE_DELETE,
  payload: id
});
const deleteDeviceSuccess = () => ({
  type: DELETE_DEVICES_SUCCESS
})
const deleteDeviceError = () => ({
  type: DELETE_DEVICES_FAIL,
  payload: true
});


// GET EDIT DEVICE
export function getUpdateDeviceAction(device) {
  return async (dispatch) => {
    dispatch(getUpdateDevice(device));
  }
}
const getUpdateDevice = device => ({
  type: GET_EDIT_DEVICE,
  payload: device
});

// UPDATE DEVICE ACTION
export function updateDeviceAction(id, deviceData) {
  return async (dispatch) => {
    try {
      const response = await axiosConfig.put(`/device/${id}`, deviceData);
      return Promise.resolve(dispatch(updateDeviceSuccess(response.data)));
    } catch (error) {
      return Promise.reject(dispatch(updateDeviceError(true)));
    }
  }
}
const updateDeviceSuccess = device => ({
  type: EDIT_DEVICES_SUCCESS,
  payload: device
});
const updateDeviceError = state => ({
  type: EDIT_DEVICES_FAIL,
  payload: state
});