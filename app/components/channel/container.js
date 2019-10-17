import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

let count = 0;
export default class ChannelContainerComponent extends Component {
  @tracked messages = [];

  @service auth;
  @service notifications;

  @action
  async loadMessages() {
    // @team
    const { channel } = this.args;
    const { teamId, id: channelId } = channel;
    const resp = await fetch(
      `/api/teams/${teamId}/channels/${channelId}/messages`
    );
    this.messages = await resp.json();
  }

  @action async createMessage(body) {
    console.log('Creating message: ' + body);
    const { channel } = this.args;
    const { teamId, id: channelId } = channel;
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body,
        teamId,
        channelId,
        userId: this.auth.currentUserId,
      }),
    });

    const newMessageRecord = {
      ...(await resp.json()),
      user: this.auth.currentUser,
    };
    // this.messages = [...this.messages, newMessageRecord];
    this.messages.push(newMessageRecord);
    this.messages = this.messages;
    this.notifications.notify({
      body: 'New message has been posted!',
      color: 'green',
    });
  }
  @action async deleteMessage(message) {
    console.log('Deleting message', message);
    const resp = await fetch('/api/messages/' + message.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) throw new Error('problem deleting message');
    this.messages = this.messages.filter(m => m.id !== message.id);
  }
}
