import { flushSync } from "svelte";

/** Sets an input's value and fires a native `input` event, flushing Svelte's scheduler. */
export function typeInto(input: HTMLInputElement, text: string) {
  flushSync(() => {
    input.value = text;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

/** Fires a keydown event on an element, flushing Svelte's scheduler. */
export function pressKey(element: Element, key: string) {
  flushSync(() => {
    element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  });
}
