# Usage Guide

## Overview

WebdriverIO + Cucumber BDD test suite for the BStackBank Android app, running on **BrowserStack App Automate**.

**Target devices:** Google Pixel 8 / Android 14, Xiaomi Redmi Note 11 / Android 11
> Note: Use a Non-Samsung device, as the locators are mapped as per it.

---

## Prerequisites

1. **Node.js** ≥ 18

2. **BrowserStack credentials** — copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and set:
   ```
   BROWSERSTACK_USERNAME=<your-username>
   BROWSERSTACK_ACCESS_KEY=<your-access-key>
   BS_APP_ID=bs://<your-app-id>
   ```
   > Find your credentials at [BrowserStack App Automate dashboard](https://app-automate.browserstack.com/).

3. **Upload the app to BrowserStack** to get your `BS_APP_ID`:

   The app APK is: [app-release.apk](https://drive.google.com/drive/folders/1J7HBizvt2QNP90FQHwGN_koda7WrBe_P?usp=sharing)

   Upload it using the BrowserStack REST API:
   ```bash
   curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
     -F "file=@your-path/app-release.apk"
   ```
   The response will contain an `app_url` like `bs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Set that as `BS_APP_ID` in your `.env`.

   > Full upload docs: [Upload app from filesystem – BrowserStack](https://www.browserstack.com/docs/app-automate/appium/upload-app-from-filesystem?fw-lang=nodejs%2Fwebdriverio)

4. Install dependencies:
   ```bash
   npm install
   ```

---

## Running Tests

### Run all tests on both devices (Pixel 8 + Xiaomi Redmi Note 11)
```bash
npm test
```

### Run on Pixel 8 only
```bash
npm run test:pixel
```

### Run individual feature files
```bash
npm run test:signup          # Session 1: signup only
npm run test:view-balance    # Standalone: signup → view balance → delete account
npm run test:delete-account  # Delete account only (requires active session from signup)
```

### Run on Xiaomi Redmi Note 11
```bash
npm run test:xiaomi      # Full suite on Xiaomi Redmi Note 11 / Android 11
```

### Run by tag
```bash
npm run test:smoke       # @smoke scenarios
npm run test:regression  # @regression scenarios
```

### Run directly with WDIO
```bash
PLATFORM=android npx wdio run wdio.conf.js --spec features/signup.feature
```

---

## Test Scenarios

The suite runs as **2 parallel sessions**:

### Session 1 — `features/signup.feature` + `features/delete-account.feature` (shared session)

| Feature | Scenario | Description |
|---------|----------|-------------|
| `signup.feature` | Signup with auto-credentials and land on home dashboard | Autofill → eye icon → Create Account → home dashboard |
| `delete-account.feature` | Go to profile and delete the account | Profile tab → scroll → Delete Account → confirm → login screen |

### Session 2 — `features/view-balance.feature` (self-contained session)

| Feature | Scenario | Description |
|---------|----------|-------------|
| `view-balance.feature` | Signup, view balance, then delete account | Signup → home dashboard → tap eye icon → biometric PASS → balance revealed → delete account |

---

