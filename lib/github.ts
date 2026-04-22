const GITHUB_API = "https://api.github.com";

type RepoInfo = { owner: string; repo: string; branch: string; token: string };

export function getRepoInfo(): RepoInfo {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token) throw new Error("Missing GITHUB_TOKEN environment variable.");
  if (!repo || !repo.includes("/"))
    throw new Error("Missing GITHUB_REPO environment variable (expected owner/repo).");
  const [owner, repoName] = repo.split("/");
  return { owner: owner!, repo: repoName!, branch, token };
}

function auth(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "fcf-admin",
  };
}

export async function getFileSha(path: string): Promise<string | null> {
  const { owner, repo, branch, token } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeURI(path)}?ref=${branch}`,
    { headers: auth(token), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub get ${path} failed: ${res.status}`);
  const body = (await res.json()) as { sha: string };
  return body.sha;
}

export async function commitFile(params: {
  path: string;
  contentBase64: string;
  message: string;
}): Promise<void> {
  const { owner, repo, branch, token } = getRepoInfo();
  const sha = await getFileSha(params.path);
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeURI(params.path)}`,
    {
      method: "PUT",
      headers: { ...auth(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: params.message,
        content: params.contentBase64,
        branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub commit ${params.path} failed: ${res.status} \u2014 ${body}`);
  }
}

export function toBase64(input: string | Uint8Array): string {
  if (typeof input === "string") {
    const bytes = new TextEncoder().encode(input);
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
  }
  let bin = "";
  for (const b of input) bin += String.fromCharCode(b);
  return btoa(bin);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
}
