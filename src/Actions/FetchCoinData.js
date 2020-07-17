import axios from 'axios';
import {apiBaseUrl, apiSecretKey} from './../Utils/Constants';
import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
} from './../Utils/ActionTypes';

const http = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'X-CMC_PRO_API_KEY': apiSecretKey,
  },
});

export default function FetchCoinData() {
  return async dispatch => {
    dispatch({type: FETCHING_COIN_DATA});

    try {
      const response = await http.get(
        '/v1/exchange/map',
      );

      const ids = response.data.data.map(item => item.id).toString();
      const _response = await http.get(
        `/v1/exchange/map${ids}`,
      );

      return dispatch({
        type: FETCHING_COIN_DATA_SUCCESS,
        payload: Object.values(_response.data.data),
      });
    } catch (error) {
      return dispatch({
        type: FETCHING_COIN_DATA_FAIL,
        payload: error,
      });
    }
  };
}
