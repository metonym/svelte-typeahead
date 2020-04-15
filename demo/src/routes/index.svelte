<script>
  import Typeahead from "svelte-typeahead";
  import { states } from "../data/us_states";
</script>

<svelte:head>
  <title>svelte-typeahead</title>
</svelte:head>

<Typeahead
  placeholder="Search U.S. states..."
  autofocus
  hideLabel
  data={states}
  extract={item => item.state}
  on:select={({ detail }) => {
    console.log('select', detail);
  }} />
