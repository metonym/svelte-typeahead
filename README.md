# svelte-typeahead

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Accessible search typeahead component.

This component uses the lightweight [fuzzy](https://github.com/mattyork/fuzzy) library for typeahead and follows [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html).

## Install

```bash
yarn add -D svelte-typeahead
```

## Usage

```html
<script>
  import Typeahead from "svelte-typeahead";

  const data = [
    { state: "California" },
    { state: "North Carolina" },
    { state: "South Carolina" },
  ];
</script>

<Typeahead {data} extract={item => item.state} />
```

### Custom results

By default, this component uses the `fuzzy` library to higlight matching characters with the `mark` element.

Use a slot to render custom results.

```html
<Typeahead {data} extract={item => item.state} let={result}>
  <div>{@html result.string}</div>
</Typeahead>
```

## API

| Property name    | Value                            |
| ---------------- | -------------------------------- |
| value            | `string` (default: `""`)         |
| data             | `T[]` (default: `[]`)            |
| extract          | `(T) => T`                       |
| autoselect       | `boolean` (default: `true`)      |
| `...$$restProps` | (forwarded to `Search` component)|

## Forwarded events

### `Typeahead`

| Event name  | Description                               |
| :---------- | :---------------------------------------- |
| `on:select` | triggered based on the dropdown selection |

### `Search`

The following events are forwarded to the underlying Search input element:

- on:input
- on:change
- on:focus
- on:clear
- on:blur
- on:keydown

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-typeahead.svg?color=blue
[npm-url]: https://npmjs.com/package/svelte-typeahead
[build]: https://travis-ci.com/metonym/svelte-typeahead.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/svelte-typeahead
