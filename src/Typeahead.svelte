<script>
  /**
   * @typedef {string | number | Record<string, any>} Item
   * @typedef {{ original: Item; index: number; score: number; string: string; }} FuzzyResult
   * @event {{ selectedIndex: number; selected: Item; }} select
   * @event {any} clear
   * @slot {{ result: FuzzyResult; index: number }}
   */

  export let id = "typeahead-" + Math.random().toString(36);
  export let value = "";

  /** @type {Item[]} */
  export let data = [];

  /** @type {(item: Item) => Item} */
  export let extract = (item) => item;

  /** Set to `false` to prevent the first result from being selected */
  export let autoselect = true;

  /** @type {FuzzyResult[]} */
  export let results = [];

  /** Set to `true` to re-focus the input after selecting a result */
  export let focusAfterSelect = false;

  import fuzzy from "fuzzy";
  import Search from "svelte-search";
  import { tick, createEventDispatcher, afterUpdate } from "svelte";

  const dispatch = createEventDispatcher();

  let comboboxRef = null;
  let searchRef = null;
  let hideDropdown = false;
  let selectedIndex = -1;
  let prevResults = "";

  afterUpdate(() => {
    if (prevResults !== resultsId && autoselect) {
      selectedIndex = 0;
    }

    if (prevResults !== resultsId) {
      hideDropdown = results.length === 0;
    }

    prevResults = resultsId;
  });

  async function select() {
    value = extract(results[selectedIndex].original);
    dispatch("select", { selectedIndex, selected: value });
    await tick();
    if (focusAfterSelect) searchRef.focus();
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
    background-color: #fff;
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0;
    list-style: none;
    background-color: inherit;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  li {
    padding: 0.25rem 1rem;
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

  :global(.svelte-search label) {
    margin-bottom: 0.25rem;
    display: inline-flex;
    font-size: 0.875rem;
  }

  :global(.svelte-search input) {
    border: 0;
    background: none;
    width: 100%;
    font-size: 1rem;

    padding: 0.25rem 1rem;
    border-radius: 0;
    border: 1px solid #e5e5e5;
  }

  :global(.svelte-search input:focus) {
    outline-color: #0f62fe;
    outline-offset: 2px;
    outline-width: 1px;
  }
</style>

<svelte:window
  on:click={({ target }) => {
    if (!hideDropdown && results.length > 0 && comboboxRef && !comboboxRef.contains(target)) {
      hideDropdown = true;
    }
  }} />

<div
  bind:this={comboboxRef}
  role="combobox"
  aria-haspopup="listbox"
  aria-owns="{id}-listbox"
  class:svelte-typeahead={true}
  class:dropdown={results.length > 0}
  aria-expanded={!hideDropdown && results.length > 0}
  {id}>
  <Search
    label="Typeahead label"
    placeholder="Search..."
    {...$$restProps}
    bind:this={searchRef}
    aria-autocomplete="list"
    aria-controls="{id}-listbox"
    aria-labelledby="{id}-label"
    aria-activedescendant=""
    {id}
    bind:value
    on:input
    on:change
    on:focus
    on:focus={() => {
      hideDropdown = false;
    }}
    on:clear={() => {
      hideDropdown = false;
    }}
    on:blur
    on:keydown
    on:keydown={(e) => {
      switch (e.key) {
        case 'Enter':
          select();
          break;
        case 'ArrowDown':
          e.preventDefault();
          selectedIndex += 1;
          if (selectedIndex === results.length) {
            selectedIndex = 0;
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          selectedIndex -= 1;
          if (selectedIndex < 0) {
            selectedIndex = results.length - 1;
          }
          break;
        case 'Escape':
          e.preventDefault();
          value = '';
          searchRef.focus();
          hideDropdown = true;
          break;
      }
    }} />
  {#if !hideDropdown && results.length > 0}
    <ul
      class:svelte-typeahead-list={true}
      role="listbox"
      aria-labelledby=""
      id="{id}-listbox">
      {#each results as result, i}
        <li
          role="option"
          id="{id}-result"
          class:selected={selectedIndex === i}
          aria-selected={selectedIndex === i}
          on:click={() => {
            selectedIndex = i;
            select();
          }}>
          <slot {result} index={i}>
            {@html result.string}
          </slot>
        </li>
      {/each}
    </ul>
  {/if}
</div>
