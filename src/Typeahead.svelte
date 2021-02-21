<script>
  /**
   * @typedef {string | number | Record<string, any>} Item
   * @typedef {{ original: Item; index: number; score: number; string: string; }} FuzzyResult
   * @event {{ searched: string; selected: Item; selectedIndex: number; original: Item; originalIndex: number; }} select
   * @event {any} clear
   * @slot {{ result: FuzzyResult; index: number }}
   */

  export let id = "typeahead-" + Math.random().toString(36);
  export let value = "";

  /** @type {Item[]} */
  export let data = [];

  /** @type {(item: Item) => Item} */
  export let extract = (item) => item;
  
  /** @type {(item: Item) => Item} */
  export let selection = (item) => false;

  /** @type {(item: Item) => Item} */
  export let disable = (item) => false;

  /** @type {(item: Item) => Item} */
  export let filter = (item) => false;

  /** Set to `false` to prevent the first result from being selected */
  export let autoselect = true;

  /**
   * Set to `keep` to keep the search field unchanged after select, set to `clear` to auto-clear search field
   * @type {"update" | "clear" | "keep"}
   */
  export let inputAfterSelect = "update";

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
    const result = results[selectedIndex];
    const selectedValue = extract(result.original);
    const searchedValue = value;

    if (inputAfterSelect == "clear") value = "";
    if (inputAfterSelect == "update") value = selectedValue;

    dispatch("select", {
      selectedIndex,
      searched: searchedValue,
      selected: selectedValue,
      original: result.original,
      originalIndex: result.index,
    });

    await tick();

    if (focusAfterSelect) searchRef.focus();

    hideDropdown = true;
  }

  $: options = { pre: "<mark>", post: "</mark>", extract };
  $: results = fuzzy
    .filter(value, data, options)
    .filter(({ score }) => score > 0)
    .filter((result) => !filter(result.original))
    .map((result)=> ({ 
      ...result, 
      disabled: disable(result.original), 
      selected: selection(result.original)
    }));
  $: resultsId = results.map((result) => extract(result.original)).join("");
</script>

<svelte:window
  on:click={({ target }) => {
    if (!hideDropdown && results.length > 0 && comboboxRef && !comboboxRef.contains(target)) {
      hideDropdown = true;
    }
  }}
/>

<div
  data-svelte-typeahead
  bind:this={comboboxRef}
  role="combobox"
  aria-haspopup="listbox"
  aria-owns="{id}-listbox"
  class:dropdown={results.length > 0}
  aria-expanded={!hideDropdown && results.length > 0}
  {id}
>
  <Search
    {...$$restProps}
    bind:ref={searchRef}
    aria-autocomplete="list"
    aria-controls="{id}-listbox"
    aria-labelledby="{id}-label"
    aria-activedescendant=""
    bind:value
    on:type
    on:input
    on:change
    on:focus
    on:focus={() => {
      hideDropdown = false;
    }}
    on:clear
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
    }}
  />
  {#if !hideDropdown && results.length > 0}
    <ul
      class:svelte-typeahead-list={true}
      role="listbox"
      aria-labelledby=""
      id="{id}-listbox"
    >
      {#each results as result, i}
        <li
          role="option"
          id="{id}-result"
          class:active={selectedIndex === i}
          class:selected={result.selected}
          class:disabled={result.disabled}
          aria-selected={selectedIndex === i}
          on:click={() => {
            if (!result.disabled) {
              selectedIndex = i;
              select();
            }
          }}
        >
          <slot {result} index={i}>
            {@html result.string}
          </slot>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  [data-svelte-typeahead] {
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

  .active,
  li:not(:last-of-type).active {
    border: #0f62fe 1px solid;
  }

  .disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [data-svelte-typeahead] :global([data-svelte-search] label) {
    margin-bottom: 0.25rem;
    display: inline-flex;
    font-size: 0.875rem;
  }

  [data-svelte-typeahead] :global([data-svelte-search] input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background: none;
    font-size: 1rem;
    border: 0;
    border-radius: 0;
    border: 1px solid #e5e5e5;
  }

  [data-svelte-typeahead] :global([data-svelte-search] input:focus) {
    outline-color: #0f62fe;
    outline-offset: 2px;
    outline-width: 1px;
  }
</style>
