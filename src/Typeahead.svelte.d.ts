import type { SvelteComponentTyped } from "svelte";
import type { SearchProps } from "svelte-search/src/Search.svelte";

export interface TypeaheadProps<TItem> extends Omit<SearchProps, "results"> {
  /**
   * @default "typeahead-" + Math.random().toString(36)
   */
  id?: string;

  /**
   * @default ""
   */
  value?: string;

  /**
   * @default []
   */
  data?: TItem[];

  /**
   * @default (item) => item
   */
  extract?: (item: TItem) => any;

  /**
   * @default (item) => false
   */
  disable?: (item: TItem) => boolean;

  /**
   * @default (item) => false
   */
  filter?: (item: TItem) => boolean;

  /**
   * Set to `false` to prevent the first result from being selected
   * @default true
   */
  autoselect?: boolean;

  /**
   * Set to `keep` to keep the search field unchanged after select, set to `clear` to auto-clear search field
   * @default "update"
   */
  inputAfterSelect?: "update" | "clear" | "keep";

  /**
   * @default []
   */
  results?: {
    original: TItem;
    index: number;
    score: number;
    string: string;
    disabled?: boolean;
  }[];

  /**
   * Set to `true` to re-focus the input after selecting a result
   * @default false
   */
  focusAfterSelect?: boolean;

  /**
   * Set to `true` to only show results when the input is focused
   * @default false
   */
  showDropdownOnFocus?: boolean;

  /**
   * Set to `true` for all results to be shown when an empty input is focused
   * @default false
   */
  showAllResultsOnFocus?: boolean;

  /**
   * Specify the maximum number of results to return
   * @default Infinity
   */
  limit?: number;
}

export default class Typeahead<
  TItem = string | number | Record<string, any>
> extends SvelteComponentTyped<
  TypeaheadProps<TItem>,
  {
    select: CustomEvent<{
      searched: string;
      selected: TItem;
      selectedIndex: number;
      original: TItem;
      originalIndex: number;
    }>;
    type: CustomEvent<string>;
    clear: CustomEvent<null>;
    input: WindowEventMap["input"];
    change: WindowEventMap["change"];
    focus: WindowEventMap["focus"];
    blur: WindowEventMap["blur"];
    keydown: WindowEventMap["keydown"];
  },
  {
    default: {
      result: {
        original: TItem;
        index: number;
        score: number;
        string: string;
      };
      index: number;
      value: string;
    };
    "no-results": {
      value: string;
    };
  }
> {}
