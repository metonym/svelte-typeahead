<script lang="ts">
  import Typeahead from "../types";
  import type { TypeaheadProps } from "../types/Typeahead.svelte";
  import T from "../types/Typeahead.svelte";

  let results: TypeaheadProps<typeof data[0]>["results"] = [];

  $: console.log(results[0]?.disabled);

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
</script>

<!-- svelte-ignore missing-declaration -->
<Typeahead
  extract={(item) => item.state}
  disable={(item) => item.state.length > 10}
  filter={(item) => item.id < 4}
  limit={1}
  autocapitalize={false + ""}
  placeholder="#{4}"
  autofocus
  hideLabel
  focusAfterSelect
  inputAfterSelect="keep"
  debounce={800}
  showAllResultsOnFocus
  {data}
  on:select={(e) => {
    console.log("select", e.detail);
  }}
  on:clear
  on:type={(e) => {
    console.log(e.detail);
  }}
  bind:results
  let:result
  let:index
  let:value={searchedValue}
>
  {result.original}
  {@html result.string}
  {index}
  {result.score}
  {searchedValue}
  <svelte:fragment slot="no-results" let:value>
    No results {value}
  </svelte:fragment>
</Typeahead>

<!-- svelte-ignore missing-declaration -->
<T debounce={300} />
