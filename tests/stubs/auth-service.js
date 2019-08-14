import AuthService from 'shlack/services/auth';

export default class AuthStubService extends AuthService {
  _userId = null;
  _writeUserId(val) {
    this._userId = val;
  }
  _readUserId() {
    return this._userId;
  }
}
