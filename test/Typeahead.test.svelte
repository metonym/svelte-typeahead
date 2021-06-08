<script lang="ts">
  import Typeahead from "../types";

  let results = [];

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

  interface Item {
    id: number;
    state: string;
  }

  type Extract = (item: Item) => string;

  const extract: Extract = (item) => item.state;

  type DisableOrFilter = (item: Item) => boolean;

  const disable: DisableOrFilter = (item) => item.state.length > 10;
  const filter: DisableOrFilter = (item) => item.state.length < 4;
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
>
  {@html result.string}
  {index}
  {result.score}
</Typeahead>
