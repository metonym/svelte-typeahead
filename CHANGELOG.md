# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
