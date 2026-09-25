### BrowserStack App Automate - Camera / Image Injection Rules

When generating mobile automation scripts (Appium/Selenium) that require Camera / Image Injection on BrowserStack App Automate, follow these guidelines:

1. **Required Capabilities:**
   - Always enable camera injection: set capability `browserstack.enableCameraImageInjection` (or `enableCameraImageInjection`) to `true`.
   - Pass the media URL using the capability `browserstack.cameraInjectionMedia` (or `cameraInjectionMedia`).

2. **Default Media for QR Code Testing:**
   - For all QR code scanning requirements, use the existing pre-uploaded media ID:
     `media://a85ff3f4d9c46cff13a7e88eef2308fa5a118da4`

3. **Uploading Custom Images (If Required):**
   - If a custom image is needed, use the BrowserStack REST API to upload media prior to test execution:
     ```bash
     curl -u "<BROWSERSTACK_USERNAME>:<BROWSERSTACK_ACCESS_KEY>" \
       -X POST "[https://api-cloud.browserstack.com/app-automate/upload-media](https://api-cloud.browserstack.com/app-automate/upload-media)" \
       -F "file=@/path/to/image.png" \
       -F "custom_id=<CustomID>"
     ```
   - Supported formats: JPG, JPEG, PNG (max file size: 10 MB).
   - Use the returned `media_url` (e.g., `media://...`) in the `cameraInjectionMedia` capability.