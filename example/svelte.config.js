const { mdsvex } = require("mdsvex");

module.exports = {
  extensions: [".svelte", ".md"],
  preprocess: [mdsvex({ extension: "md" })],
};
