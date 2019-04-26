import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  handleSignIn(value) {
    console.log(value);
  }

  /**
   * Handle the form submit event
   * @param {Event} evt
   */
  @action
  onLoginFormSubmit(evt /* DOM event */) {
    evt.preventDefault();
    this.handleSignIn(evt.target.querySelector('select').value);
  }
}
