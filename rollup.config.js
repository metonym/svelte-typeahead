import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import pkg from "./package.json";

export default ["es", "umd"].map((format) => {
  const UMD = format === "umd";

  return {
    input: "src",
    output: {
      format,
      file: UMD ? pkg.main : pkg.module,
      name: UMD ? pkg.name : undefined,
    },
    plugins: [svelte(), resolve(), commonjs()],
  };
});
