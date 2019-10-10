import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChannelFooterComponent extends Component {
  @tracked draft = '';

  get isDisabled() {
    return !this.draft;
  }

  @action
  onInputChange(evt) {
    this.draft = evt.target.value;
  }

  @action
  async handleSubmit(evt) {
    evt.preventDefault(); // stop the reload
    if (this.isDisabled) return;
    // create new message w/ input's value
    await this.args.create(this.draft);
    this.draft = ''; // clear it
  }
}
