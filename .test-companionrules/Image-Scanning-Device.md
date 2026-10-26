### BStack Bank App - Device Rule for Image Scanning Workflows

> **Test Companion:** For every exploration, automation script creation and test execution that involves image scanning in the BStack Bank app (image injection, QR scanning, barcode scanning), always use a non-Samsung device such as a Google Pixel.

1. **Device selection**
   - Use a Google Pixel (or any other non-Samsung device) whenever the flow scans or injects an image.
   - Never pick a Samsung device for these flows.

2. **Where it applies**
   - Exploratory sessions: start the device session on a Pixel before reaching the scan screen.
   - Automation scripts: set `deviceName` in the capabilities (e.g. in `wdio.conf.js`) to a Google Pixel device for image scanning scenarios.
   - Test execution and debugging: keep runs and re-runs of scanning tests on the same non-Samsung device.

3. **Combine with the image injection rules**
   - Follow `Image-Injection-Automation.md` for the camera injection capabilities and the default `images/browserstack.jpeg` media.
