import axios from '../api/axios';
import authHeader from './auth-header';

const API_URL = '/user';

class UserService {
  getUserBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }
/* GET USER ADDRESS & GET USER ORDER burdan cekilebilir. */

}

export default new UserService();