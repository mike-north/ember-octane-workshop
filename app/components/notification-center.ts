import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Notifications from 'shlack/services/notifications';

interface NotificationCenterArgs {}

export default class NotificationCenter extends Component<
  NotificationCenterArgs
> {
  @service notifications!: Notifications;
}
