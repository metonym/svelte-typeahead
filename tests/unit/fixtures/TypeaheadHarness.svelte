<script lang="ts">
  import Typeahead from "svelte-typeahead";
  import type { TypeaheadProps } from "svelte-typeahead/Typeahead.svelte";

  export let data: string[] = [];
  export let extract: TypeaheadProps<string>["extract"] = (item) => item;
  export let disable: TypeaheadProps<string>["disable"] = () => false;
  export let filter: TypeaheadProps<string>["filter"] = () => false;
  export let autoselect = true;
  export let inputAfterSelect: TypeaheadProps<string>["inputAfterSelect"] =
    "update";
  export let focusAfterSelect = false;
  export let showDropdownOnFocus = false;
  export let showAllResultsOnFocus = false;
  export let limit = Infinity;
  export let debounce = 0;
  export let value = "";

  let results: TypeaheadProps<string>["results"] = [];
  let selectDetail: unknown = null;
  let clearCount = 0;
  let typeValue: string | null = null;
</script>

<Typeahead
  {data}
  {extract}
  {disable}
  {filter}
  {autoselect}
  {inputAfterSelect}
  {focusAfterSelect}
  {showDropdownOnFocus}
  {showAllResultsOnFocus}
  {limit}
  {debounce}
  bind:value
  bind:results
  on:select={(e) => (selectDetail = e.detail)}
  on:clear={() => (clearCount += 1)}
  on:type={(e) => (typeValue = e.detail)}
>
  <svelte:fragment slot="no-results" let:value>
    No results for "{value}"
  </svelte:fragment>
</Typeahead>

<div data-testid="select-detail">{JSON.stringify(selectDetail)}</div>
<div data-testid="clear-count">{clearCount}</div>
<div data-testid="type-value">{JSON.stringify(typeValue)}</div>
<div data-testid="results-count">{results?.length ?? 0}</div>
