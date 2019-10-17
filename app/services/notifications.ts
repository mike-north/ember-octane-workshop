import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

interface Notification {
  color: 'green' | 'blue';
  body: string;
}
interface WithId {
  id: number;
}

// class MyOtherThing {
//   body: string;
//   color: 'green' | 'blue' | 'red';
//   constructor(a: string, b: 'green' | 'blue' | 'red') {
//     this.body = a;
//     this.color = b;
//   }
// }

// type Whiskey = {
//   region: string;
//   age: string;
// }

// type Person = {
//   name: string;
//   age: number;
// }

// let thingInMyHand: Person & Whiskey;

// thingInMyHand.

// function foo() {}
// namespace foo {
//   export let body: string;
//   export let color: 'green' | 'blue' | 'orange';
// }
// foo.body = 'You saved a record!';
// foo.color = 'green';

// MyThing.body = 'Something else';

// let n: Notification = foo;

let counter = 0;
function getId() {
  return counter++;
}
const HANG_TIME = 2000;

export default class Notifications extends Service {
  // normal class body definition here
  @tracked
  items: (Notification & WithId)[] = [];

  constructor() {
    super(...arguments);
    setTimeout(() => {
      this.notify({
        body: 'Hello, does this work?',
        color: 'green',
      });
    }, 300);
    setTimeout(() => {
      this.notify({
        body: 'Hello, does this work?',
        color: 'blue',
      });
    }, 1300);
  }

  notify(n: Notification): boolean {
    const newNotification = { ...n, id: getId() };
    this.items = [...this.items, newNotification];
    setTimeout(() => {
      this.items = this.items.filter(n => n.id !== newNotification.id);
    }, HANG_TIME);
    return true;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    notifications: Notifications;
  }
}
