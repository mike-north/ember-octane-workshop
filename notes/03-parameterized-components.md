# Parameterized Components

We can parameterize components and pass data into them. Ember calls values that are passed into a component from the outside world `args`, and we can recognize them in a template because they begin with an `@` sign.

Let's start with our `<ChannelHeader />` component, parameterizing the channel's `title` and `description`.

in `app/templates/components/channel-header.hbs`

1. find the text `general` and replace it with `{{@title}}`
1. Find the text `foo bar baz (professional)` and replace it with `{{@description}}`

Our component is now parameterized, and ready to receive data!

## Syntax breakdown

- The `{{double-braces}}` indicate that the expression between them is a handlebars expression
- The `@` indicates that a value is passed into the component from the outside world

## Passing in data

You may notice that your component is now blank. Instead of rendering hard-coded values, the component now expects to be passed `args` called `@title` and `@description`. Let's pass it some data:

Go to you `app/templates/application.hbs` and pass some values into the component using key-value pairs

```hbs
<ChannelHeader @title="compliments" @description="Say nice things about your teammates" />
```

Now, you should see the title and description properly rendered
