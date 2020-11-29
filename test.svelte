<script lang="ts">
  import Typeahead from "./types";

  let results = [];
</script>

<Typeahead
  autocapitalize={false + ''}
  placeholder="#{4}"
  autofocus
  hideLabel
  focusAfterSelect
  data={[0, 1, { a: 4 }]}
  on:select={(e) => {
    console.log('select', e.detail);
  }}
  on:clear
  bind:results
  let:result
  let:index>
  {@html result.string}
  {index}
  {result.score}
</Typeahead>
