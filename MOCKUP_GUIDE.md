# Replacing Page Mockups

The site map shows the low-fidelity wireframe until a page has a supplied mockup. You do not need to alter the tree, the dialog, or the React components to update a preview.

## Two files control every supplied mockup

| File | Purpose | What you do |
|---|---|---|
| `client/public/mockups/` | Stores image files. | Upload a PNG, JPG, or WebP file here. |
| `client/src/content/mockupRegistry.ts` | Assigns a mockup image to a site-map node. | Replace the matching `null` entry with one `mockup(...)` line. |

Keep individual images below **2 MB** where possible. Export desktop mockups at roughly 1440 px wide and mobile mockups at roughly 390 px wide. The viewer preserves each supplied image’s natural proportions.

## Example: replace the Donation Checkout preview

1. In GitHub, open `client/public/mockups/` and select **Add file → Upload files**.
2. Upload your image as `donation-checkout.png` and commit it directly to `main`.
3. Open `client/src/content/mockupRegistry.ts` and find this line:

```ts
checkout: null,
```

4. Replace it with:

```ts
checkout: mockup("mockups/donation-checkout.png", "Donation checkout mobile mockup"),
```

5. Commit the change to `main`. GitHub Pages automatically rebuilds the public site. Usually the updated mockup appears within a few minutes.

## Page IDs available in the registry

| Area | Page IDs |
|---|---|
| Learn | `learn`, `about`, `history`, `staff`, `board`, `reports`, `news` |
| Open a Fund | `open`, `daf`, `impact`, `endowed`, `scholarship-fund`, `fund-inquiry` |
| Donate | `donate`, `find-fund`, `fund-detail`, `cart`, `checkout`, `confirmation` |
| Apply | `apply`, `grants`, `scholarships`, `programs`, `teen`, `fellowship` |
| Attend | `attend`, `events`, `gala`, `hundred`, `table` |
| General | `home`, `contact` |

You can assign one image to multiple entries when several pages share the same template. The original wireframe remains the fallback until an image is mapped.
