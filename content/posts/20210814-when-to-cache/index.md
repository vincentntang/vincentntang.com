---
date: 2021-08-14
title: 'When to use redux, local/session storage, and backend caching'
template: post
thumbnail: '../../thumbnails/sql.png'
slug: when-to-use-redux-local-session-storage-backend
categories:
  - Programming
tags:
  - Architecture
  - Engineering
---

Caching creates a copy or temporary storage that you can retrive/write to fairly quickly. It's used often for optimizing performance on a website. But it comes at a cost of making managing data more difficult, as redundant data lives in our system now

If you are building a decoupled website, say a React frontend and NodeJS backend, you can cache a few different ways.

The frontend has a set of methods:

- Storing in redux, or global state
- Storing in local storage
- Storing in session storage
- Storing in the browser

Likewise, the backend does too

- Storing data in redis/or similar caching

How do you decide which caching to use in each instance?

## Is your database the bottleneck?

The first tweak you should look at is what data is being retrieved to your backend. Imagine this scenario:

You run a website called reddit.com. A couple of million visitors might visit daily. Your database might be stored in a relational data format:

- Users
- Posts
- Comments
- Subreddits

Say for instance you want to grab the top trending posts. This means you might compile the top posts everytime for each user request, which might be an expensive operation. It could require multiple lookups in the database.

This is where you implement caching. You write the results of this calculation to your cache, and every user who hits the frontpage reads this cache.

Common things to cache include

- Frequent GET requests made by anonymous users in general. Frontpage, trending posts, etc
- User credentials

**Always look at backend caching strategies first as this is generally a huge performance bottleneck**

If database/backend caching isn't an issue, look into the next result

## Do I need to read/write data on non-important data?

When a user goes to your site, there's a set of data associated with them that's not all that mission critical

What do I mean by this?

Say for instance you go to a service like https://smallpdf.com/sign-pdf. It gives you 2 free entries for signing PDFs online

How does it know you only have 2 free entries if you don't log in? It could do this a number of different ways

- Track your IP address
- Track your local storage on your computer

It does the latter which is less expensive. The average user won't clear their cookies, and the site doesn't want the overhead of capturing and storing that data.

So using local storage makes the most sense here.

Other instances of using localstorage include a user's preference on the site. This could be whether they prefer a dark vs light theme

**Store non-important user information in local storage to reduce calls to the backend and make the UX more streamlined**

If you need to store information for authentication, look into this next:

## Do I need cross domain support on non-important data?

Session storage is similar to localstorage, but this is mostly used for authentication services.

Say for instance you have a website

- www.mywebsite.com

And you have an authentication tool that lives here

- myauth.mywebsite.com

If a user gets redirected to myauth.mywebsite.com for logging in, we would want to store any specific user data in the session for that domain.

This way www.mywebsite.com can read that data to know a user is logged in

**Session storage comes in handy when you have a seperate authentication service on the same domain**

If this doesn't apply, look into the next security implementation:

## Do I need to store authentication credentials on the browser?

Cookies are much smaller in payloads compared to session storage, but it's significantly simpler to manage.

If a user goes to a website, it might make a call to an API which may return back a response-header

This response-header has a `set-cookie` property associated with it, that stores the cookie in your browser for however long your on the site.

Each request made afterwards uses that cookie to authenticate backend requests.

**Storing authentication credentials in the browser via a cookie is one of the simpler ways of implementing authentication, as there is less moving parts**

If none of the above apply, look into the frontend caching

## Do I need information stored b/w multiple client routes?

If none of the above applies to you, you might want to look into redux/global-storage tools in your frontend tooling like React or your favorite SPA

Say you are using React-Router in this instance and your building a catalog of books online

1. website.com/books
2. website.com/books/new
3. website.com/books/edit/12345

In this, you have 3 seperate routes. (1) renders all the books added to the site. (2) creates new books. (3) edits existing books

While you could make a GET request for each of these, everytime a user goes to a link, you don't need to do this unless the user does a hard page refresh.

You could store & update the array of books in a redux global store and make only the POST requests for updating the data on the backend.

So a user for instance could add 10 books, but only one GET request is made when the user hits the site.

**Implementing frontend caching this way via a global store is useful for reducing the number of calls to a backend**

Hopefully you found this helpful! There's many more strategies to scaling web apps besides caching, this post just scratches the surface

