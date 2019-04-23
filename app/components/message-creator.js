import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageCreatorComponent extends Component {
  @tracked
  messageBuffer = '';

  get submitDisabled() {
    return !this.messageBuffer;
  }

  @action
  async sendChatMessage(evt) {
    evt.preventDefault();

    await this.args.onSubmit(this.messageBuffer);

    this.messageBuffer = '';
    this.messageInput.focus();
  }

  @action
  onInputKeyDown(evt) {
    this.messageBuffer = evt.target.value;
  }

  @action
  captureMessageInput(element) {
    this.messageInput = element;
    this.messageInput.focus();
  }
}
