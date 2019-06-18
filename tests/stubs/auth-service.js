import AuthService from 'shlack/services/auth';

export default class StubAuthService extends AuthService {
  _userId = null;
  _getUserId() {
    return this._userId;
  }
  _setUserId(userId) {
    this._userId = userId;
  }
}
