---
date: 2019-09-07
title: 'Learning Vue as a React Developer'
template: post
thumbnail: '../../thumbnails/vue.png'
slug: learning-vue-as-a-react-developer
categories:
  - Popular
  - Personal
tags:
  - vue
  - react
  - javascript
---

React. The first major JavaScript framework I decided to learn coming from jQuery land.

My journey learning was painful. I had to watch three different Udemy tutorials to finally get it. Months were spent wrapping my head around this foreign way of coding.

I slowly and surely learned the basics, such how state management works and how the React lifecycle operates. These things came with time and eventually I learned to use this knowledge to build apps in hackathons and to build tools I would use in my daily life.

The time came to start my first development job as part of a team that used Vue. I didn't know anything about this framework and I felt like I had to learn JavaScript all over again.

This intense but interesting new journey where I transitioned from React to Vue left me with the following valuable lessons that I want to share with you.

## Installation

Vue has a CLI like Create-React-App, but gives you more control with what settings you get out of the box. For instance, you can choose whether you want to include client-side routing or CSS Pre-processors like Sass.

![](https://thepracticaldev.s3.amazonaws.com/i/sj45votfzhc3hwpso1n2.png)

## Styling and Syntax

React uses JSX which lets you write HTML-like syntax.

Writing in Vue was like revisiting the good old days of EJS or any templating language. No longer did I have to write my HTML, and then convert it to JSX. I could just write HTML^TM and be on my way.

Here's an example of what a typical Vue file looks like:

```html
<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "Hello World"
      }
    },
  }
</script>

<style lang="scss" scoped>
  .h1 {
    color: red;
  }
</style>
```

Assuming you declared your Vue component at the top level, this just outputs a "Hello World" string in red color.

In Vue, you write single file components. By convention, your component file will include the declaration of your template at the top, followed by a script definition with all the component logic, and it will close with any necessary style declarations.

React, on the other hand, is less opinionated on file structure. You can still create single file components but instead of implementing the template in HTML and the styling in SCSS, for example, you would write everything in Javascript: template in JSX and styling in CSS-in-JS. This is demonstrated in this example:


```js
import React, { Component } from 'react';

export default class MyFirstComponent extends Component {
  state = {
    message: 'Hello World',
  };
  render() {
    return (
      <div>
        <h1 style={styles.color}>{this.state.message}</h1>
      </div>
    );
  }
}

// CSS in JS
const styles = {
  header: {
    color: 'red',
  },
};
```

but you could also just import a `.css` or `.scss` file as well. The problem you run into though when using an import, is you pollute the global namespace. As your app and your team grows, chances are high your developer co-worker might name a class the same as yours.

You could opt to use a library like `styled-components`. This gives you a Sass-like syntax to tightly couple your styles with your JSX.

React brings another set of issues. Do you use a functional component or stateful component? By default, it's better to use only what you need, but this means potentially more refactoring down the road. This doesn't factor in that you can use React Hooks now instead of class components.

## Props, State

React has something called props, which is data loaded in from the parent component. And something called state, data intrinsic to that component.

Here's an example of just rendering a "Hello World" message:

```jsx
// React Parent Component
import React, { Component } from 'react';
import Child from './Child';

export default class Parent extends Component {
  state = {
    message: 'Hello World',
  };
  render() {
    return (
      <div>
        <Child message={this.state.message} />
      </div>
    );
  }
}
```

```jsx
// React Child Component
import React from 'react';

const Child = props => {
  return <div>{props.message}</div>;
};
export default Child;
```

With Vue, the concepts were the same. But Vue prefers convention over configuration. Meaning, there are specific naming conventions. Child components declared in parent component are in camelCase. When the component is added to the HTML, the syntax is then kebab-case.

Example:

```html
<!-- Vue Parent Component -->
<template>
  <div>
    <child-component :message="message"/>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent.vue';
  export default {
    data() {
      return {
        message: 'hello world',
      };
    },
    components: {
      ChildComponent,
    },
  };
</script>
```

```html
<!-- Vue Child Component -->
<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        default: undefined,
      },
    },
  };
</script>
```

Vue requires you to declare a child component twice, once on import another on `Components`.

React differs in that there is one less step, you import the file then use it.

## Type Enforcement

One thing I miss in static languages like C# or Java is type enforcement. Javascript is a dynamic scripting language. Meaning it doesn't care if a variable is a string, number, boolean, etc.

When you declare a string, you can always typecast it to a number after. This makes scaling large frontend apps difficult. Because you might not know what data type you're working with.

React natively solves this with `PropTypes`. Example in the `<Child/>` component we made earlier:

```js
import React from 'react';
import PropTypes from 'prop-types';

const Child = props => {
  return <div>{props.message}</div>;
};

Child.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Child;
```

There are a few issues with propTypes in React

- It's really easy to misspell
- It's optional
- You have to declare an import

Because of these reasons, I find myself forgetting to use propTypes. You could opt to use Typescript instead with React, but this just means more additional time configuring your setup.

Vue requires the declaration of props, and propTypes are in the same location. Inside your `<script>` tag where all the other logic lives

Example of a child component:

```html
<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        default: undefined,
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
```

This is a much better design overall and makes it so that Typescript is not necessary in Vue.

## Data Reactivity

This was the concept that tripped me on Vue several times. In React, everything is reactive. Meaning you can add properties to objects, and React would call it's lifecycle when properties changed.

In Vue ... things don't work the same. In React, every time you modify state, you could pass a new entire state object.

Vue differed in that you *mutated* your state directly through methods. Because we're intrinsically adding side effects, you have to actually *declare* when new properties are being added to the object.

Namely using something called `Vue.set()`.

A common example of when you would use this is if your loading data from the backend. And need to create new data to send back.

You also have to define a `key` value for components that have been iterated. React / Vue work the same way, it lets the library know what parts to rerender on data changes.

## Watchers and Observables

I never quite understood design patterns that well. But the term "observable" finally made sense to me.

Vue has something called watchers. This lets you call a method every time a specific variable changes.

However, there's some caveats, because you could have watchers watching watchers. This causes circular referential issues.

The Vue docs warn against this. I myself have accidentally done this using inputs to watch over other inputs.

React's implementation of watchers is through the lifecycle method of `componentDidUpdate`. You select which items you wish to watch independently inside of here.

For the React Hooks implementation, `useState` is another implementation of an observable

## Computed properties

This was a new concept to me, from the React world. In Vue, you can have variables that depend on other variables. Anytime a dependency changes, so does the computed property.

It seems useful at first, but computed properties are only good if you aren't modifying it at all directly.

When you start needing to, this is when you go away from computed properties entirely to the next item...

## Methods

Methods in Vue worked the same as in React. These methods were called through event-directives that extend from HTML DOM events. Examples include putting `@click` events, or `@input` if a user typed text in an input field.

Methods are what you'll always fall back in Vue when computed properties and watchers don't fit your use-case.

Methods are like any function in javascript. The return statement is optional, you can just use it to mutate data in the background.

## Asynchronous Gotchas

This is a gotcha that you find out later in Vue, and in React. 
In React, there is a built-in method called `setState()`. When `setState()` gets called, it gets handled asynchronously in the background.

Vue is no different, you have a method called `Vue.nextTick()` that awaits the latest updated value to the data.

One lesson I learned is that it's best to set local variables within your methods, and only mutate data attributes as needed.

## Templates

With Vue, there is something called `templates`. In your component, you have the ability to declare `<template>` slots. When that component gets called, you can inject HTML where those slots match.

This has been immensely useful when working in libraries. I could inject functionality as I saw fit, to get the feature I needed.

Templates do not get rendered as a `<div>` element in the DOM. React has a similar approach to templates called fragments, but the approach is limited to just the first element in your component.

## Lifecycle methods

Lifecycle methods describe what components do during their lifetime.

Here are common ones you'll use in Vue:

- mounted() - Similar to React's `componentDidMount`. This generally when making an Axios/fetch call to initialize data in your component from a backend.
- updated() - Similar to React's `componentDidUpdate`. When you update data through your components, you want to send a POST request to your backend to keep things in sync
- destroyed() - Similar to React's `componentWillUnmount`. You don't need to use this, but it helps clean up leftover event listeners.

## Hooks

Hooks makes React an extremely powerful framework. No longer did you have to use redux for handling state, you could just use `useState()` instead. No longer did you have to deal with `setState()`, there were a slew of other new improved methods to use.

Vue has no equivalent to hooks, although there is an RFC at the time of writing this

## Directives

Vue's built-in directives make development a breeze. You could create iterable directives right inside your HTML.

In React, this often meant making another component called "group(s)" and maybe one called "group".

Vue, you can just dump the `v-for`, `v-if` etc right inside your HTML. Your logic coherently just makes sense looking at it.

Alternatively, you can write your own directives! This lets you attach functionality to page if necessary, making it easier to develop faster

One great use case for startups is to develop a reporting system. If a user clicks on a feature that doesn't yet exist, you can add a popup modal saying "Sorry we're working hard on this new feature! Come back later". In the background, you can make Axios request to notify users really do want that feature.

## Mixins

Some companies swear by these. It's a reusable code snippet library that can be implemented across multiple components. React out of the box does not have such a feature, you can alternatively use callback functions instead that are made globally available

## Emitting Events

Props are passed from parent to child component, via one-way data binding. To handle business logic at the parent level, from the child component, you generally emit events.

With Vue, there are two different ways.

1. You can pass a reference to the function from parent to child
2. Emit an event from the child and capture the response in parent

Most applications generally use #2. Example from a button that triggers a method in the parent component

```html
<!-- Parent Component -->
<template>
  <ChildComponent @event-emitted="_handleUpdatedEvent"/>
</template>

<script>
  import ChildComponent from './components/ChildComponent.vue';

  export default {
    components: {
      ChildComponent,
    },
    methods: {
      _handleUpdatedEvent(val) {
        console.log('Button was clicked');
      },
    },
  };
</script>
```

```html
<!-- Child Component -->
<template>
  <div class="hello">
    <button @click="$emit('event-emitted')">Click Me</button>
  </div>
</template>
```

## Global State Management

Vue's CLI comes with the ability to add Vuex out of the box.  

In React you pass a new set of state using `setState()`, Redux only extends this through global dispatches/flux architecture. 

In Vue, you mutate objects behind the scene. Vuex is no different but at the global level. 

Vue natively ships with the ability to create a global event bus, which is similar to React's context API.

## Final Thoughts

Learning Vue has been a great way to learn new programming paradigms.

Many principles in React translate over to Vue. There are a few things that differ, namely:

- You don't replace your state, you mutate it which creates data reactivity and async gotchas.
- New constructs. There are computed properties, watchers, and mixins that don't exist in React out of the box
- You write HTML and styles the way you would traditionally in a regular HTML page.
- PropTypes are optional in Vue and React, but Vue requires less effort to enforce.
- Styling. In Vue you just write Sass or CSS, it's super easy compared to React.

These are some of the differences from React to Vue. Some things that are similar include:

- Lifecycle methods
- Props/State
- Assigning keys to iterated items
- Methods / functions
- Passing events upward