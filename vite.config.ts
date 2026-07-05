import { svelteReadme } from "svelte-readme";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    svelteReadme({
      style: `
        .code-fence li + li { margin: 0; }
        .code-fence { min-height: 16rem; }
        .code-fence pre { margin-bottom: 0; margin-top: 12px; }
      `,
    }),
  ],
});
