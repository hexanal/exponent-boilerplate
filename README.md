# Exponent

## Right off the bat

1. Duplicate the `exponent.config.init` file, modify it to match your project's
info
1. Rename it to `exponent.config.js`
1. Do a cool `npm i`
1. Then it's all about `npm start`

To try it quickly, I recommend you install `http-server` globally and run it and
you should then see a *Hello World!* of sorts.

## What is it?

### 👌 A lightweight boilerplate/framework thing that hopefully helps with:

- getting started in record time to build prototypes, a small landing page, etc.
- using somewhat modern tools -> webpack, Sass, assets minification, etc.
- with a focus on simplicity and minimalism
- using a **Component** system that helps you organize your JS code

### 👍 What it should be used as:

- a way to augment Wordpress/Drupal websites in need of some more interactivity
- building static websites in straight HTML and straight JS, but with all the
compilation pipeline taken care of
- as a "starter kit" that you improve with new components and middlewares.

### 👎 What it's *not*:

- a powerful full-featured React-powered opiniated UI framework using
bleeding-edge technology
- ready to be used at scale on huge websites (not yet!)

## Getting started!

The HTML markup is your responsibility: an `index.html` example is provided so
you can open that and check out how it's made. The comments will guide through
the codebase and bring you up to speed.

## Motivations

The goal is to provide a lightweight base on which to build modern Javascript
projects that play well with regular old HTML.

It uses webpack to grab an *entry point* Javascript file, which orchestrates the
assets: you've got Sass and CSS support, modern JS features support, CSS styles
are hot-reloaded, images are optimized by *imagemin*, sourcemaps are supported.

All very basic things, but it's nice to know you've got them.

I personally built it so that I have something with a very small footprint to
start with, that is somewhat modular and can easily be molded into whatever I
want it to be. By design, there is very little hand-holding, as I trust that web
developers are very capable of making it their own.

## Roadmap / What's next?

For now, this is simply a boilerplate but I guess I could make it an npm package
so it could benefit from versioning and regular updates.

Other ideas for the future:

- propose an easy way to write middlewares
- provide a plugin/middleware ecosystem that's easy to use
- come up with a nice logo?
- might rename it because it's a bit on-the-nose and nerdy
- maybe add tests... (note: I never write tests, but I should!)
- more examples, more middlewares
