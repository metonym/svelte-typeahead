<script>
  /**
   * @type {string} [id=string]
   */
  export let id = "typeahead-" + Math.random().toString(36);

  /**
   * @type {string} [value=""]
   */
  export let value = "";

  /**
   * @typedef {{[index: string]: any}} Item
   */

  /**
   * @type {Item[]} [data=[]]
   */
  export let data = [];

  /**
   * @type {(item: Item) => Item} [extract = (item: Item) => Item]
   */
  export let extract = (item) => item;

  /**
   * @type {boolean} [autoselect=true]
   */
  export let autoselect = true;

  import fuzzy from "fuzzy";
  import Search from "svelte-search";
  import { tick, createEventDispatcher, afterUpdate } from "svelte";

  const dispatch = createEventDispatcher();

  let comboboxRef = undefined;
  let searchRef = undefined;
  let hideDropdown = false;
  let selectedIndex = -1;
  let prevResults = "";

  afterUpdate(() => {
    if (prevResults !== resultsId && autoselect) {
      selectedIndex = 0;
    }

    prevResults = resultsId;
  });

  async function select() {
    value = extract(results[selectedIndex].original);
    dispatch("select", { selectedIndex, selected: value });
    await tick();
    searchRef.focus();
    hideDropdown = true;
  }

  $: options = { pre: "<mark>", post: "</mark>", extract };
  $: results = fuzzy
    .filter(value, data, options)
    .filter(({ score }) => score > 0);
  $: resultsId = results.map((result) => extract(result.original)).join("");
</script>

<style>
  .svelte-typeahead {
    position: relative;
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0.5rem 0;
    list-style: none;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  li {
    padding: 0.75rem 1rem;
    font-size: 1.25rem;
    cursor: pointer;
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid #e0e0e0;
  }

  li:hover {
    background-color: #e5e5e5;
  }

  .selected {
    background-color: #e5e5e5;
  }

  .selected:hover {
    background-color: #cacaca;
  }

  :global(.svelte-typeahead.dropdown .svelte-search input) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  :global(.svelte-search input) {
    border: 0;
    background: none;
    width: 100%;
    font: inherit;
    font-size: 1.5rem;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.25rem;
  }

  :global(.svelte-search input:focus) {
    outline: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #0f62fe;
  }
</style>

<svelte:window
  on:click="{({ target }) => {
    if (!hideDropdown && results.length > 0 && comboboxRef && !comboboxRef.contains(target)) {
      hideDropdown = true;
    }
  }}" />

<div
  bind:this="{comboboxRef}"
  role="combobox"
  aria-haspopup="listbox"
  aria-owns="{id}-listbox"
  class="svelte-typeahead"
  class:dropdown="{results.length > 0}"
  aria-expanded="{!hideDropdown && results.length > 0}"
  id="{id}">
  <Search
    {...$$restProps}
    bind:this="{searchRef}"
    aria-autocomplete="list"
    aria-controls="{id}-listbox"
    aria-labelledby="{id}-label"
    aria-activedescendant=""
    id="{id}"
    bind:value
    on:input
    on:change
    on:focus
    on:focus="{() => {
      hideDropdown = false;
    }}"
    on:clear="{() => {
      hideDropdown = false;
    }}"
    on:blur
    on:keydown
    on:keydown="{({ key }) => {
      switch (key) {
        case 'Enter':
          select();
          break;
        case 'ArrowDown':
          selectedIndex += 1;
          if (selectedIndex === results.length) {
            selectedIndex = 0;
          }
          break;
        case 'ArrowUp':
          selectedIndex -= 1;
          if (selectedIndex < 0) {
            selectedIndex = results.length - 1;
          }
          break;
        case 'Escape':
          value = '';
          searchRef.focus();
          hideDropdown = true;
          break;
      }
    }}" />
  {#if !hideDropdown && results.length > 0}
    <ul
      class="svelte-typeahead-list"
      role="listbox"
      aria-labelledby=""
      id="{id}-listbox">
      {#each results as result, i}
        <li
          role="option"
          id="{id}-result"
          class:selected="{selectedIndex === i}"
          aria-selected="{selectedIndex === i}"
          on:click="{() => {
            selectedIndex = i;
            select();
          }}">
          <slot result="{result}">
            {@html result.string}
          </slot>
        </li>
      {/each}
    </ul>
  {/if}
</div>
