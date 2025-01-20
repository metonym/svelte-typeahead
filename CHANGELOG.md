# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.0](https://github.com/metonym/svelte-typeahead/releases/tag/v5.0.0) - 2025-01-20

**Breaking Changes**

- set `package.json#type` to `module` with `exports` field
- drop bundled ESM/UMD builds (only Svelte source code is distributed)
- colocate TypeScript definitions with Svelte source code

**Fixes**

- patch `svelte-search` to v2.1.1
- run `npm pkg fix` to fix `package.json` metadata

## [4.4.2](https://github.com/metonym/svelte-typeahead/releases/tag/v4.4.2) - 2024-11-20

- fix `$$restProps` type errors by upgrading `svelte-search`

## [4.4.1](https://github.com/metonym/svelte-typeahead/releases/tag/v4.4.1) - 2022-11-12

- replace `aria-owns` with `aria-controls` to resolve `a11y-role-has-required-aria-props` warning

## [4.4.0](https://github.com/metonym/svelte-typeahead/releases/tag/v4.4.0) - 2022-11-08

**Features**

- add `showAllResultsOnFocus` prop to display all results when focusing an empty input

**Fixes**

- silence a11y warnings emitted by Svelte@3.52
- event type for dispatched `clear` event should be `null`
- unset `ul` margin

## [4.3.2](https://github.com/metonym/svelte-typeahead/releases/tag/v4.3.2) - 2022-09-01

**Fixes**

- allow results to be selected if using `showDropdownOnFocus`

## [4.3.1](https://github.com/metonym/svelte-typeahead/releases/tag/v4.3.1) - 2022-08-29

**Fixes**

- skip disabled results when auto-selecting a result

## [4.3.0](https://github.com/metonym/svelte-typeahead/releases/tag/v4.3.0) - 2022-08-29

**Features**

- add `showDropdownOnFocus` prop to only show dropdown if the search input is focused

## [4.2.4](https://github.com/metonym/svelte-typeahead/releases/tag/v4.2.4) - 2022-07-05

**Fixes**

- set dropdown menu `z-index: 1` when expanded

## [4.2.3](https://github.com/metonym/svelte-typeahead/releases/tag/v4.2.3) - 2022-07-04

**Fixes**

- update selected index when hovering over a result

## [4.2.2](https://github.com/metonym/svelte-typeahead/releases/tag/v4.2.2) - 2022-03-20

**Fixes**

- pressing "ArrowUp" on last item should not reset highlighted index

## [4.2.1](https://github.com/metonym/svelte-typeahead/releases/tag/v4.2.1) - 2021-10-30

**Fixes**

- prevent keyboard selection and navigation of disabled results
- add missing annotation for `TItem.disabled` to `results` prop

**Documentation**

- add `pnpm` installation command
- remove "disabling items after selection" example
- remove `id` fields from `data` array
- simplify dispatched events example

## [4.2.0](https://github.com/metonym/svelte-typeahead/releases/tag/v4.2.0) - 2021-10-26

**Features**

- use TypeScript generics so that the item type can be inferred from `data` value

## [4.1.0](https://github.com/metonym/svelte-typeahead/releases/tag/v4.1.0) - 2021-10-03

**Features**

- render a "no-results" slot when the search value does not yield results
- add `value` to the default slot props

## [4.0.0](https://github.com/metonym/svelte-typeahead/releases/tag/v4.0.0) - 2021-09-05

**Breaking Changes**

- use `.svelte.d.ts` extension for component TypeScript definition

## [3.0.0](https://github.com/metonym/svelte-typeahead/releases/tag/v3.0.0) - 2021-03-16

**Breaking Changes**

- the `ul` element is rendered even without results to preserve the accessibility label

**Fixes**

- disable form ARIA attributes in `svelte-search`
- pass the correct `aria-activedescendant` item to `svelte-search`

## [2.4.1](https://github.com/metonym/svelte-typeahead/releases/tag/v2.4.1) - 2021-03-14

**Fixes**

- pass `id` to `Search` to fix `aria-labelledby` references

## [2.4.0](https://github.com/metonym/svelte-typeahead/releases/tag/v2.4.0) - 2021-03-04

**Features**

- add `limit` prop to limit number of results; default value is `Infinity`

## [2.3.0](https://github.com/metonym/svelte-typeahead/releases/tag/v2.3.0) - 2021-02-21

**Features**

- add `disable`, `filter` props to disable and filter items from the result set

**Fixes**

- bind the input element reference correctly to fix focusing behavior
- don't pass the Typeahead id to Search

## [2.2.0](https://github.com/metonym/svelte-typeahead/releases/tag/v2.2.0) - 2021-02-20

**Features**

- add `inputAfterSelect` prop to allow user to preserve or clear the input field after selecting a result; possible values are `"update" | "clear" | "keep"` (default is `"update"`)
- add searched value to dispatched "select" event detail (`e.detail.searched`)

## [2.1.0](https://github.com/metonym/svelte-typeahead/releases/tag/v2.1.0) - 2021-02-20

**Features**

- include `original` item and `originalIndex` in dispatched "select" event

## [2.0.0](https://github.com/metonym/svelte-typeahead/releases/tag/v2.0.0) - 2020-12-31

**Breaking Changes**

- upgrade `svelte-search` to version 1.0.0
- defer to default `label`, `placeholder` props from `search-svelte`
- use `SvelteComponentTyped` interface in TypeScript definitions

## [1.0.0](https://github.com/metonym/svelte-typeahead/releases/tag/v1.0.0) - 2020-11-28

**Features**

- export reactive `results` array containing fuzzy results
- add `focusAfterSelect` to opt in to focusing input after selecting a result
- keydown default behavior is preventing if pressing "ArrowUp", "ArrowDown", or "Escape"

**Breaking changes**

- `focusAfterSelect` is `false` by default
- redesigned default styles
- if using TS, Svelte version >=3.30 is required

## [0.2.0](https://github.com/metonym/svelte-typeahead/releases/tag/v0.2.0) - 2020-11-17

- Add TypeScript definitions

## [0.1.1](https://github.com/metonym/svelte-typeahead/releases/tag/v0.1.1) - 2020-08-06

- Remove `filter` named export

## [0.1.0](https://github.com/metonym/svelte-typeahead/releases/tag/v0.1.0) - 2020-04-15

- Initial release
