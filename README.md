# svelte-typeahead

[![NPM][npm]][npm-url]

> Accessible, fuzzy search typeahead component.

<!-- REPO_URL -->

This component uses the lightweight [fuzzy](https://github.com/mattyork/fuzzy) library for client-side, fuzzy search and follows [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html).

Try it in the [Svelte REPL](https://svelte.dev/repl/a1b828d80de24f7e995b2365782c8d04).

---

<!-- TOC -->

## Installation

```bash
# Yarn
yarn add -D svelte-typeahead

# npm
npm i -D svelte-typeahead

# pnpm
pnpm i -D svelte-typeahead
```

## Usage

### SvelteKit set-up

To use this component with [SvelteKit](https://github.com/sveltejs/kit) or vite-powered set-ups, instruct `vite` to optimize the `"fuzzy"` dependency.

```js
// svelte.config.js
const config = {
  kit: {
    vite: {
      optimizeDeps: {
        include: ["fuzzy"],
      },
    },
  },
};
```

### Styling

**Note:** this component is minimally styled by design. You can target the component using the `[data-svelte-typeahead]` selector.

```css
:global([data-svelte-typeahead]) {
  margin: 1rem;
}
```

### Basic

Pass an array of objects to the `data` prop. Use the `extractor` prop to specify the value to search on.

```svelte
<script>
  import Typeahead from "svelte-typeahead";

  const data = [
    { state: "California" },
    { state: "North Carolina" },
    { state: "North Dakota" },
    { state: "South Carolina" },
    { state: "South Dakota" },
    { state: "Michigan" },
    { state: "Tennessee" },
    { state: "Nevada" },
    { state: "New Hampshire" },
    { state: "New Jersey" },
  ];

  const extract = (item) => item.state;
</script>

<Typeahead {data} {extract} />
```

### Custom-styled results

This component uses the [fuzzy](https://github.com/mattyork/fuzzy) library to highlight matching characters with the [mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark) element.

Use the default slot to render custom results.

```svelte
<Typeahead {data} {extract} let:result let:index>
  <strong>{@html result.string}</strong>
  {index}
</Typeahead>
```

### No results

Use the "no-results" slot to render a message if the search value does not yield results.

```svelte
<Typeahead value="abcd" {data} {extract} let:value>
  <svelte:fragment slot="no-results">
    No results found for "{value}"
  </svelte:fragment>
</Typeahead>
```

### Limit the number of results

Use the `limit` prop to specify the maximum number of results to display. The default is `Infinity`.

```svelte
<Typeahead limit={2} {data} {extract} />
```

### Disabled items

Disable items using the `disable` filter. Disabled items are not selectable or navigable by keyboard.

In the following example, items with a `state` value containing "Carolina" are disabled.

```svelte
<Typeahead
  {data}
  value="ca"
  extract={(item) => item.state}
  disable={(item) => /Carolina/.test(item.state)}
/>
```

### Focus after select

Set `focusAfterSelect` to `true` to re-focus the search input after selecting a result.

```svelte
<Typeahead focusAfterSelect {data} {extract} />
```

### Show dropdown on focus

By default, the dropdown will be shown if the `value` has results.

Set `showDropdownOnFocus` to `true` to only show the dropdown when the search input is focused.

```svelte
<Typeahead value="ca" showDropdownOnFocus {data} {extract} />
```

## API

### Props

| Prop name          | Value                                                                      | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| value              | `string` (default: `""`)                                                   | Input search value                                                                                                                    |
| data               | `TItem[]` (default: `[]`)                                                  | Items to search                                                                                                                       |
| extract            | `(TItem) => any`                                                           | Target an item key if `data` is an object array                                                                                       |
| disable            | `(TItem) => boolean`                                                       | Pass in a function to disable items. They can be displayed in the results but will not be selectable.                                 |
| filter             | `(TItem) => boolean`                                                       | Pass in a function to filter items. They will be hidden and are not displayed in the results.                                         |
| autoselect         | `boolean` (default: `true`)                                                | Automatically select the first (top) result                                                                                           |
| inputAfterSelect   | `"update" or "clear" or "keep"`(default: `"update"`)                       | Set to `"clear"` to clear the `value` after selecting a result. Set to `"keep"` to keep the search field unchanged after a selection. |
| results            | `FuzzyResult[]` (default: `[]`)                                            | Raw fuzzy results from the [fuzzy](https://github.com/mattyork/fuzzy) module                                                          |
| focusAfterSelect   | `boolean` (default: `false`)                                               | Set to `true` to re-focus the input after selecting a result.                                                                         |
| showDropdownOnFocus | `boolean` (default: `false`)                                               | Set to `true` to only show results when the input is focused.                                                                         |
| limit              | `number` (default: `Infinity`)                                             | Specify the maximum number of results to display.                                                                                     |
| `...$$restProps`   | (forwarded to [`svelte-search`](https://github.com/metonym/svelte-search)) | All other props are forwarded to the input element.                                                                                   |

### Dispatched events

- **on:select**: dispatched when selecting a result
- **on:clear**: dispatched when clearing the input field

```svelte
<script>
  import Typeahead from "svelte-typeahead";

  let e = [];
</script>

<Typeahead
  {data}
  {extract}
  on:select={({ detail }) => (e = [...e, { event: "select", detail }])}
  on:clear={() => (e = [...e, { event: "clear" }])}
/>

<pre>{JSON.stringify(e, null, 2)}</pre>
```

### Forwarded events

The following events are forwarded to the [svelte-search](https://github.com/metonym/svelte-search) component.

- on:type
- on:input
- on:change
- on:focus
- on:clear
- on:blur
- on:keydown

## TypeScript

Svelte version 3.31 or greater is required to use this component with TypeScript.

TypeScript definitions are located in the [types folder](./types).

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-typeahead.svg?color=%23ff3e00&style=for-the-badge
[npm-url]: https://npmjs.com/package/svelte-typeahead
