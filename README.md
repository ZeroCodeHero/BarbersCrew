# NFC Review/Menu Card — Landing Page Template

A single, mobile-first landing page for restaurant NFC cards. A customer taps the
card, and this page gives them two large choices:

1. **Leave us a Review** → the client's Google review link
2. **View Our Menu** → the client's online menu (opens in a new tab)

Static HTML/CSS/vanilla JS. No framework, no build step, no backend, no database,
no analytics, no cookies, no web fonts. It is intentionally simple so a
non-developer can duplicate it for a new client by editing **6 values in one file**.

---

## To deploy for a new client

Follow these steps in order. You do not need to be a developer.

### Step 1 — Copy the template into a new repo (one repo per client)

1. On GitHub, open this template repository.
2. Click the green **Use this template** button → **Create a new repository**.
   (If this repo is not marked as a template, click **Fork** instead, or clone it
   and push to a brand-new repo.)
3. Name the new repo after the client, e.g. `corner-bistro-card`.
4. Create the repository.

> **Why one repo per client?** See "Repo strategy" at the bottom. Short version:
> it maps 1-to-1 to how Coolify deploys, so there is nothing to get wrong.

### Step 2 — Edit the 6 config values (the ONLY thing you change)

Open **`index.html`** in the new repo. At the very top, inside the
`CLIENT CONFIG` block, edit these 6 values and **nothing else**:

| Value                | What to put                                                                 |
|----------------------|------------------------------------------------------------------------------|
| `BUSINESS_NAME`      | The client's name, e.g. `"The Corner Bistro"`.                                |
| `LOGO_URL`           | A hosted logo image URL, or leave as `""` to show just the name.              |
| `GOOGLE_REVIEW_LINK` | From Google Business Profile → **Ask for reviews** → **Copy link**.           |
| `MENU_LINK`          | The client's existing online menu URL (any external site).                    |
| `PRIMARY_COLOR`      | Hex color for the "Leave us a Review" button, e.g. `"#92400E"`.               |
| `ACCENT_COLOR`       | Hex color for the "View Our Menu" button, e.g. `"#D97706"`.                   |

You can edit directly on GitHub: open `index.html` → click the pencil icon →
change the values → **Commit changes** to the `main` branch.

> Button text color (black or white) is chosen automatically for readability —
> you do not need to set it.

### Step 3 — Create the app in Coolify and point the domain

In Coolify:

1. **+ New** → **Resource** → **Application** → source **Public/Private Repository**
   (GitHub App). Select the client's new repository and the `main` branch.
2. Build pack: choose **Dockerfile** (Coolify will use the `Dockerfile` in the repo).
3. Set the **Port** to **80** (the container serves on port 80).
4. Under **Domains**, enter the client's domain, e.g. `https://cards.clientdomain.com`.
5. Point DNS at your Coolify server: at the client's domain registrar / DNS host,
   create a record for that hostname:
   - **A record** → your Coolify server's public IP, **or**
   - **CNAME** → your Coolify server's hostname.
   Wait for DNS to propagate (usually minutes). Coolify will issue HTTPS (Let's
   Encrypt) automatically once DNS resolves.

### Step 4 — Deploy

1. In Coolify, ensure **auto-deploy on push** is enabled for this application
   (default when connected via the GitHub App).
2. Click **Deploy** once for the first build.
3. From now on, **every push to `main` auto-builds and redeploys** — no server
   steps. To change a client's details later, edit the 6 values in `index.html`,
   commit, and it redeploys itself.

That's the whole process. Repeat Steps 1–4 for each new client.

---

## Repo strategy: one repo per client (chosen)

**Decision: one repository per client**, created from this template.

**Why, given Coolify's GitHub auto-deploy model:**

- Coolify links **one application → one repo/branch → one domain**, and redeploys
  that app on every push. One-repo-per-client maps exactly onto that model: the
  client, the repo, the domain, and the Coolify app are all 1-to-1. There is no
  routing, branching, or per-directory configuration to reason about.
- **Blast radius is isolated.** Editing one client's `index.html` can only ever
  affect that client. A single shared repo would mean one bad commit could break
  every client at once.
- **The edit is trivially findable.** For any client there is exactly one
  `index.html` with exactly one CONFIG block. No hunting through per-client folders
  or environment variables.
- **Rollback is per-client** via that repo's Git history.

The alternative — one shared repo with many client configs (subfolders or build
args, each wired to a separate Coolify app) — adds per-app "base directory" or
env configuration, couples all clients to one commit history, and gives more
places to make a mistake. For a non-developer operating this long-term, the
shared-repo approach is more error-prone with no real upside at this scale.

---

## Files

| File         | Purpose                                                        |
|--------------|----------------------------------------------------------------|
| `index.html` | Markup **and** the per-client CONFIG block (the only edits).   |
| `style.css`  | Static styles. Never edited per client.                        |
| `app.js`     | Applies CONFIG to the page. Never edited per client.           |
| `Dockerfile` | Serves the static files via nginx (alpine). Never edited.      |
| `README.md`  | This file.                                                     |

## Run it locally (optional)

Any static server works, e.g.:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Or build the container the way Coolify will:

```sh
docker build -t nfc-card .
docker run --rm -p 8080:80 nfc-card
# then open http://localhost:8080
```
