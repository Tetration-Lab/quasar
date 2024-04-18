// tools/convertNextJsExportIntoBrowserExtension.ts

import { resolve } from "path";
import { rename, rm, readdir, writeFile, readFile, cp } from "fs/promises";

const nextJsOutDirectory = "out";
const extensionDirectory = "../extension";

const manifestAddon = {
  manifest_version: 3,
  version: "1.0.0",
  name: "Quasar",
  description: "Quantum Secure Smart Account",
  icons: {
    "444": "next-assets/icon.png",
  },
  action: {
    default_title: "Quasar",
    default_popup: "index.html",
    default_icon: {
      "444": "next-assets/icon.png",
    },
  },
  permissions: [
    "favicon",
    "activeTab",
    "storage",
    "alarms",
    "unlimitedStorage",
    "clipboardRead",
    "clipboardWrite",
    "contextMenus",
    "scripting",
  ],
  host_permissions: ["*://*/*"],
  background: {
    service_worker: "workers/sv.js",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      all_frames: true,
      run_at: "document_start",
      js: ["workers/inject.js"],
    },
    {
      matches: ["http://*/*", "https://*/*"],
      all_frames: true,
      run_at: "document_start",
      js: ["workers/inpage.js"],
      world: "MAIN",
    },
  ],
  web_accessible_resources: [
    {
      resources: ["workers/inject.js", "workers/inpage.js"],
      matches: ["<all_urls>"],
    },
  ],
  externally_connectable: {
    matches: ["*://*/*"],
  },
};

(async () => {
  // Intro
  console.log("Converting NextJS export into chromium browser extension:");

  // Remove extension directory
  console.log(`Removing old ${extensionDirectory} directory...`);
  await rm(extensionDirectory, { recursive: true, force: true }); // requires node 14+

  // Replace underscores, which can't be used in chrome extensions
  console.log(`Preparing exported application...`);
  await rename(`${nextJsOutDirectory}/_next`, `${nextJsOutDirectory}/next`);
  const files = await getFilesInDirectoryRecursively(nextJsOutDirectory);
  await Promise.all(
    files
      .filter(
        (file) =>
          file.endsWith(".html") || file.endsWith(".js") || file.endsWith("css")
      )
      .map(async (file) => {
        const data = await readFile(file, "utf8");
        const result = data
          .replace(/\/_next\//g, "/next/")
          .replace(/\\\/_next\\\//g, "\\/next\\/");
        await writeFile(file, result, "utf8");
      })
  );

  // Update manifest with extension specific parameters
  //console.log("Updating manifest file...");
  //const originalManifest = JSON.parse(
  //(await readFile(`${nextJsOutDirectory}/manifest.json`, "utf8")).toString()
  //);

  /* Icons go from array format to object format
   * Accepted format: https://developer.mozilla.org/en-US/docs/Web/Manifest/icons
   * Produced format: https://developer.chrome.com/docs/extensions/mv3/manifest/icons/
   */
  //let icons = originalManifest.icons;
  //if (Array.isArray(icons) && !manifestAddon.hasOwnProperty("icons")) {
  //console.log("Reformatting icons array to extension manifest format...");
  //icons = icons.reduce((result, { src, sizes }) => {
  //const size = sizes.split("x")[0]; // '32x32' becomes '32'
  //result[size] = src; // "32": "path/to/file"

  //return result;
  //}, {});
  //console.log(icons);
  //}

  const manifest = { ...manifestAddon };
  await writeFile(
    `${nextJsOutDirectory}/manifest.json`,
    Buffer.from(JSON.stringify(manifest, null, 2)),
    "utf8"
  );

  // Move processed export to extension folder
  console.log(`Creating extension from next build...`);
  await rename(nextJsOutDirectory, extensionDirectory);

  console.log("Copying worker files...");
  await rename("cworkers", `${extensionDirectory}/workers`);

  // Instruct what's next
  console.log(
    `\nDone.\n\nLoad "${extensionDirectory}" folder into any Chromium browser as an extension to try it.`
  );
})();

const getFilesInDirectoryRecursively = async (directory) => {
  const dirents = await readdir(directory, { withFileTypes: true });

  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(directory, dirent.name);
      return dirent.isDirectory() ? getFilesInDirectoryRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files);
};
