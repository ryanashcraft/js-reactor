# js-reactor

Like [elm-reactor](https://github.com/elm-lang/elm-reactor), but for JavaScript. Allows running JS files in the browser based on relative path (e.g. `localhost:8000/hello-world.js`).

js-reactor is an opinionated tool to minimize friction. Code is transformed with [Babel](https://babeljs.io) and type-checked with [Flow](http://flowtype.org).

## Installation

```bash
npm install -g js-reactor
```

## Example Usage

With this project directory structure:

```
~/my-project
└── hello-world.js
```

Run:

```bash
cd ~/my-project
js-reactor
```

Then open `http://localhost:8000/hello-world.js` in your web browser.

## Future

This project is a work in progress. Future plans include:

- Hot-module reloading
- Directory index navigation
- Other elm-platform tools ([elm-make](https://github.com/elm-lang/elm-make), [elm-repl](https://github.com/elm-lang/elm-repl));
