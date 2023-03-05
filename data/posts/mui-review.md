---
slug: "mui-review"
date: "2023-03-06"
title: "MUI 4 Review"
author: "Mike Hansford"
type: "post"
tags:
    - CSS
    - CSS-in-JS
    - CSS Frameworks
---
## What is MUI?
[MUI](https://mui.com) is a CSS Framework for ReactJS. It is a set of pre-built components that gives you much of what you typically need to build a website / web application with React.

It uses CSS-in-JS for styling. Specifically, it uses [Emotion](https://github.com/emotion-js/emotion) by default and this can be swapped out for Styled Components if desired - coz, you know [Styled Components](https://github.com/styled-components/styled-components) is cooler.

TLDR;? It's fine if you want a quick start. Particularly if you're building a demo and want a quick hit of styling.

## What's good about MUI?
### Components
The thing that gives developers using MUI is the quick start it gives them. As I said in the intro, you get a number of pre-built components. Some of them are quite basic, such as ```Box```, while others such as the ```Accordion``` or  ```Drawer``` are quite complex components, with JavaScript and styling rolled into one component. 

While the basic components are really basic and I wonder why the MUI team even bothered with them, the more complex components really make MUI worthwhile.

### Theming via Provider framework
Theming is done through the Provider framework which is an appropriate approach. I seem to recall that it's exactly something that the React doco says the Provider framework is for (somewhere).

### The documentation
It's pretty good. It really helps with adoption and use.

## What's not so good?
> _Attwood's Law_
>
> “Any application that can be written in JavaScript, will eventually be written in JavaScript.”


But not necessarily a good idea... 

### CSS-in-JS
*sigh*...

CSS-in-JS is never a good idea.

Firstly, it creates a disconnect between what you write in your code editor and your browser's dev tools. You are trapped in a cycle of having to translate between the CSS you see and the CSS-like JavaScript you have to write. It's an unnecessary layer of abstraction.

Secondly, I've found that finding components in JSX that, when you look them up, exist only to provide styling adds additional cognitive overhead when adopting an existing codebase. When I'm interested in program flow, finding components whose sole reason for existence is to make something look right interferes with my train of thought.

Thirdly, it doesn't remove the need to understand CSS anyway. A developer can try to ignore CSS but it's a reality of web dev. Just learn it. In some jobs I've worked, the hardest problems have been CSS problems*. It's part of the reality of working in the field.

### Basic components not really doing anything
Some components seem to exist simply to keep everything looking like MUI.

The ```Box``` component simply puts a ```div``` element on the screen. And it, quite frankly does little else...

Every component has a number of what's called [system properties](https://mui.com/system/properties/) which are individual CSS properties wrapped up nicely for React's benefit.

### Grid component still using Flexbox
Hey, it's 2023. CSS Grid has been around for quite a while. Every current browser supports it.

### Media queries are a React hook
Why on earth do we want to complicate matters further? I think I've already moaned enough.

### The default heading sizes for the Typography element are HUUUUUUUUGE!
Lesson 1: Creating a custom style to resize those gargantuan heading sizes...

### Potential for DIV soup
You will have to use the ```component``` property a lot in order to create semantic HTML elements. Why not just use the elements directly when you can? It seems to me there's going to be less messing around.

### Does nothing to try to promote good CSS design
MUI encourages styling at the component level through the use of the afore-mentioned system properties. This leads to a design that is impossible to manage over time.

There are a lot of styling decisions that need to be made at the level of the whole website. Your heading styles for example. Styling these globally is essential to being able to manage your website over time. Styling them at the component level, as MUI encourages is a path to long term pain.

So here I can hear a bunch of React devs screaming that you create a HeadingOne component and style your headings there. Then all you have to do is reuse it everywhere. I'm of the opinion that you should create a component when you need functionality, not styling. Re-use isn't a reason on its own.

A more direct approach to the above would be to create CSS in the ```:root``` that directly styles ```h1``` to ```h6```. No messing around. Job's done. It's out of the way, leaving your JavaScript to do things that only JavaScript can do.

Sound CSS methodologies such as [SMACSS](http://smacss.com/) by comparision promote the use of a layered CSS design that controls you CSS from the page, down to the individual atom - applying styling at the relevant point.


--------------------------------

*Specifically, working around some horrible ```!important``` soup. Thanks Bootstrap. Nah, actually no thanks at all... it sucked. And the solution made me want to clean myself off.