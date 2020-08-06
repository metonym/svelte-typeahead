<script>
  import Typeahead from "svelte-typeahead";
  import { states } from "../data/us_states";
</script>

<Typeahead
  placeholder={`Search U.S. states (e.g. "California")`}
  autofocus
  hideLabel
  data={states}
  extract={(item) => item.state}
  on:select={({ detail }) => {
    console.log('select', detail);
  }} />
