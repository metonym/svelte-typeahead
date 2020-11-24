# svelte-typeahead

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Accessible, fuzzy search typeahead component.

This component uses the lightweight [fuzzy](https://github.com/mattyork/fuzzy) library for typeahead and follows [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html).

Try it in the [Svelte REPL](https://svelte.dev/repl/a1b828d80de24f7e995b2365782c8d04?version=3.24.1).

## Install

```bash
yarn add -D svelte-typeahead
# OR
npm i -D svelte-typeahead
```

## Usage

```svelte
<script>
  import Typeahead from "svelte-typeahead";

  const data = [
    { state: "California" },
    { state: "North Carolina" },
    { state: "North Dakota" },
    { state: "South Carolina" },
    { state: "South Dakota" },
  ];
</script>

<Typeahead {data} extract={item => item.state} placeholder="Search..." />
```

### Custom results

By default, this component uses the `fuzzy` library to highlight matching characters with the `mark` element.

Use a slot to render custom results.

```svelte
<Typeahead
  {data}
  placeholder="Search..."
  extract={(item) => item.state}
  let:result>
  <div style="color: red">
    {@html result.string}
  </div>
</Typeahead>

```

## API

| Prop name        | Value                             |
| :--------------- | :-------------------------------- |
| value            | `string` (default: `""`)          |
| data             | `T[]` (default: `[]`)             |
| extract          | `(T) => T`                        |
| autoselect       | `boolean` (default: `true`)       |
| `...$$restProps` | (forwarded to `Search` component) |

## Dispatched events

```svelte
<script>
  let events = [];
</script>

<Typeahead
  data="{data}"
  placeholder="Search..."
  extract="{(item) => item.state}"
  on:select="{(e) => {
    events = [...events, JSON.stringify(e.detail, null, 2)];
  }}"
/>

<ul>
  {#each events as event}
    <li>{event}</li>
  {/each}
</ul>
```

## Forwarded events

- on:input
- on:change
- on:focus
- on:clear
- on:blur
- on:keydown

## Usage with `svite`

To use the component with [svite](https://github.com/dominikg/svite), add the following to `vite.config.js`:

```js
// vite.config.js
module.exports = {
  optimizeDeps: {
    include: ["fuzzy"],
  },
};
```

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-typeahead.svg?color=%23ff3e00
[npm-url]: https://npmjs.com/package/svelte-typeahead
[build]: https://travis-ci.com/metonym/svelte-typeahead.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/svelte-typeahead
