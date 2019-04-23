import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class ChannelContainerComponent extends Component {
  @tracked
  messages = [];

  @service auth;

  get getMessagesUrl() {
    return `/api/teams/${this.args.channel.teamId}/channels/${
      this.args.channel.id
    }/messages`;
  }

  // TODO: fix this
  updateScrollPosition() {
    this.scrollElement.scrollTop = this.scrollElement.scrollHeight;
  }

  @action
  captureScrollElement(element) {
    this.scrollElement = element;
  }

  @action
  async updateMessages() {
    const resp = await fetch(this.getMessagesUrl);
    this.messages = await resp.json();

    this.updateScrollPosition();
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

    await this.updateScrollPosition();
  }

  @action
  async deleteChatMessage(message) {
    const resp = await fetch(`/api/messages/${message.id}`, {
      method: 'DELETE'
    });
    if (!resp.ok) {
      throw new Error('Problem deleting chat message: ' + (await resp.text()));
    }
    await this.updateMessages();
  }

  @action
  noFollowLink(event) {
    event.preventDefault();
  }
}
