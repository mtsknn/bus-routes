# :oncoming_bus: Bus routes

My solution to the
[coding challenge by Solidabis](https://koodihaaste.solidabis.com/) using only
JavaScript. In short:

> Find the fastest bus route between the two stops that the user chooses. The
> route must show what bus lines to use. Changing buses doesn't incur any
> additional delays.

Instead of finding just the fastest route, I wanted to find all of them and let
the user choose any one of them. Who doesn't like scenic routes?

## How to run the app

1. `npm i`
2. `npm start`
3. ???
4. PROFIT!!

## Anti-features

- Not optimized for performance because the app already feels fast enough (i.e.
  works on my machine&trade;)
- Not optimized for production because I didn't want to mess with Webpack
  configurations once again (actually, I would probably have chosen Parcel)
- Not optimized for narrow screens because I was lazy. Also, the CSS is somewhat
  messy (again because I was lazy)
- Not made accessible, e.g. for screen reader users (sorry!). I do care about
  accessibility, but I was&mdash;well, you know
- The map layout is designed by hand since the map is just a bonus, so adding or
  removing stops or roads would most probably break the layout. Maybe generating
  a nice layout automatically could be a topic for another coding challenge?
  :wink:

## How the routes are calculated

I.e. the idea behind `src/js/getRoutes.js`.

First, the original road data (see `src/js/data.js`) is flat-mapped (i.e. mapped
and then flattened, i.e. `[].flatMap()`) to contain all possible bus lines for
each road:

```js
// Before
[
  { from: 'A', to: 'B', duration: 3 },
  // ...
  { from: 'C', to: 'D', duration: 5 },
  // ...
]

// After
[
  { from: 'A', to: 'B', duration: 3, bus: 'green' },
  // ...
  { from: 'C', to: 'D', duration: 5, bus: 'green' },
  { from: 'C', to: 'D', duration: 5, bus: 'red' },
  // ...
]
```

Second, since the original data contains road data only for one direction (e.g.
from A to B but not from B to A), the roads are mapped to include both
directions. The `backwards` field is used when generating the map:

```js
[
  { from: 'A', to: 'B', duration: 3, bus: 'green', backwards: false },
  { from: 'B', to: 'A', duration: 3, bus: 'green', backwards: true },
  // ...
  { from: 'C', to: 'D', duration: 5, bus: 'green', backwards: false },
  { from: 'D', to: 'C', duration: 5, bus: 'green', backwards: true },
  { from: 'C', to: 'D', duration: 5, bus: 'red', backwards: false },
  { from: 'D', to: 'C', duration: 5, bus: 'red', backwards: true },
  // ...
]
```

This may seem redundant, but makes it much easier to work with the data.

With those preparations done, the actual routes are calculated one stop at a
time using recursion. E.g. from A to B:

<details>
  <summary>Initial data (click to toggle)</summary>

```js
{
  buses: [],
  busLines: 0,
  duration: 0,
  roads: [],
  stops: ['A'],
}
```

</details>

<details>
  <summary>1st iteration</summary>

```js
[
  {
    buses: ['green'],
    busLines: 1,
    duration: 3,
    roads: [
      { duration: 3, from: 'A', to: 'B', buses: 'green', backwards: false },
    ],
    stops: ['A', 'B'], // B is the destination → this route is complete
  },

  {
    buses: ['green'],
    busLines: 1,
    duration: 1,
    roads: [
      { duration: 1, from: 'A', to: 'D', buses: 'green', backwards: true },
    ],
    stops: ['A', 'D'],
  },

  {
    buses: ['green'],
    busLines: 1,
    duration: 1,
    roads: [
      { duration: 1, from: 'A', to: 'C', buses: 'green', backwards: false },
    ],
    stops: ['A', 'C'],
  },
]
```

</details>

<details>
  <summary>2nd iteration</summary>

```js
[
  {
    buses: ['green'],
    busLines: 1,
    duration: 3,
    roads: [
      { duration: 3, from: 'A', to: 'B', bus: 'green', backwards: false },
    ],
    stops: ['A', 'B'], // This route is (still) complete
  },

  {
    buses: ['green', 'green'],
    busLines: 1,
    duration: 3,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 2, from: 'D', to: 'B', bus: 'green', backwards: true },
    ],
    stops: ['A', 'D', 'B'], // This route is complete
  },
  {
    buses: ['green', 'green'],
    busLines: 1,
    duration: 6,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 5, from: 'D', to: 'C', bus: 'green', backwards: true },
    ],
    stops: ['A', 'D', 'C'],
  },
  {
    buses: ['green', 'red'],
    busLines: 2,
    duration: 6,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 5, from: 'D', to: 'C', bus: 'red', backwards: true },
    ],
    stops: ['A', 'D', 'C'],
  },
  {
    buses: ['green', 'blue'],
    busLines: 2,
    duration: 4,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 3, from: 'D', to: 'E', bus: 'blue', backwards: true },
    ],
    stops: ['A', 'D', 'E'],
  },
  {
    buses: ['green', 'green'],
    busLines: 1,
    duration: 4,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 3, from: 'D', to: 'E', bus: 'green', backwards: true },
    ],
    stops: ['A', 'D', 'E'],
  },
  {
    buses: ['green', 'red'],
    busLines: 2,
    duration: 7,
    roads: [
      { duration: 1, from: 'A', to: 'D', bus: 'green', backwards: true },
      { duration: 6, from: 'D', to: 'R', bus: 'red', backwards: false },
    ],
    stops: ['A', 'D', 'R'],
  },

  // Similarly, routes starting with stops A and C (abbreviated for brevity)
  { stops: ['A', 'C', 'D'], buses: ['green', 'green'] },
  { stops: ['A', 'C', 'D'], buses: ['green', 'red'] },
  { stops: ['A', 'C', 'E'], buses: ['green', 'green'] },
]
```

</details>

And so on. In the end, the array contains only complete routes.

There's again quite a lot of repetition and redundancy, but after all
iterations, each array item contains all necessary details of a single route so
that it's easy to display the list of routes and to update the map.

## Dependencies

Apart from [normalize.css](https://github.com/necolas/normalize.css) and the dev
dependencies, there's only one dependency: [Mithril.js](https://mithril.js.org/)
(+ `mithril/stream` which is not bundled with Mithril's core distribution, so
okay, maybe two dependencies). Mithril is a tiny (< 10kb gzip) yet mighty JS
framework which implements a virtual DOM, kinda like React. Some of my favorite
features are:

### No build step needed

Just include `mithril.min.js` to your page and you are good to go. Great for
prototyping! That's what I have done in this project.

### It's just JavaScript&trade;

While you could use JSX, I presume it's more common to use _hyperscript_ with
Mithril. Example:

```js
// React w/ JSX
return (
  <main id="app">
    <h1>Hello world</h1>
    <ul className="my-list">
      <li>First item</li>
      {items.map((item) => (
        <li key={item.id} onClick={() => { handleClick(item) }}>{item.text}</li>
      ))}
    </ul>
  </main>
)
```

```js
// Mithril w/ hyperscript
return (
  m('main#app', [
    m('h1', 'Hello world'),
    m('ul.my-list', [
      m('li', 'First item'),
      items.map((item) => (
        m('li', { key: item.id, onclick() { handleClick(item) }}, item.text)
      )),
    ]),
  ])
)
```

### Batteries included

Mithril comes with a router and XHR utilities, though I haven't used them in
this project. Mithril also comes with a stream library (not bundled with
Mithril's core distribution), which I used for the first time in this project.

### Auto-redraw system

The app is automatically redrawn whenever Mithril components' event handlers are
run. (Also when using `m.request()` and after route changes, but they are not
relevant in this project.) This makes many things easy, including global state
management.

It's also possible to trigger a global redraw using `m.redraw()`.

### A small and stable API

No need to learn hooks or some other hot stuff every once in a while. :innocent:

## What I learned

1. Using streams. I like 'em!
2. A lot about SVGs since I built the SVG map by hand. SVGs are quite nice!
3. Animating SVG line arrow heads (`marker-start` and `marker-end`) using CSS is
   impossible or at least very difficult because all arrow heads share the same
   ID. I guess SVGs are not so nice after all. :-(
4. `[].flat()` and `[].flatMap()` are handy. I knew these existed, but I hadn't
   had the need to use these before.
5. I ramble way too much, though I already knew that.
