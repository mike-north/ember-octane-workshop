import AuthService from 'shlack/services/auth';

export default class StubAuthService extends AuthService {
  _secretUserId = null;

  get _userId() {
    return this._secretUserId;
  }
  set _userId(id) {
    this._secretUserId = id;
  }
}
