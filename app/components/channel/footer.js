import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChannelFooterComponent extends Component {
  @tracked draft = '';

  get isDisabled() {
    return !this.draft;
  }
  @action
  updateDraft(evt) {
    this.draft = evt.target.value;
  }
  @action
  async handleSubmit(evt) {
    evt.preventDefault();
    await this.args.create(this.draft);
    this.draft = '';
  }
}
