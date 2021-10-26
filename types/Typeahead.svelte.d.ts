/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { SearchProps } from "svelte-search/types/Search";

export interface TypeaheadProps<TItem> extends SearchProps {
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
  }[];

  /**
   * Set to `true` to re-focus the input after selecting a result
   * @default false
   */
  focusAfterSelect?: boolean;

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
    clear: CustomEvent<any>;
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
