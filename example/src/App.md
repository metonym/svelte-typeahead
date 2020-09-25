# svelte-typeahead

<script>
  import Typeahead from "svelte-typeahead";
  import { states } from "./data";
</script>

<Typeahead
  placeholder="{`Search U.S. states (e.g. "California")`}"
  autofocus
  hideLabel
  data="{states}"
  extract="{(item) => item.state}"
  on:select="{({ detail }) => {
  console.log('select', detail);
  }}"
  />

```svelte
<script>
  import Typeahead from "svelte-typeahead";
  import { states } from "./data";
</script>

<Typeahead
  placeholder="{`Search U.S. states (e.g. "California")`}"
  autofocus
  hideLabel
  data="{states}"
  extract="{(item) => item.state}"
  on:select="{({ detail }) => {
    console.log('select', detail);
  }}"
  />
```

[Example source code](https://github.com/metonym/svelte-typeahead/tree/master/example)
