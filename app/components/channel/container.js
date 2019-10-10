import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import fetch from 'fetch';
import { min } from '@ember/object/computed';

/**


### Create a new message in a team channel
POST http://localhost:4200/api/messages HTTP/1.1
Content-Type: application/json

{
  "teamId": "li",
  "channelId": "general",
  "userId": 1,
  "body": "Hi everyone!"
}

### Delete a message
DELETE http://localhost:4200/api/messages/19 HTTP/1.1
Content-Type: application/json

 */

export default class ChannelContainerComponent extends Component {
  @service auth;
  @service notifications;

  @tracked
  messages = [];

  @action
  async loadMessages() {
    // @channel
    const { channel, endpoint } = this.args;
    const { teamId, id: channelId } = channel;
    const resp = await fetch(
      `${endpoint}/teams/${teamId}/channels/${channelId}/messages`
    );
    this.messages = await resp.json();
  }

  @action
  async createMessage(body) {
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
    const newMessage = await resp.json();
    if (this.isDestroying) return;
    const newRecord = { ...newMessage, user: this.auth.user };
    // Option 1
    // this.messages.push(newRecord);
    // this.messages = this.messages;

    // Option 2
    this.messages = [...this.messages, newRecord];
    this.notifications.notify({
      body: 'Success! Your message has been saved',
      color: 'green',
    });
  }

  @action
  async deleteMessage(messageId) {
    console.log('Delete message: ' + messageId);
    const resp = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) throw new Error('Trouble deleting message');
    if (this.isDestroying) return;
    this.messages = this.messages.filter(m => m.id !== messageId);
    this.notifications.notify({
      body: 'Success! Your message has been deleted',
      color: 'indigo',
    });
  }
}
