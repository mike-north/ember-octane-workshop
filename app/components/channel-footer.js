import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelFooterComponent extends Component {
  @tracked messageBody;

  get isDisabled() {
    return !this.messageBody;
  }

  @action updateMessageBody(evt) {
    this.messageBody = evt.target.value;
  }

  @action
  async onSubmit(evt) {
    evt.preventDefault();
    const { createMessage } = this.args;
    await createMessage(this.messageBody);
    if (!this.isDestroyed && !this.isDestroying) {
      this.messageBody = '';
    }
  }
}
