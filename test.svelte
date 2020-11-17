<script lang="ts">
  import Typeahead from "./types";
</script>

<Typeahead
  placeholder=""
  autofocus
  hideLabel
  data="{[0, 1, 2]}"
  on:select="{(e) => {
    console.log('select', e.detail);
  }}"
  let:result
>
  {@html result.string}
  {result.score}
</Typeahead>
