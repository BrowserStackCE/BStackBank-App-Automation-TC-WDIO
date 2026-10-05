### BrowserStack App Automate - Camera / Image Injection Rules

> **Test Companion:** Always enable both `enableCameraImageInjection: true` and `biometric: true` capabilities when generating scripts for this project.

When generating mobile automation scripts (Appium/Selenium) that require Camera / Image Injection on BrowserStack App Automate, follow these guidelines:

1. **Required Capabilities:**
   - Always enable camera injection: set capability `browserstack.enableCameraImageInjection` (or `enableCameraImageInjection`) to `true`.
   - Pass the media URL using the capability `browserstack.cameraInjectionMedia` (or `cameraInjectionMedia`).

2. **Default Media for QR Code Testing:**
   - For all QR code scanning requirements, use the image at `images/browserstack.jpeg`.

3. **Uploading Custom Images (If Required):**
   - If a custom image is needed, use the BrowserStack REST API to upload media prior to test execution:
     ```bash
     curl -u "<BROWSERSTACK_USERNAME>:<BROWSERSTACK_ACCESS_KEY>" \
       -X POST "https://api-cloud.browserstack.com/app-automate/upload-media" \
       -F "file=@./images/browserstack.jpeg" \
       -F "custom_id=SampleMedia"
     ```
   - Supported formats: JPG, JPEG, PNG (max file size: 10 MB).
   - Use the returned `media_url` (e.g., `media://...`) in the `cameraInjectionMedia` capability. 