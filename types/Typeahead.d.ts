/// <reference types="svelte" />
import { SvelteComponent } from "svelte";
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
   * Set to `false` to prevent the first result from being selected
   * @default true
   */
  autoselect?: boolean;

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

export default class Typeahead extends SvelteComponent<
  TypeaheadProps,
  {
    select: CustomEvent<{ selectedIndex: number; selected: Item }>;
    clear: CustomEvent<any>;
    input: WindowEventMap["input"];
    change: WindowEventMap["change"];
    focus: WindowEventMap["focus"];
    blur: WindowEventMap["blur"];
    keydown: WindowEventMap["keydown"];
  },
  { default: { result: FuzzyResult; index: number } }
> {}
