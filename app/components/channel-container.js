import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class ChannelContainerComponent extends Component {
  @tracked
  messages = [];

  /**
   * @type {AuthService}
   */
  @service auth;

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

  @action async deleteMessage(message) {
    const resp = await fetch(
      `/api/messages/${message.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!resp.ok) {
      throw new Error(
        'Problem deleting message: ' + (await resp.text())
      );
    }
    const idx = this.messages
      .map(m => m.id)
      .indexOf(message.id);
    this.messages.splice(idx, 1);
    this.messages = this.messages;
  }

  @action
  async createMessage(body) {
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    const resp = await fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelId,
        teamId,
        body,
        userId: this.auth.currentUserId,
      }),
    });
    if (this.isDestroyed || this.isDestroying) return;
    if (!resp.ok) {
      throw new Error(
        'Problem creating message: ' + (await resp.text())
      );
    }

    const newMessage = await resp.json();
    if (this.isDestroyed || this.isDestroying) return;

    this.messages = [
      ...this.messages,
      { ...newMessage, user: this.auth.currentUser },
    ];
    return newMessage;
  }
}
