import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { action } from '@ember/object';

let nextId = 1;
function getId() {
  return nextId++;
}

export default class NotificationsService extends Service {
  @tracked
  toasts = [];
  /**
   * { body: 'hello', color: 'indigo-darker' }
   */

  @action
  notify(toast) {
    const myToast = { ...toast, id: getId() };
    this.toasts = [...this.toasts, myToast];
    setTimeout(() => {
      this.toasts = this.toasts
        .filter(t => t.id !== myToast.id);
    }, 3000);
  }
}
