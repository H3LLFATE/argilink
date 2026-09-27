# AgriLink

Offline-first agricultural operating system connecting crop monitoring, AI health analysis, mentor advisory, and supplier marketplace.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Update Website Images and Links

- Edit image URLs and local image paths in [src/config/imageMasterConfig.ts](src/config/imageMasterConfig.ts), under `IMAGE_PATHS`. Existing screens read from these named values, so changing a value updates every place that uses it.
- Put local image files in `public/assets/images`, then set a value like `'/assets/images/my-photo.jpg'`. For an online image, paste its full `https://` URL.
- Edit external website URLs, phone numbers, and app route values in [src/config/linkMasterConfig.ts](src/config/linkMasterConfig.ts). The WhatsApp URL helper reads its default phone from this config; other listed agency and supplier URLs are stored centrally but are not currently displayed by a screen.
- To add another image, add a named value to `IMAGE_PATHS`, then reference it where the image is used: `IMAGE_PATHS.myNewImage`.
