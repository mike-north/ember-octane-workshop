import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelContainerComponent extends Component {
  @tracked messages = [];

  @action
  async loadMessages() {
    const {
      team: { id: teamId },
      channelId,
    } = this.args;
    const resp = await fetch(
      `/api/teams/${teamId}/channels/${channelId}/messages`
    );
    const responseMessages = await resp.json();
    this.messages = responseMessages;
  }
}
