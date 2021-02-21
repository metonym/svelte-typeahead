/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { SearchProps } from "svelte-search/types/Search";

export type Item = string | number | Record<string, any>;

export interface FuzzyResult {
  original: Item;
  index: number;
  score: number;
  string: string;
}

export interface TypeaheadProps extends SearchProps {
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
  data?: Item[];

  /**
   * @default (item) => item
   */
  extract?: (item: Item) => Item;

  /**
   * @default (item) => false
   */
  disable?: (item: Item) => boolean;

  /**
   * @default (item) => false
   */
  filter?: (item: Item) => boolean;

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
  results?: FuzzyResult[];

  /**
   * Set to `true` to re-focus the input after selecting a result
   * @default false
   */
  focusAfterSelect?: boolean;
}

export default class Typeahead extends SvelteComponentTyped<
  TypeaheadProps,
  {
    select: CustomEvent<{
      searched: string;
      selected: Item;
      selectedIndex: number;
      original: Item;
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
      result: FuzzyResult;
      index: number;
    };
  }
> {}
