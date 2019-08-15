import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

async function getUserById(userId) {
  const resp = await fetch(`/api/users/${userId}`);
  return await resp.json();
}

export default class ChannelContainerComponent extends Component {
  @service auth;

  @tracked messages = [];

  @action
  async loadMessages() {
    // @ts-ignore
    const { channel } = this.args;
    const { id, teamId } = channel;
    const resp = await fetch(`/api/teams/${teamId}/channels/${id}/messages`);
    this.messages = await resp.json();
  }

  @action async createMessage(body) {
    // @ts-ignore
    const { channel } = this.args;
    const { id: channelId, teamId } = channel;
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        channelId,
        body,
        userId: this.auth.currentUserId,
      }),
    });
    const newMessage = await resp.json();
    const user = await getUserById(this.auth.currentUserId);

    if (this.isDestroying) return;

    this.messages = [
      ...this.messages,
      {
        ...newMessage,
        user,
      },
    ];
  }
}
