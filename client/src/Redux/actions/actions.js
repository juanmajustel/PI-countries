/* eslint-disable no-unreachable */
import axios from "axios";
import {
  ERROR,
  GET_ACTIVITIES,
  GET_BY_ID,
  GET_BY_NAME,
  GET_COUNTRIES,
} from "./constantes";

export function getCountries() {
  try {
    return async function (dispatch) {
      return await axios.get("http://localhost:3001/countries").then((resp) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: resp.data,
        });
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getActivities() {
  try {
    return async function (dispatch) {
      return await axios
        .get("http://localhost:3001/activities")
        .then((resp) => {
          dispatch({
            type: GET_ACTIVITIES,
            payload: resp.data,
          });
        });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      return await axios
        .get(`http://localhost:3001/countries?name=${name}`)
        .then((resp) => {
          dispatch({
            type: GET_BY_NAME,
            payload: resp.data,
          });
        });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
}

export function getByID(id) {
  try {
    return async function (dispatch) {
      return await axios
        .get(`http://localhost:3001/countries/${id}`)
        .then((resp) => {
          dispatch({
            type: GET_BY_ID,
            payload: resp.data,
          });
        });
    };
  } catch (error) {
    console.log(error);
  }
}

export function postActivity(input) {
  return async function () {
    return await axios.post("http://localhost:3001/activities", input);
  };
}
