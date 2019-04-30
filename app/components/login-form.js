import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  handleSignIn(value) {
    console.log(value);
  }

  /**
   * Handle the form submit event
   * @param {Event & { target: HTMLFormElement }} evt
   */
  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    const { target } = evt;
    const { value } = target.querySelector('select');
    if (value) this.handleSignIn(value);
  }
}
