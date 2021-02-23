# svelte-typeahead-multiselect

---

**This fork** of [svelte-typeahead](https://github.com/metonym/svelte-typeahead) uses a slightly different behaviour for `focusAfterSelect` set to `true`.
It keeps the search results open to enable the user to select more entries directly.

---

> Accessible, fuzzy search typeahead component.

This component uses the lightweight [fuzzy](https://github.com/mattyork/fuzzy) library for client-side, fuzzy search and follows [WAI-ARIA guidelines](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html).

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

### Selected Items

The `selection` can hold a function to return the items which should get the `selected` class in the results.

Example for switching items on select:
<!-- prettier-ignore-start -->
```svelte
<script>

  function handleSelect(e) {   
        let i = e.detail.originalIndex;
        data[i].selected = !data[i].selected;
    }

</script>

<Typeahead {data} extract={(item) => item.state} selection={(item) => item.selected} on:select="{handleSelect} />
```
<!-- prettier-ignore-end -->

*Hint: Required items should match `selection` and `disabled` to be shown as selected and prevent them from unselection. Further styling may be needed.*
### Disable and Filter Items

Use the `filter` to filter Items out and `disable` to disable them in the result set.
- Filtered items are not part of the results at all.
- Disabled itesm receive the class `disbaled` and will not fire an `on:select` event.

Example for disabling and filtering items by their title length:

<!-- prettier-ignore-start -->
```svelte
<script>
    const disable = (item) => item.state.length > 4;
    const filter = (item) => item.state.length > 8;
</script>

<Typeahead {data} extract={(item) => item.state} {disable} {filter} />
```
<!-- prettier-ignore-end -->


Example for disabling items after selecting them:

<!-- prettier-ignore-start -->
```svelte
<script>
  function handleSelect(e) {  
    let i = e.detail.originalIndex;
    data[i].disabled = true;
  }
</script>

<Typeahead {data} extract={(item) => item.state} disable={(item) => item.disabled} on:select="{handleSelect}" />
```
<!-- prettier-ignore-end -->

### Focus after select

Set `focusAfterSelect` to `true` to re-focus the search input after selecting a result.

<!-- prettier-ignore-start -->
```svelte
<Typeahead {data} {extract} focusAfterSelect />
```
<!-- prettier-ignore-end -->

## API

### Props

| Prop name        | Value                                               | Description                                                                                                                          |
| :--------------- | :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------   |
| value            | `string` (default: `""`)                            | Input search value                                                                                                                   |
| data             | `T[]` (default: `[]`)                               | Items to search                                                                                                                      |
| extract          | `(T) => T`                                          | Target an item key if `data` is an object array                                                                                      |
| selection        | `(T) => T`                                          | Pass in a function to select items. They will reveice the class `selected`.                                                          |
| disable          | `(T) => T`                                          | Pass in a function to disable items. They will show up in the results list and receive the class `disabled`, but wont be selectable. |
| filter           | `(T) => T`                                          | Pass in a function to filter items. Thei will be hidden and do not show up at all in the results list.                               |
| autoselect       | `boolean` (default: `true`)                         | Automatically select the first (top) result                                                                                          |
| inputAfterSelect | `"update" or "clear" or "keep"`(default:`"update"`) | Set to `"clear"` to clear the `value` after selecting a result. Set to `"keep"` keep the search field unchanged after a selection.   |
| results          | `FuzzyResult[]` (default: `[]`)                     | Raw fuzzy results from the [fuzzy](https://github.com/mattyork/fuzzy) module                                                         |
| focusAfterSelect | `boolean` (default: `false`)                        | Set to `true` to re-focus the input after selecting a result.                                                                        |
| `...$$restProps` | (forwarded to `Search` component)                   | All other props are forwarded to the input element.                                                                                  |

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

The following events are forwarded to the [svelte-search](https://github.com/metonym/svelte-search) component.

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

## Internet Explorer

To make this component compatible with IE11 you'll need to polyfill `findIndex`.

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)