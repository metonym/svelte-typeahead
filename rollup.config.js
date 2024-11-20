import commonjs from "@rollup/plugin-commonjs";
import svelteReadme from "svelte-readme";

export default svelteReadme({
  plugins: [commonjs()],
  style: `
    .code-fence li + li { margin: 0; }
    .code-fence { min-height: 16rem; }
    .code-fence pre { margin-bottom: 0; margin-top: 12px; }
  `,
});
