---
date: 2021-10-19
title: 'Developer Tips: Add Progressive Code Reviews'
template: post
thumbnail: '../../thumbnails/writing.png'
slug: progressive-code-reviews
categories:
  - Programming
tags:
  - Planning
  - Logistics
---

As a developer, your tasked with building new features for a new or existing app. Sometimes you have to make tough decisions. 

There are times where there's 4 or 5 solutions to a problem. Where none are ideal. Some might introduce technical debt. Others require rewrites. Some solutions break away from the standards in the app, whether good or bad, which creates more mental overhead.

In the past, I implemented the solution and asked for feedback later. 

If I made the wrong call, I'd have to undo all the changes. And lose a few days worth of work.

So it's important to get feedback early on and revise as needed. Through what I call **"progressive code reviews"**. Here are some ways:

- Do Draft PRs early on before a feature is finished
- Add comments explaining why you made changes to the PR and what things are quesionable
- Collaborate with your code-reviewer and inform them of changes coming in the pipeline
- Facilitate cross team meetings

Recently I've pushed for a culture at work to do this. I got this compliment as a result :)

```
Just wanted to say I appreciate your attention to detail on stuff like this. I am happy we are matching the fields with the backend and syncing on these meetings. It was a good idea to talk to [scrum-master] and have us sync daily on this ticket.
```
