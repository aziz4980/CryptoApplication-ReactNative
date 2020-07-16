import {combineReducers} from 'redux';
import { ImageComponent } from 'react-native';
import CryproReducer from './CryptoReducer';


export default combineReducers({
    crypto: CryproReducer  
})