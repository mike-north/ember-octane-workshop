import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChannelContainerComponent extends Component {
  @tracked
  messages = [];

  @service auth;

  get getMessagesUrl() {
    return `/api/teams/${this.args.channel.teamId}/channels/${
      this.args.channel.id
    }/messages`;
  }

  @action
  async updateMessages() {
    const resp = await fetch(this.getMessagesUrl);
    this.messages = await resp.json();
  }

  @action
  async chatMessageSubmit(message) {
    const { channel } = this.args;
    const user = this.auth.currentUser;

    const request = await fetch('/api/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamId: channel.teamId,
        channelId: channel.id,
        userId: user.id,
        createdAt: new Date().toISOString(),
        body: message
      })
    });
    if (!request.ok) {
      throw new Error('Problem saving message');
    }
    const newRecord = await request.json();
    this.messages = [
      ...this.messages,
      {
        ...newRecord,
        user
      }
    ];
  }
}
