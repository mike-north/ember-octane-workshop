# Template-Only Components

Components are modular chunksof UI, and can have a `.js` file a `.hbs` file or both. We'll start with the simplest kind of component -- ones that involve no state of their own.

These components can be thought of as pure functions, where `args` are passed in and HTML is returned. Whever the `args` changed, the component will automatically re-render so everything stays up-to-date.

Usually we'd use Ember CLI to generate a new component, but in this case we'll just create a new template file -- that's all it takes.

Create a template file `app/templates/components/team-selector.hbs` and copy the first `<nav>...</nav>` (and everything inside it) to this file.

Now, replace that `<nav>` in `application.hbs` with `<TeamSelector />`, and make sure to save everyhing.
You should see no change to the rendered HTML at http://localhost:4200.

Congrats! You've just made your first component!

Continue with this process until your [`app/templates/application.hbs`](../app/templates/application.hbs) looks like

```hbs
<TeamSelector />
<TeamSidebar />
<main class="flex-1 flex flex-col bg-white overflow-hidden">
  <ChannelHeader />

  <div class="py-4 flex-1 overflow-y-scroll" role="list">
    <ChatMessage />
    <ChatMessage />
    <ChatMessage />
  </div>

  <ChannelFooter />
</main>
```
