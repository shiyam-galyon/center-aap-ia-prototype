# Publishing the Center AAP Prototype to GitHub

The completed interactive plan is already available as a Manus project checkpoint. **GitHub is where the source code lives; it is not automatically a public website.** If you simply want the code under your account, create a repository and I can push it. If you want the client to visit a GitHub-hosted link, use GitHub Pages after the source is in the repository.

## Option A — Recommended: create the empty repository, then send me the URL

This is the least technical route. The connected GitHub credential currently lacks permission to create repositories, but it can push to a repository you create.

1. Go to [GitHub’s new repository page](https://github.com/new) while signed into your account.
2. Set the repository name to `center-aap-ia-prototype`.
3. Choose **Private** unless the client should be able to see the source code itself.
4. Leave **Add a README file**, **Add .gitignore**, and **Choose a license** unchecked. The repository should be empty.
5. Click **Create repository**.
6. Copy the repository URL, such as `https://github.com/your-account/center-aap-ia-prototype`, and send it here.

> Once you send the empty repository URL, I can connect the completed project and push the source. You will not need to upload files or run Git commands yourself.

## Option B — Publish the source yourself

Use this option if you would rather not grant repository access or send the repository URL here.

| Step | What to do |
|---|---|
| 1 | In the project interface, open **Code** and download the project as a ZIP file. |
| 2 | Create an empty GitHub repository using steps 1–5 above. |
| 3 | Unzip the download on your computer, then open a terminal in that folder. |
| 4 | Run the commands below, replacing the example URL with your repository URL. |

```bash
git init
git add .
git commit -m "Add Center AAP interactive information architecture plan"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/center-aap-ia-prototype.git
git push -u origin main
```

GitHub may ask you to authenticate in your browser or enter a personal access token. That is normal when pushing from your own computer.

## If the client needs a public URL

Use the existing Manus **Publish** control for the fastest hosted version. This produces a client-facing site without exposing the repository source.

If you specifically need a GitHub Pages URL, send me the repository URL after Option A. I can add a small GitHub Actions workflow that builds this static site and deploys it to GitHub Pages. You would then enable **Settings → Pages → Source: GitHub Actions** in the repository.

## Recommended setup

Keep the source repository **private** and share the hosted Manus link with the client. This preserves access control while making the prototype easy to explore. If the client or another developer needs source access, invite them as a GitHub collaborator rather than changing the repository to public.
