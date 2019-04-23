import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageCreatorComponent extends Component {
  @tracked
  messageBuffer = '';

  element = null;

  get submitDisabled() {
    return !this.messageBuffer;
  }

  @action
  async sendChatMessage(evt) {
    if (!this.element)
      throw new Error(
        'MessageCreator sendChatMessage while element has not yet been captured'
      );
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
