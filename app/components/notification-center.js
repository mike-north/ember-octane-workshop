import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const HANG_TIME = 3000;
const LEAVE_TIME = 300;

export default class NotificationCenterComponent extends Component {
  @tracked
  messages = [];

  runIfAlive(fn) {
    if (!this.isDestroyed && !this.isDestroyed) {
      fn();
    }
  }

  removeNotificationById(id) {
    this.runIfAlive(() => {
      const idx = this.messages
        .map(n => `${n.id}`)
        .indexOf(`${id}`);
      this.messages.splice(idx, 1);
      this.messages = this.messages;
    });
  }

  onNotificationLeave(notification) {
    this.runIfAlive(() => {
      set(notification, 'leaving', true);
      setTimeout(() => {
        this.removeNotificationById(notification.id);
      }, LEAVE_TIME);
    });
  }

  onNotificationEnter(notification) {
    this.runIfAlive(() => {
      set(notification, 'entering', true);
      setTimeout(() => {
        this.onNotificationLeave(notification);
      }, HANG_TIME);
    });
  }

  @action
  notify(body, color = 'indigo-darker') {
    const id = Math.round(Math.random() * 10000000);
    const newNotification = {
      id,
      body,
      color,
      entering: false,
      leaving: false,
    };
    setTimeout(() => {
      this.onNotificationEnter(newNotification);
    }, 0);

    this.messages = [...this.messages, newNotification];
  }
}
