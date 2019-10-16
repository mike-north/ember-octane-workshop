import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as svc } from '@ember/service';

class LoginFormModel {
  @tracked
  currentId = null;
}

// function concatenate() {
//   return computed('firstName', 'lastName', function() {
//     return `${this['firstName']} ${this['lastName']}`;
//   });
// }

let ct = 0;

export default class LoginFormComponent extends Component {
  model = new LoginFormModel();

  // firstName = 'mike';

  // lastName = 'north';

  // @combineStrings('firstName', 'lastName') fullName;
  // @combineStrings('lastName', 'firstName') reverseName;

  @svc auth;

  get isDisabled() {
    console.log('isDisabled ', ct++);
    return !this.model.currentId;
  }

  async doLogin(userId) {
    console.log(`Logging in as user (${userId})`);
    await this.auth.login(userId);
    console.log('Login complete', this.auth.currentUser);
  }

  /**
   *
   * @param {Event} evt
   */
  @action
  handleUserSelectionChange(evt) {
    const userId = evt.target.value;
    this.model.currentId = userId;
  }

  @action
  handleSubmit(evt) {
    evt.preventDefault();
    this.doLogin(this.model.currentId);
  }
}

function sample(obj, propName) {
  debugger;
}

// function action(obj, propKey, propDesc) {
//   obj[propKey] = obj[propKey].bind(obj);
// }

// let globalVersion = 4;
// let lastRenderVersion = 2;
// function tracked(obj, propKey, propDesc) {
//   let val = obj[propKey];
//   let ref = {
//     value() {
//       return val;
//     },
//     version: 4
//   }
//   Object.defineProperty({
//     get() {
//       return val;
//     },
//     set(newVal) {
//       val = newVal;
//       // do something to tell the HTML to update
//     }
//   })
// }

// LoginFormComponent.extend({
//   fullName: combineStrings('firstName', 'lastName'),
//   reverseName: combineStrings('lastName', 'firstName'),
// });

// function combineStrings(str1, str2) {
//   return computed(str1, str2, function() {
//     return `${this[str1]} ${this[str2]}`;
//   });
// }
