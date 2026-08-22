# Editing the Center AAP Hierarchy

The interactive tree is controlled by one file:

`client/src/content/hierarchyRegistry.ts`

You can update the hierarchy without editing the map layout or the dialog code.

| Change you want | What to edit |
|---|---|
| Rename a page | Change its `label`. |
| Edit the short description | Change its `note`. |
| Add a page | Copy an existing child object, assign a unique lowercase `id`, and change its label and note. |
| Put a page under another branch | Move that page object into the destination node’s `children` array. |
| Remove a page | Delete that complete object. |
| Replace its mockup | Use the same `id` in `client/src/content/mockupRegistry.ts`. |

## Example: Add a new event

Inside the `Attend an Event` branch, add a new object after the existing children:

```ts
{ id: "community-giving-night", label: "Community Giving Night", kind: "Page", template: "event", note: "Community event page." },
```

Then add its matching mockup slot to `client/src/content/mockupRegistry.ts`:

```ts
"community-giving-night": null,
```

Later, replace that `null` with the image mapping described in `MOCKUP_GUIDE.md`. Commit both files to `main`; the GitHub Pages site will rebuild automatically.
