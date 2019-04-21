import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageCreatorComponent extends Component {
  @tracked
  messageBuffer = '';
  @action
  async sendChatMessage(evt) {
    evt.preventDefault();
    await this.args.onSubmit(this.messageBuffer);
    this.messageBuffer = '';
  }

  @action
  onInputKeyDown(evt) {
    this.messageBuffer = evt.target.value;
  }

  get submitDisabled() {
    return !this.messageBuffer;
  }
}
