import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChannelFooterComponent extends Component {
  @tracked messageBody = '';

  @action
  onInputUpdate(evt) {
    this.messageBody = evt.target.value;
  }
  @action
  async onSubmitMessage(evt) {
    evt.preventDefault();
    // @ts-ignore
    await this.args.createMessage(this.messageBody);
    this.messageBody = '';
  }
}
