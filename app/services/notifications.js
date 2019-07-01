import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const getId = () => Math.round(Math.random() * 10000000);

const HANG_TIME = 3000; // ms

export default class NotificationsService extends Service {
  @tracked
  messages = [];

  @action
  notify(body, color = 'indigo-darker') {
    const id = getId();
    const newNotification = {
      id,
      body,
      color,
    };
    // tracked property update via assignment
    this.messages = [...this.messages, newNotification];

    // REMOVE after elapsed time is complete
    setTimeout(() => {
      // remove notification by ID
      const idx = this.messages.map(n => `${n.id}`).indexOf(`${id}`);
      this.messages.splice(idx, 1);

      // tracked property update via assignment
      this.messages = this.messages;
    }, HANG_TIME);
  }
}
