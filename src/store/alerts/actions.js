import axiosConfig from '../../config/axiosConfig';
import { DELETE_DEVICES_FAIL } from '../device/types';
import {
  GET_ALERTS_START,
  GET_ALERTS_SUCCESS,
  GET_ALERTS_FAIL,
  SEND_ALERT_SUCCESS,
  SEND_ALERT_FAIL,
  GENERATE_ALERT_START,
  GENERATE_ALERT_FINISH,
  GET_DELETE_ALERT,
  DELETE_ALERT_SUCCESS,
  GET_ALERT_BY_DEVICE_START,
  GET_ALERT_BY_DEVICE_SUCCESS,
  GET_ALERT_BY_DEVICE_FAIL,
} from './types';

// GET ALL ALERTS ACTION
export function getAlertsAction() {
  return async (dispatch) => {
    dispatch(getAlerts());
    try {
      const response = await axiosConfig.get('/alert');
      const { alerts } = response.data;
      return Promise.resolve(dispatch(getAlertsSuccess(alerts)));
    } catch (error) {
      return Promise.reject(dispatch(getAlertsError()));
    }
  }
}
const getAlerts = () => ({
  type: GET_ALERTS_START,
  payload: true
});
const getAlertsSuccess = alerts => ({
  type: GET_ALERTS_SUCCESS,
  payload: alerts
});
const getAlertsError = () => ({
  type: GET_ALERTS_FAIL,
  payload: true
});

// GET ALERT BY DEVICE
export function getAlertByDeviceAction(id) {
  return async (dispatch) => {
    dispatch(getAlertByDevicestart())
    try {
      const response = await axiosConfig.get(`/alert/${id}`);
      const { alerts } = response.data;
      return Promise.resolve(dispatch(getAlertByDeviceSuccess(alerts)));
    } catch (error) {
      return Promise.reject(dispatch(getAlertsByDeviceError()));
    }
  }
}
const getAlertByDevicestart = () => ({
  type: GET_ALERT_BY_DEVICE_START,
  payload: true
});
const getAlertByDeviceSuccess = alerts => ({
  type: GET_ALERT_BY_DEVICE_SUCCESS,
  payload: alerts
});
const getAlertsByDeviceError = () => ({
  type: GET_ALERT_BY_DEVICE_FAIL,
  payload: true
});

// CREATE ALERT ACTION
export function sendAlertAction(deviceId, alertData) {
  return async (dispatch) => {
    try {
      const response = await axiosConfig.post(`/alert/${deviceId}`, alertData);

      // Generate alert in display  
      dispatch(generateAlertStart(response.data.alert))

      // Delete alert 
      setTimeout(()=> {
        dispatch(generateAlertFinish())
      }, 3000)

      return Promise.resolve(
        dispatch(sendAlertSuccess(response.data.alert))
      );
    } catch (error) {
      return Promise.reject(
        dispatch(sendAlertError(true))
      );
    }
  }
}
const generateAlertStart = alertName => ({
  type: GENERATE_ALERT_START,
  payload: alertName
});
const generateAlertFinish = () => ({
  type: GENERATE_ALERT_FINISH
});
const sendAlertSuccess = alert => ({
  type: SEND_ALERT_SUCCESS,
  payload: alert
})
const sendAlertError = state => ({
  type: SEND_ALERT_FAIL,
  payload: state
});

// DELECTE ALERT ACTION
export function deleteAlertAction(id) {
  return async (dispatch) => {
    dispatch(getAlertDelete(id));
    try {
      await axiosConfig.delete(`/alert/${id}`);
      return Promise.resolve(dispatch(deleteAleterSuccess()));
    } catch (error) {
      return Promise.reject(dispatch(deleteAlertError()));
    }
  }
}
const getAlertDelete = id => ({
  type: GET_DELETE_ALERT,
  payload: id
});
const deleteAleterSuccess = () => ({
  type: DELETE_ALERT_SUCCESS
})
const deleteAlertError = () => ({
  type: DELETE_DEVICES_FAIL,
  payload: true
});