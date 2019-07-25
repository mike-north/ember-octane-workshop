import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class ChannelContainerComponent extends Component {
  @tracked messages = [];

  @action
  async loadMessages(/* elem, params, hash */) {
    const { channel } = this.args;
    const resp = await fetch(
      `/api/teams/${channel.teamId}/channels/${channel.id}/messages`
    );
    const respJSON = await resp.json();

    if (this.isDestroying) return;
    this.messages = respJSON;
  }
}
