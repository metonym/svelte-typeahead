# svelte-typeahead

[![NPM][npm]][npm-url]

> Accessible, fuzzy search typeahead component.

This component uses the lightweight [fuzzy](https://github.com/mattyork/fuzzy) library for typeahead and follows [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html).

Try it in the [Svelte REPL](https://svelte.dev/repl/a1b828d80de24f7e995b2365782c8d04?version=3.24.1).

<!-- REPO_URL -->

---

<!-- TOC -->

## Install

```bash
yarn add -D svelte-typeahead
# OR
npm i -D svelte-typeahead
```

## Usage

[svelte-search](https://github.com/metonym/svelte-search) is used as the underlying search input component. `$$restProps` are forwarded to `svelte-search`.

### Styling

**Note:** this component is minimally styled by design. You can target the component using the `[data-svelte-typeahead]` selector.

```css
:global([data-svelte-typeahead]) {
  margin: 1rem;
}
```

### Basic

Pass an array of objects to the `data` prop. Use the `extractor` to specify the key value to search on.

<!-- prettier-ignore-start -->
```svelte
<script>
  import Typeahead from "svelte-typeahead";

  const data = [
    { id: 0, state: "California" },
    { id: 1, state: "North Carolina" },
    { id: 2, state: "North Dakota" },
    { id: 3, state: "South Carolina" },
    { id: 4, state: "South Dakota" },
    { id: 5, state: "Michigan" },
    { id: 6, state: "Tennessee" },
    { id: 7, state: "Nevada" },
    { id: 8, state: "New Hampshire" },
    { id: 9, state: "New Jersey" },
  ];

  const extract = (item) => item.state;
</script>

<Typeahead {data} {extract} />

```
<!-- prettier-ignore-end -->

### Custom results

By default, this component uses the `fuzzy` library to highlight matching characters with the `mark` element.

Use a slot to render custom results.

<!-- prettier-ignore-start -->
```svelte
<Typeahead {data} {extract} let:result let:index>
  <div style="color: red; font-weight: bold;">
    {@html result.string} {index}
  </div>
</Typeahead>

```
<!-- prettier-ignore-end -->

## API

### Props

| Prop name        | Value                             |
| :--------------- | :-------------------------------- |
| value            | `string` (default: `""`)          |
| data             | `T[]` (default: `[]`)             |
| extract          | `(T) => T`                        |
| autoselect       | `boolean` (default: `true`)       |
| `...$$restProps` | (forwarded to `Search` component) |

### Dispatched events

- **on:select**: dispatched when selecting a result
- **on:clear**: dispatched when clearing the input field

<!-- prettier-ignore-start -->
```svelte
<script>
  let events = [];

  function update(event, detail) {
    events = [...events, JSON.stringify({ event, detail }, null, 2 )];
  }
</script>

<Typeahead
  {data}
  {extract}
  on:select="{(e) => {
    update('select', e.detail);
  }}"
  on:clear="{() => {
    update('clear');
  }}"
/>

<ul>
  {#each events as event}
    <li>
      <pre>{event}</pre>
    </li>
  {/each}
</ul>
```
<!-- prettier-ignore-end -->

### Forwarded events

- on:type
- on:input
- on:change
- on:focus
- on:clear
- on:blur
- on:keydown

## Usage with svite

To use the component with [svite](https://github.com/dominikg/svite), add the following to `vite.config.js`:

```js
// vite.config.js
module.exports = {
  optimizeDeps: {
    include: ["fuzzy"],
  },
};
```

## TypeScript

Svelte version 3.31 or greater is required if using TypeScript.

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-typeahead.svg?color=%23ff3e00&style=for-the-badge
[npm-url]: https://npmjs.com/package/svelte-typeahead
