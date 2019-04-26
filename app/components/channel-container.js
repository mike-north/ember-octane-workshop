import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class ChannelContainerComponent extends Component {
  @tracked
  messages = [];

  @action
  async loadMessages() {
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    const messages = await (await fetch(
      `/api/teams/${teamId}/channels/${channelId}/messages`
    )).json();
    if (this.isDestroyed || this.isDestroying) return;
    this.messages = messages;
  }
}
