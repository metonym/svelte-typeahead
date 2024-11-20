<script lang="ts">
  import Typeahead from "svelte-typeahead";
  import type { TypeaheadProps } from "svelte-typeahead/Typeahead.svelte";
  import T from "svelte-typeahead";

  type Item = (typeof data)[number];

  let results: TypeaheadProps<Item>["results"] = [];

  $: console.log(results?.[0]?.disabled);

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

  const extract = (item: Item) => item.state;
  const disable = (item: Item) => item.state.length > 10;
  const filter = (item: Item) => item.id < 4;
</script>

<Typeahead
  {extract}
  {disable}
  {filter}
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

<T debounce={300} />
