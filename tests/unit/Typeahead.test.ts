import { flushSync, tick } from "svelte";
import { afterEach, describe, expect, test } from "vitest";
import TypeaheadHarness from "./fixtures/TypeaheadHarness.svelte";
import { pressKey, typeInto } from "./dom";
import { render } from "./render";

const data = ["apple", "banana", "cherry", "date", "grape"];

let cleanup: (() => void) | undefined;

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
});

function setup(props: Record<string, unknown> = {}) {
  const rendered = render(TypeaheadHarness, { data, ...props });
  cleanup = rendered.cleanup;
  const input = rendered.target.querySelector("input");
  if (!(input instanceof HTMLInputElement)) {
    throw new Error("fixture markup missing input");
  }
  return { ...rendered, input };
}

function optionText(target: ParentNode) {
  return Array.from(target.querySelectorAll("li")).map((li) =>
    li.textContent?.trim(),
  );
}

describe("Typeahead", () => {
  test("fuzzy-filters data against the extracted value", () => {
    const { target, input } = setup();
    typeInto(input, "appl");
    expect(optionText(target)).toEqual(["apple"]);
  });

  test("limit caps the number of results, keeping tie-break order", () => {
    const { target, input } = setup({ limit: 2 });
    // "a" matches apple, banana, date, and grape (tied score, original order).
    typeInto(input, "a");
    expect(optionText(target)).toEqual(["apple", "banana"]);
  });

  test("filter excludes matching items from the results", () => {
    const { target, input } = setup({ filter: (item: string) => item === "apple" });
    typeInto(input, "appl");
    expect(optionText(target)).toEqual([]);
  });

  test("disable marks a result as disabled and it is skipped by click and keyboard nav", () => {
    const { target, input } = setup({
      disable: (item: string) => item === "banana",
    });
    typeInto(input, "a");
    expect(optionText(target)).toEqual(["apple", "banana", "date", "grape"]);

    const banana = target.querySelectorAll("li")[1];
    expect(banana.className).toContain("disabled");

    banana.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    flushSync();
    expect(target.querySelector('[data-testid="select-detail"]')?.textContent).toBe(
      "null",
    );

    // ArrowDown from the autoselected "apple" (index 0) should skip "banana".
    pressKey(input, "ArrowDown");
    const options = target.querySelectorAll("li");
    expect(options[2].className).toContain("selected");
    expect(options[2].textContent?.trim()).toBe("date");
  });

  test("ArrowDown/ArrowUp move the selection and wrap around", () => {
    const { target, input } = setup();
    typeInto(input, "a");
    expect(optionText(target)).toEqual(["apple", "banana", "date", "grape"]);

    pressKey(input, "ArrowDown");
    pressKey(input, "ArrowDown");
    pressKey(input, "ArrowDown");
    let options = target.querySelectorAll("li");
    expect(options[3].className).toContain("selected");

    pressKey(input, "ArrowDown");
    options = target.querySelectorAll("li");
    expect(options[0].className).toContain("selected");

    pressKey(input, "ArrowUp");
    options = target.querySelectorAll("li");
    expect(options[3].className).toContain("selected");
  });

  test("Enter selects the highlighted result, updates value, and dispatches select", async () => {
    const { target, input } = setup();
    typeInto(input, "a");

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    // select() awaits tick() internally before closing the dropdown, so wait
    // an extra tick for that continuation to run.
    await tick();
    await tick();
    flushSync();

    expect(input.value).toBe("apple");
    const detail = JSON.parse(
      target.querySelector('[data-testid="select-detail"]')?.textContent ?? "null",
    );
    expect(detail).toMatchObject({
      selectedIndex: 0,
      searched: "a",
      selected: "apple",
      original: "apple",
    });
    expect(target.querySelectorAll("li")).toHaveLength(0);
  });

  test('inputAfterSelect="clear" empties the input after selecting', async () => {
    const { input } = setup({ inputAfterSelect: "clear" });
    typeInto(input, "appl");

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    // select() awaits tick() internally before closing the dropdown, so wait
    // an extra tick for that continuation to run.
    await tick();
    await tick();
    flushSync();

    expect(input.value).toBe("");
  });

  test('inputAfterSelect="keep" leaves the searched text in the input after selecting', async () => {
    const { input } = setup({ inputAfterSelect: "keep" });
    typeInto(input, "appl");

    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    // select() awaits tick() internally before closing the dropdown, so wait
    // an extra tick for that continuation to run.
    await tick();
    await tick();
    flushSync();

    expect(input.value).toBe("appl");
  });

  test("Escape clears the input, closes the dropdown, and refocuses", () => {
    const { target, input } = setup();
    typeInto(input, "appl");
    expect(optionText(target)).toEqual(["apple"]);

    pressKey(input, "Escape");

    expect(input.value).toBe("");
    expect(target.querySelectorAll("li")).toHaveLength(0);
  });

  test("clearing the input to empty dispatches a clear event", () => {
    const { target, input } = setup();
    typeInto(input, "appl");
    typeInto(input, "");

    expect(
      target.querySelector('[data-testid="clear-count"]')?.textContent,
    ).toBe("1");
  });

  test("showAllResultsOnFocus lists every item when the empty input is focused", () => {
    const { target, input } = setup({ showAllResultsOnFocus: true });
    input.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    flushSync();

    expect(optionText(target)).toEqual(data);
  });

  test("the no-results slot renders when there are no matches", () => {
    const { target, input } = setup();
    typeInto(input, "zzz-no-match");

    expect(target.textContent).toContain('No results for "zzz-no-match"');
  });

  test("autoselect=false leaves no result highlighted", () => {
    const { target, input } = setup({ autoselect: false });
    typeInto(input, "a");

    expect(
      target.querySelectorAll("li.selected"),
    ).toHaveLength(0);
    expect(input.hasAttribute("aria-activedescendant")).toBe(false);
  });

  test("aria-expanded toggles with the dropdown's visibility", () => {
    const { target, input } = setup();
    const combobox = target.querySelector("[data-svelte-typeahead]");
    if (!combobox) throw new Error("fixture markup missing combobox");

    expect(combobox.getAttribute("aria-expanded")).toBe("false");

    typeInto(input, "appl");
    expect(combobox.getAttribute("aria-expanded")).toBe("true");
  });

  test("clicking outside the combobox closes the dropdown", () => {
    const { target, input } = setup();
    const combobox = target.querySelector("[data-svelte-typeahead]");
    if (!combobox) throw new Error("fixture markup missing combobox");

    typeInto(input, "appl");
    expect(combobox.getAttribute("aria-expanded")).toBe("true");

    const outside = document.createElement("button");
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    flushSync();

    expect(combobox.getAttribute("aria-expanded")).toBe("false");
    outside.remove();
  });
});
