# Step-by-Step Guide: Pushing RecycleConnect Code to GitHub

Follow these steps to commit the new screens and push them to your GitHub repository.

---

## Prerequisites

Make sure you have:
- Git installed on your machine (`git --version`)
- A GitHub account
- Your repository already created at GitHub (e.g. `github.com/yourname/recycleconnect`)

---

## Step 1 — Open the Replit Shell

In Replit, click the **Shell** tab at the bottom of the screen.

---

## Step 2 — Check What Changed

```bash
git status
```

You should see a list of new and modified files including:
- `app/login.jsx`
- `app/household/home.jsx`
- `app/household/pickup/index.jsx` (Step 1 – Materials)
- `app/household/pickup/address.jsx` (Step 2 – Address)
- `app/household/pickup/time.jsx` (Step 3 – Time)
- `app/household/pickup/confirm.jsx` (Step 4 – Confirm)
- `app/household/track.jsx`
- `app/household/wallet.jsx`
- `app/household/profile.jsx`
- `app/collector/home.jsx`
- `app/collector/jobs.jsx`
- `app/collector/track.jsx`
- `app/collector/earnings.jsx`
- `app/collector/profile.jsx`
- `components/StepIndicator.jsx`
- `constants/colors.js`
- `replit.md`

---

## Step 3 — Stage All Changes

To add everything at once:

```bash
git add .
```

Or add specific files:

```bash
git add app/household/ app/collector/ components/ constants/colors.js
```

---

## Step 4 — Commit with a Message

```bash
git commit -m "feat: add household and collector screens with full routing

- Household: Home, 4-step Schedule Pickup, Track, Wallet, Profile
- Collector: Dashboard, Jobs, Track, Earnings, Profile
- Shared StepIndicator component and color tokens
- Login screen with user-type selector"
```

---

## Step 5 — Connect to GitHub (First Time Only)

If you haven't linked your GitHub remote yet:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Check it was added:

```bash
git remote -v
```

---

## Step 6 — Push to GitHub

### Push to `main` branch:

```bash
git push origin main
```

### If your branch is called `master`:

```bash
git push origin master
```

### If it's your first push (new repo):

```bash
git push -u origin main
```

You'll be prompted for your GitHub username and a **Personal Access Token** (not your password — GitHub no longer accepts passwords for Git operations).

---

## Step 7 — Create a Personal Access Token (if needed)

1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. Click **Generate new token**
3. Select scopes: ✅ `repo`
4. Copy the token and use it as your password when prompted in Step 6

---

## Step 8 — Verify on GitHub

Go to `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME` and confirm all your new files appear.

---

## Ongoing Workflow

After each coding session, use this quick cycle:

```bash
git add .
git commit -m "your message here"
git push origin main
```

---

## Working with Branches (Optional but Recommended)

Create a new branch for each feature:

```bash
# Create and switch to a new branch
git checkout -b feature/collector-jobs

# ... make changes ...

git add .
git commit -m "feat: collector jobs screen"

# Push the branch to GitHub
git push origin feature/collector-jobs
```

Then open a **Pull Request** on GitHub to merge into `main`.

---

## Useful Git Commands

| Command | What it does |
|---|---|
| `git status` | See what's changed |
| `git log --oneline` | See recent commits |
| `git diff` | See exact line changes |
| `git pull origin main` | Get latest code from GitHub |
| `git checkout -b branch-name` | Create a new branch |
| `git stash` | Temporarily save uncommitted changes |
