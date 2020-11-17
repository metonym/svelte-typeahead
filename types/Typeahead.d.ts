/// <reference types="svelte" />

type Item = any;

export interface TypeaheadProps {
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
   * @default true
   */
  autoselect?: boolean;
}

export default class Typeahead {
  $$prop_def: TypeaheadProps;
  $$slot_def: {
    default: { result: { index: number; original: Item; score: number; string: string } };
  };

  $on(eventname: "select", cb: (event: CustomEvent<{ selectedIndex: number; selected: Item }>) => void): () => void;
  $on(eventname: "input", cb: (event: WindowEventMap["input"]) => void): () => void;
  $on(eventname: "change", cb: (event: WindowEventMap["change"]) => void): () => void;
  $on(eventname: "focus", cb: (event: WindowEventMap["focus"]) => void): () => void;
  $on(eventname: "blur", cb: (event: WindowEventMap["blur"]) => void): () => void;
  $on(eventname: "keydown", cb: (event: WindowEventMap["keydown"]) => void): () => void;
  $on(eventname: string, cb: (event: Event) => void): () => void;
}
