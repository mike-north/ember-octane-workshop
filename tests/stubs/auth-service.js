import AuthService from 'shlack/services/auth';

export default class StubAuthService extends AuthService {
  testingUserId = null;

  _readUserId() {
    return this.testingUserId;
  }
  _writeUserId(uid) {
    this.testingUserId = uid;
  }
}
