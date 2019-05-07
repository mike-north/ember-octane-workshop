# Getting Started

## ⌨️ Task: Installing Ember-CLI

The goal of this task is to install ember-cli onto your machine, so you can run the `ember` command in your terminal.

Ember-CLI is the official Ember.js build tool. It handles things like

- Running a development web server
- Running tests
- Code generation
- Compiling static assets

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

## ⌨️ Task: Creating a new app

The goal of this task is to create a new ember app (roughly equivalent to the starting point of this course), using the official Ember Octane blueprint.

We can create a new app by running

```sh
ember new <app-name>
```

This will create a project based on [the default Ember.js app blueprint](https://github.com/ember-cli/ember-cli/tree/7d9fce01d8faa4ce69cc6a8aab6f7f07b6b88425/blueprints/app). If we want to create an Ember Octane app, we can use the [official Ember Octane blueprint](https://github.com/ember-cli/ember-octane-blueprint/tree/396992a0e0582a18fe718e888a57432aaafc46fe/packages/%40ember/octane-app-blueprint) instead

```sh
ember new -b @ember/octane-app-blueprint <app-name>
```

## ⌨️ Task: Starting the development web server

The goal of this task is to serve your ember app using Ember CLI, and to view it in a browser.

While in the project directory, run

```sh
ember serve
```

You should see some indication that the app is running on localhost (`:4200` by default, but customizable via `--port <port-number>`)

    Build successful (2158ms) – Serving on http://localhost:4200/
