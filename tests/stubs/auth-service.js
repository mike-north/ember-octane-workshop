import AuthService from 'shlack/services/auth';

export default class StubAuthService extends AuthService {
  uid = null;

  _readUserId() {
    return this.uid;
  }
  _writeUserId(newUserId) {
    this.uid = newUserId;
  }
}
