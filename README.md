# Ember Octane Workshop: Shlack

This is the project used for the <a title="Mike North's" href="https://github.com/mike-north">Mike North's</a> <a title="Ember Octane" href="https://emberjs.com/editions/octane/">Ember Octane</a> course, where we build a chat app together step-by-step

![](./notes/img/app.png)

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Ember CLI](https://ember-cli.com/)
- [Brave](https://brave.com/), [Firefox](https://www.mozilla.org/en-US/firefox/) or [Chrome](https://google.com/chrome/)

# Getting Set Up

There are a few things you need to ensure you have installed, in order to be ready for this course.

### Node.js

You’ll need a relatively recent version (v10.0 or newer ideally) of Node.js installed. On OS X, a great way of doing this without disturbing your existing dev environment is to install NVM. [Installation instructions are here](https://github.com/creationix/nvm#installation).

### Install & Update Script

Either download and run the nvm script manually, or run the following cURL or Wget command:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Then run:

```
export NVM_DIR="/Users/{username}/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

You’ll know everything is set up properly when you can run

```
nvm --version # might look like "0.34.0"
node --version # might look like "v10.15.3"
```

### Ember-CLI

Ember-CLI is the official Ember.js build tool. It handles things like:

- Running a development web server
- Running tests
- Code generation
- Compiling static assets

We can install ember-cli globally by running

```
npm install -g ember-cli
```

Now you should be able to run

```sh
ember --version
```

and see something like

<!-- The term "see something like" may confuse users from the standpoint of a user wondering if the versions should be the exact match or not and if not when does a version stray too far from the listed version below that it becomes a problem. Changing the language to something like:  "You will see the following if everything is installed correctly" may be clearer to the user. -->

```
# NOTE: your version numbers may be different. This is fine!
ember-cli: 3.10.0
node: 11.6.0
os: darwin x64
```

### Visual Studio Code

Particularly if you’ve never tried it before, you should install [Microsoft Visual Studio Code](https://code.visualstudio.com/). Some fantastic extensions that I use regularly include

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Ember-CLI in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=felixrieseberg.vsc-ember-cli)
- [Ember Language Server](https://marketplace.visualstudio.com/items?itemName=emberjs.vscode-ember)

### Clone the Project

```sh
git clone git@github.com:mike-north/ember-octane-workshop.git shlack
```

### Install dependencies

```sh
cd shlack
yarn install
```

### Start the development server

```sh
ember serve
```

- Visit your app at [http://localhost:4200](http://localhost:4200)
  - You will see a Congratulations message if the app is correctly spun up
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests)
- Your app runs on localhost `:4200` by default. You can customize this via `--port <port-number>`

### Code Generators

Make use of the many built-in Ember-CLI generators to get files that follow the latest practices (with matching tests\_. To see available generators, run `ember help generate`

### Running Tests

- `ember test # to run all tests`
- `ember test --server # to re-run tests on every file change`

### Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

### Building

Depending on whether you want an un-minified development build or a minified production build (takes longer, but results in smaller file sizes) you may run either of the following
- `ember build # development`
- `ember build --environment production # production`

## Troubleshooting

- Be sure your [watchman](https://facebook.github.io/watchman/) is up-to-date by running `brew install watchman` or follow the documentation [embercli](https://ember-cli.com/user-guide/#watchman)
-

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## How this starting point was created

We _could_ create a new Ember app by running the following command (you don't need to run this):

```sh
ember new <app-name>
```

This would create a project based on [the default Ember.js app blueprint](https://github.com/ember-cli/ember-cli/tree/7d9fce01d8faa4ce69cc6a8aab6f7f07b6b88425/blueprints/app).

If we want to create an Ember Octane app, [Ember Octane](https://emberjs.com/editions/octane/) being the newest version of Ember.js, we can use the [official Ember Octane blueprint](https://github.com/ember-cli/ember-octane-blueprint/tree/396992a0e0582a18fe718e888a57432aaafc46fe/packages/%40ember/octane-app-blueprint) instead by running:

```sh
ember new -b @ember/octane-app-blueprint <app-name>
```

This workshop project is basically a new ember app, with the following packages pre-installed for your convenience:

- [ember-cli-tailwind](https://github.com/embermap/ember-cli-tailwind)
- [ember-on-modifier](https://github.com/buschtoens/ember-on-modifier)
- [ember-cli-pretender](https://github.com/rwjblue/ember-cli-pretender)

```sh
ember install ember-cli-tailwind ember-on-modifier ember-cli-pretender
```

Added the files in the `server` folder, and the `db.json` to provide a development JSON API, and created the `notes` folder and markdown files inside it.

## Thank You!

A lot of people helped in incredibly significant ways to make this curriculum possible. Special thanks to the following people for going way above and beyond

### Project Reviews & Refactors

**Lisa Huang-North** - [LinkedIn](https://www.linkedin.com/in/lisaychuang/) | [GitHub](https://github.com/lisaychuang) | [Twitter](https://twitter.com/lisaychuang)

> Comprehensive review, usability and “newcomer acceptance testing”

**John Robinson** ( [LinkedIn](https://www.linkedin.com/in/robomalo/) | [GitHub](http://github.com/robomalo) | [Twitter](http://twitter.com/robomalo) )

> Semantic HTML, a11y

**Robert Jackson** - [LinkedIn](https://www.linkedin.com/in/rwjblue/) | [GitHub](https://github.com/rwjblue) | [Twitter](https://twitter.com/rwjblue)

> Ember Core Review

**Chris Garret** - [LinkedIn](https://www.linkedin.com/in/pzuraq/) | [GitHub](https://github.com/pzuraq) | [Twitter](https://twitter.com/pzuraq)

> Ember Core Review

### Curriculum

**Shankar Sridhar** - [LinkedIn](https://linkedin.com/in/shankar123/) | [GitHub](https://github.com/shankarsridhar)

> _Huge_ contributions to the [workshop notes](./notes)

### Starting Point HTML/CSS

**Adam Wathan** ( [LinkedIn](https://www.linkedin.com/in/adam-wathan-9418984a/) | [GitHub](http://github.com/adamwathan) | [Twitter](https://twitter.com/adamwathan) )

> Used [his HTML/CSS](https://adamwathan.me/flex-layout-demo/) to make this workshop’s starting point

## Legal

&copy; 2019 LinkedIn

### Licensing

The _code_ in this project is licensed as [BSD-2-Clause](https://opensource.org/licenses/BSD-2-Clause) license, and the written content in the `./notes` folder is licensed under [CC-BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)
