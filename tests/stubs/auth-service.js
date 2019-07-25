import AuthService from "shlack/services/auth";

// function currentDate(dateConstructor = () => Date.now()) {
//   return dateConstructor();
// }

// currentDate(() => 0 );


export default class StubAuthService extends AuthService {
  _uid = null;
  _readUserID() {
    return this._uid;
  }
  _writeUserId(userId) {
    this._uid = userId;
  }

  setUserId(uid) {
    this._uid = uid
  }
}