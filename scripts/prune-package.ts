const pkgJson = await Bun.file("./package.json").json();

// Remove unrelated metadata from package.json for publishing.
delete pkgJson.scripts;
delete pkgJson.devDependencies;

await Bun.write("./package.json", JSON.stringify(pkgJson, null, 2) + "\n");

export {};
