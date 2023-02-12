---
date: 2023-02-09
title: "Grasping a new codebase - write the name of all files"
template: post
thumbnail: "../../thumbnails/writing.png"
slug: grasping-new-codebase
categories:
  - Coding
tags:
  - Coding
---

Here's a simple trick to breaking down and understanding a frontend codebase you aren't familiar with

Inside where the HTML gets rendered in each component, write the name of the file

So for instance, say you have a React file like so:

```tsx
EditVendorDetails.tsx;
```

and the component looks something like this:

```tsx
export const EditVendorDetails = () => {
  return (
    <div>
      <p>Hello World</p>
      <p>More content goes here</p>
    </div>
  );
};
```

Just add add the name of the file in the JSX

```tsx
export const EditVendorDetails = () => {
  return (
    <div>
      EditVendorDetails.tsx
      <p>Hello World</p>
      <p>More content goes here</p>
    </div>
  );
};
```

You can use devtools or component loggers in the framework your using. But this doesn't always work for instance if you pull in a CSS library like MaterialUI, but this method works everywhere

Once you identify which component is where on the page, you can quickly search it in VScode

I also like to break down and understand how a set of common functionalitys on the app

For instance, I've recently gotten into using AstroJS, a static site generator tool. Instead of reading the docs I simply broke apart the sample repo to understand how blog files are generated
