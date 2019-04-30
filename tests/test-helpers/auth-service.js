import AuthService from 'shlack/services/auth';

export default class StubbedAuthService extends AuthService {
  /**
   * @type {string}
   */
  _uid = null

  _readUserId() {
    return this._uid
  }
  _writeUserId(userId) {
    this._uid = userId;
  }
}
