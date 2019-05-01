# Server Rendering with Fastboot

Ember's server rendering technology is called "Fastboot". Effectively, it's a small distributed system with one Node process that receives requests, and N workers, each of which maintains a "warm" ember app, ready to emit HTML for a given URL.

The idea is that you should _not_ be writing two apps (despite needing to run on two different environments). In order to do this, you'll need to stick to the _overlap_ of browser and Node.js APIs.
