import { flushSync, tick } from "svelte";
import { afterEach, describe, expect, test } from "vitest";
import TypeaheadHarness from "./fixtures/TypeaheadHarness.svelte";
import TypeaheadNoSlot from "./fixtures/TypeaheadNoSlot.svelte";
import { pressKey, typeInto } from "./dom";
import { render } from "./render";

// Covers when the dropdown opens and closes. Lives in a `.svelte.test.ts`
// file so tests can update props reactively via `$state`.

const data = ["apple", "banana", "cherry", "date", "grape"];

let cleanup: (() => void) | undefined;

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
});

function setup(
  fixture: typeof TypeaheadHarness | typeof TypeaheadNoSlot,
  initialProps: Record<string, unknown> = {},
) {
  const props = $state<Record<string, unknown>>({ data, ...initialProps });
  const rendered = render(fixture, props as never);
  cleanup = rendered.cleanup;
  const input = rendered.target.querySelector("input");
  if (!(input instanceof HTMLInputElement)) {
    throw new Error("fixture markup missing input");
  }
  return { ...rendered, input, props };
}

const optionCount = (target: ParentNode) => target.querySelectorAll("li").length;
const focus = (input: HTMLInputElement) => flushSync(() => input.focus());
const blur = (input: HTMLInputElement) => flushSync(() => input.blur());

async function pressEnterAndSettle(input: HTMLInputElement) {
  pressKey(input, "Enter");
  // select() awaits tick() internally before closing the dropdown.
  await tick();
  await tick();
  flushSync();
}

describe.each([
  ["with a no-results slot", TypeaheadHarness],
  ["without a no-results slot", TypeaheadNoSlot],
])("dropdown visibility %s", (_, fixture) => {
  test("an initial value does not open the dropdown until the input is focused", () => {
    const { target, input } = setup(fixture, { value: "appl" });
    expect(optionCount(target)).toBe(0);

    focus(input);
    expect(optionCount(target)).toBe(1);
  });

  test("setting value programmatically after blur does not reopen the dropdown", () => {
    const { target, input, props } = setup(fixture);
    focus(input);
    typeInto(input, "a");
    blur(input);

    flushSync(() => (props.value = "appl"));
    expect(optionCount(target)).toBe(0);
  });

  test("results that arrive while the user is typing are shown", () => {
    const { target, input, props } = setup(fixture, { data: [] });
    focus(input);
    typeInto(input, "ban");
    expect(optionCount(target)).toBe(0);

    flushSync(() => (props.data = data));
    expect(optionCount(target)).toBe(1);
  });

  test("Escape closes the dropdown and typing reopens it", () => {
    const { target, input } = setup(fixture);
    focus(input);
    typeInto(input, "appl");
    pressKey(input, "Escape");
    expect(optionCount(target)).toBe(0);

    typeInto(input, "ban");
    expect(optionCount(target)).toBe(1);
  });

  test("typing after a selection reopens the dropdown", async () => {
    const { target, input } = setup(fixture);
    focus(input);
    typeInto(input, "appl");
    await pressEnterAndSettle(input);
    expect(optionCount(target)).toBe(0);

    typeInto(input, "ban");
    expect(optionCount(target)).toBe(1);
  });
});

describe("dropdown visibility with focus-related props", () => {
  test("showDropdownOnFocus: typing after a selection reopens the dropdown", async () => {
    const { target, input } = setup(TypeaheadHarness, { showDropdownOnFocus: true });
    focus(input);
    typeInto(input, "appl");
    await pressEnterAndSettle(input);

    typeInto(input, "ban");
    expect(optionCount(target)).toBe(1);
  });

  test("showAllResultsOnFocus: Escape keeps the dropdown closed", () => {
    const { target, input } = setup(TypeaheadHarness, { showAllResultsOnFocus: true });
    focus(input);
    typeInto(input, "appl");
    pressKey(input, "Escape");

    expect(optionCount(target)).toBe(0);
  });

  test("typing keeps the current highlight when the dropdown is already open", () => {
    const { target, input } = setup(TypeaheadHarness);
    focus(input);
    typeInto(input, "a");
    pressKey(input, "ArrowDown");
    expect(target.querySelector("li.selected")?.textContent?.trim()).toBe("banana");

    // Same results, so the highlight should not jump back to the first result.
    typeInto(input, "a");
    expect(target.querySelector("li.selected")?.textContent?.trim()).toBe("banana");
  });
});
