import AuthService from 'shlack/services/auth';

export default class StubAuthService extends AuthService {
  ___testingUserId = null;

  _readUserId() {
    return this.___testingUserId;
  }
  _writeUserId(uid) {
    this.___testingUserId = uid;
  }
}
