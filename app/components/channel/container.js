import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelContainerComponent extends Component {
  @tracked messages = [];
  @tracked messagesPromise = null;
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

  @action createMessage() {}
  @action async deleteMessage(message) {
    const resp = await fetch(`/api/messages/${message.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) throw new Error('Bad response: ' + resp.status);
    if (this.isDestroying) return;
    // message has been deleted in backend
    // const idx = this.messages.indexOf(m => m.id === message.id);
    // this.messages.splice(idx, 1);
    // this.messages = this.messages;
    this.messages = this.messages.filter(m => m.id !== message.id);
  }
}

// addEventListener('click', evt => {

//   (function() {
//     const messageToDelete = {};
//     deleteMessage(messageToDelete);
//   }());

// })
