# Template-Only Components

Components are modular chunksof UI, and can have a `.js` file a `.hbs` file or both. We'll start with the simplest kind of component -- ones that involve no state of their own.

These components can be thought of as pure functions, where `args` are passed in and HTML is returned. Whever the `args` changed, the component will automatically re-render so everything stays up-to-date.

Usually we'd use Ember CLI to generate a new component, but in this case we'll just create a new template file -- that's all it takes.

Move various parts of [`app/templates/application.hbs`](../app/templates/application.hbs) into their own respective `.hbs` files

1. Create [`app/templates/components/team-selector.hbs`](../app/templates/components/team-selector.hbs)
   - Move `<nav class="team-selector">...</nav>` into it
   - Replace what you deleted from [`application.hbs`](../app/templates/application.hbs) with `<TeamSelector />`
1. Create [`app/templates/components/team-sidebar.hbs`](../app/templates/components/team-sidebar.hbs)
   - Move `<section class="team-sidebar">...</section>` into it
   - Replace what you deleted from [`application.hbs`](../app/templates/application.hbs) with `<TeamSidebar />`
1. Create [`app/templates/components/channel-header.hbs`](../app/templates/components/channel-header.hbs)
   - Move `<header class="channel__header">...</header>` into it
   - Replace what you deleted from [`application.hbs`](../app/templates/application.hbs) with `<ChannelHeader />`
1. Create [`app/templates/components/channel-footer.hbs`](../app/templates/components/channel-footer.hbs)
   - Move `<footer class="channel__footer">...</footer>` into it
   - Replace what you deleted from [`application.hbs`](../app/templates/application.hbs) with `<ChannelFooter />`
1. Create [`app/templates/components/chat-message.hbs`](../app/templates/components/chat-message.hbs)
   - Move one of the `<div class="channel-message">...</div>` into it
      - NOTE: the starting point HTML has more than one of these. Pick one to use for the component, and for now we'll just repeat it several times 
   - Replace what you deleted from [`application.hbs`](../app/templates/application.hbs) with 2 `<ChannelMessage />`s

At the end of this, your [`app/templates/application.hbs`](../app/templates/application.hbs) should look like

```hbs
<TeamSelector />
<TeamSidebar />
<main class="flex-1 flex flex-col bg-white overflow-hidden channel">
  <ChannelHeader />

  <div class="py-4 flex-1 overflow-y-scroll channel__messages-list" role="list">
    <ChatMessage />
    <ChatMessage />
  </div>

  <ChannelFooter />
</main>
```

and you should see no change to the rendered HTML at http://localhost:4200.

Congrats! You've just broken down all of that HTML into components!
