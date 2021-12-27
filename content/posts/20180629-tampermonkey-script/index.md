---
date: 2018-06-29
title: 'Adventures in writing a Tampermonkey Script'
template: post
thumbnail: '../../thumbnails/matrix.png'
slug: Writing a custom userscript
categories:
  - Javascript
tags:
  - Userscript
  - API
---

Tampermonkey Scripting (aka userscripts)

What is it you might ask?

Imagine if you took your favorite chrome extension and made it even better(sort of). [Userscripts](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) are javascript injections on a webpage. They don't have access to chrome's extension APIs so you don't get dedicated toolbar icons like this:

![](./images/userscript_1.png)

But, because it aren't restricted to chrome, they can be used in any browser such as IE, firefox, opera, etc. Userscripts are also much more extensible - with javascript you can also inject HTML and CSS on a webpage too. Chrome Extensions have restrictions against these because otherwise they would be abused to produce this monstrosity

[](./images/userscript_2.png)
 _the infamous internet explorer toolbar spam_

## 

## So what are some use cases of userscripts?

Do you rely on a webapp everyday for work or personal use (e.g. gmail, twitter, facebook, etc) ? Have you ever wanted a feature to roll out from the developer, only to realize it probably will never happen? Most likely because there isn't enough demand for it. So it doesn't make sense for the developer to spend time working on said feature

This is what userrscripts are great for. Rolling out your own features that you directly benefit from.

One of the webapps that I use everyday is called [dynalist.io](https://dynalist.io). I've used it extensively these past 2 years to log things I do at work everyday and for taking course notes. I've written a few posts explaining what I use it for [here](http://vincentntang.com/2017/06/24/how-i-use-dynalist-io/) among others.

Whenever I use a tool long enough I always end up writing an extension for it. I found the general UX of dynalist to be hard on the eyes, so I wrote a [custom CSS theme](https://userstyles.org/styles/144225/dynalist-simple-colors-for-default-theme) _(268 downloads)._

In this theme, I had it limit the display size of images I uploaded. While also respecting aspect ratio. The CSS  looked like this:

```css
img {
  max-width: 600px;
  max-height: 600px;
}
```

The problem I had was that not all images were created equally. Images have different informational density, different sizes, etc. I found myself constantly going back to my custom theme tweaking max-width and max-height of images.

What I needed was a slider that would let me pick max image sizes on the fly. But at the same time be unintrusive because I can't focus with ugly UX applications.

My solution was to overlay a UI button slider at the topleft of the screen. Here is what the final product looks like, using a 1200x1200 image.

![](./images/userscript_3.gif)

For reference this is what it looks like without my extension:

![](./images/userscript_4.png)

## My adventures in writing my first usercript

I didn't really find any good tutorials on how to write a userscript. So this is my adventures of going about solving it.

I already knew what the end result would look like. Here's the requirements I had originally when writing my userscript:

*   It had to inject HTML and CSS
*   It would use a jQuery slider

My first train of thought was to just go on stackoverflow and google ["how to inject HTML and CSS with javascript"](https://stackoverflow.com/questions/707565/how-do-you-add-css-with-javascript/14898381#14898381).

I decided I needed an isolated environment to do a proof of concept. I ended up making a few simplified codepen examples for this:

<iframe height="300" style="width: 100%;" scrolling="no" title="Tamperscript Injection Pt1" src="https://codepen.io/vincentntang/embed/eKKzMO?height=300&theme-id=34950&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/vincentntang/pen/eKKzMO'>Tamperscript Injection Pt1</a> by Vincent Tang
  (<a href='https://codepen.io/vincentntang'>@vincentntang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The first example is just using a basic querySelector to append a div element. Then targeting the CSS after.

<iframe height="300" style="width: 100%;" scrolling="no" title="Tamperscript Injection Pt2" src="https://codepen.io/vincentntang/embed/XYYKoX?height=300&theme-id=34950&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/vincentntang/pen/XYYKoX'>Tamperscript Injection Pt2</a> by Vincent Tang
  (<a href='https://codepen.io/vincentntang'>@vincentntang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The 2nd example was to import the stackoverflow code so I could write natural CSS in a javascript file.

<iframe height="300" style="width: 100%;" scrolling="no" title="Tamperscript Injection Pt3" src="https://codepen.io/vincentntang/embed/NzzBOO?height=300&theme-id=34950&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/vincentntang/pen/NzzBOO'>Tamperscript Injection Pt3</a> by Vincent Tang
  (<a href='https://codepen.io/vincentntang'>@vincentntang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The 3rd example was to put it all together to create the full prototype of what it would look like. I had to borrow some boilerplate jquery slider code [here](https://codepen.io/tutsplus/pen/bdxWbB) because the jquery doc examples were terrible.

After getting a full prototype done, I needed to figure out how userscripts work.

## Getting userscript to work

Luckily for me I had some reference userscripts to work with. I use and rely on a [userscript](https://greasyfork.org/en/scripts/31392-dynalist-powerpack-2) everyday for dynalist, written by a [developer](http://talk.dynalist.io/t/powerpack-2/977) I highly respect.

I tried to port my codepen example over to userscript. It didn't work for whatever reason.

I had to dial back and figure something else out. I remembered how when I wrote my first stylish extension [here](https://userstyles.org/styles/144225/dynalist-simple-colors-for-default-theme), it also had the option to load it in as a userscript file.

I analyzed the original theme I wrote and the userscript version variant. From here, I was able to discern how the CSS was being loaded in. The javascript looks like this:

![](./images/userscript_5.png)

What it did was the following:

*   Use an IIFE (immediately invoked function expression) to have all the variables private (closure)
*   Use a string written in CSS like format and joined it together
*   Errorcheck and append the CSS to the `head`

I ended up tweaking this template and applied it globally to every website. This included things like reddit, twitter, hackernews, discourse forums, etc. I only tried to change the background-color of the `body` tag. What I found out was the following:

*   Some sites have higher CSS specifity than my loaded script, so it wouldn't work. For instance, `id` selectors or `!important`
*   Some sites had Z-index set and/or a 100% height child div on top of `body` so I wouldn't actually see the changes, it was below everything else on the site
*   (NOT SURE) some sites might have disallowed the script to be loaded.

Discourse forums was the only one that worked.

![](./images/userscript_6.png)

Next, I needed to add a `position: fixed` element that sat on top of everything else and put everything together.

![](./images/userscript_7.gif)

I just had to fine tune the CSS at this point in time. The final slider I added a fade transition so I wouldn't constantly see the image width value.

![](./images/userscript_8.gif)

## More problems

While the script looked great it was missing a couple of things:

*   Didn't know whether stylish or userscript was being loaded first - This drastically would change the end result in which CSS had higher specifity.
*   Didn't know if the loading was async or not.
*   Loaded in Jquery on my script, but dynalist already uses it, so doing it twice seems silly.

I ran a few network tests in chrome debugger. I couldn't determine anything from looking at it, I thought I would see a unique CSS or JS file signature that would say "tampermonkey" or "userstyles" script. I tried searching for some unique CSS I had on my stylish extension that would only be keyworded there. Couldn't find anything, so I have a lack of knowledge on how this works.

Instead, I ended up using a `setTimeOut` function instead on my script to ensure it would have the last word in CSS specifity. I found that a duration of 2000ms worked best through some A/B testing.

I also had some issues applying `!important` with jquery so I had to use this [stackoverflow post here](https://stackoverflow.com/questions/1986182/how-to-include-important-in-jquery)

Lastly, I wanted to have an updated git-like changelog and diffchecker to my script. I dumped it into[ greasyfork](https://greasyfork.org/en/scripts/369888-dynalist-image-resizer-v1) host my javascript file.

## In summary

I had no idea what I was doing most of the time writing this script. There were so many things going on behind the scenes that I only scratched the surface of it.

I broke things down into logical steps and worked from there. The code works so I'm not complaining. I'm as much as the end user as I am the developer.

This was a great lesson for me since it builds upon basic web foundations. It would later cement my understanding of:

*   XSS cross-site scripting injections
*   Writing a chrome extension
*   Better understanding of frontend frameworks like react/vue