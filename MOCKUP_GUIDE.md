# Replacing Page Mockups

The site map shows the low-fidelity wireframe until a page has a supplied mockup. You do not need to alter the tree, the dialog, or the React components to update a preview.

## Two files control every supplied mockup

| File | Purpose | What you do |
|---|---|---|
| `client/public/mockups/` | Stores image files. | Upload a PNG, JPG, or WebP file here. |
| `client/src/content/mockupRegistry.ts` | Assigns a mockup image to a site-map node. | Replace the matching `null` entry with one `mockup(...)` line. |

Keep individual images below **2 MB** where possible. Export desktop mockups at roughly 1440 px wide and mobile mockups at roughly 390 px wide. The viewer preserves each supplied image’s natural proportions.

## Example: replace the Search Our Funds preview

1. In GitHub, open `client/public/mockups/` and select **Add file → Upload files**.
2. Upload your image as `search-our-funds.png` and commit it directly to `main`.
3. Open `client/src/content/mockupRegistry.ts` and find this line:

```ts
"search-our-funds": null,
```

4. Replace it with:

```ts
"search-our-funds": mockup("mockups/search-our-funds.png", "Search Our Funds mockup"),
```

5. Commit the change to `main`. GitHub Pages automatically rebuilds the public site. Usually the updated mockup appears within a few minutes.

## Page IDs available in the registry

| Area | Page IDs |
|---|---|
| Learn About CAAP | `learn-about-caap`, `our-history`, `our-staff`, `our-advisory-board`, `reports` |
| Open a Fund | `open-a-fund`, `donor-advised-fund`, `impact-area-fund`, `endowed-fund`, `fund-scholarships` |
| Donate to a Cause | `donate-to-a-cause`, `search-our-funds` |
| Apply for an Opportunity | `apply-for-an-opportunity`, `grants`, `opportunity-scholarships`, `programs`, `teen-grantmaking-initiative`, `emerging-philanthropist-fellowship` |
| Attend an Event | `attend-an-event`, `threads-of-giving-gala`, `100-arab-americans`, `directors-table-series` |
| General | `home` |

You can assign one image to multiple entries when several pages share the same template. The original wireframe remains the fallback until an image is mapped.
