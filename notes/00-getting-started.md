# Getting Started

## Installing Ember-CLI

Ember-CLI is the official Ember.js build tool. It handles things like

-   Running a development web server
-   Running tests
-   Code generation
-   Compiling static assets

You can install ember-cli globally by running

    npm install -g ember-cli

Now you should be able to run

```sh
ember --version
```

and see something like

```sh
ember-cli: 3.10.0
node: 11.6.0
os: darwin x64
```

## Creating a new app

 We can create a new app by running

```sh
ember new <app-name>
```

This will create a project based on [the default Ember.js app blueprint](https://github.com/ember-cli/ember-cli/tree/7d9fce01d8faa4ce69cc6a8aab6f7f07b6b88425/blueprints/app). If we want to create an Ember Octane app, we can use the [official Ember Octane blueprint](https://github.com/ember-cli/ember-octane-blueprint/tree/396992a0e0582a18fe718e888a57432aaafc46fe/packages/%40ember/octane-app-blueprint) instead

```sh
ember new -b @ember/octane-app-blueprint <app-name>
```

## Starting an app

While in the project directory, run

```sh
ember serve
```

You should see some indication that the app is running on localhost (`:4200` by default, but customizable via `--port <port-number>`)

    Build successful (2158ms) – Serving on http://localhost:4200/
