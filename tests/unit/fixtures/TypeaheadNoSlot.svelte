<script lang="ts">
  import Typeahead from "svelte-typeahead";

  export let data: string[] = [];
  export let value = "";
</script>

<!-- No `no-results` slot, which changes when the dropdown hides/reopens. -->
<Typeahead {data} bind:value />
