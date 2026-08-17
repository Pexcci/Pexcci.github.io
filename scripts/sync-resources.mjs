import { readFile, writeFile } from "node:fs/promises";

const dataPath = new URL("../resources.json", import.meta.url);
const resources = JSON.parse(await readFile(dataPath, "utf8"));
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

const decodeHtml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchTitle(resource) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(resource.url, {
        headers: {
          "user-agent": userAgent,
          "accept-language": "zh-CN,zh;q=0.9"
        },
        redirect: "follow"
      });
      const html = await response.text();
      const rawTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
      const title = decodeHtml(rawTitle).replace(/\s*-\s*小红书\s*$/, "").trim();
      if (response.ok && title && !title.includes("你访问的页面不见了")) return title;
    } catch {
      // Preserve the last known title if the public page is temporarily unavailable.
    }
    await sleep(attempt * 1500);
  }
  return resource.title;
}

let changed = false;
for (const resource of resources) {
  const latestTitle = await fetchTitle(resource);
  if (latestTitle !== resource.title) {
    resource.title = latestTitle;
    changed = true;
  }
  await sleep(800);
}

if (changed) {
  await writeFile(dataPath, `${JSON.stringify(resources, null, 2)}\n`, "utf8");
  console.log("Resource titles updated.");
} else {
  console.log("Resource titles are already current.");
}
