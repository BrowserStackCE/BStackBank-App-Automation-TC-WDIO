# Usage Guide

## Table of Contents

1. [Overview](#overview)
2. [Repo Prerequisites](#prerequisites)
3. [Demo Flow Coverage](#demo-flow-coverage)
4. [Demo Setup Instructions](#setup-instructions)
5. [Running Tests](#running-tests)
6. [Test Scenarios](#test-scenarios)

---

## Prompts for Each Task

### Task 1
```
Please help me create 2 comprehensive test cases for biometric and image scanning
by exploring the following app using /pixel-device
```

### Task 2
```
Please help me create comprehensive test cases based on the project requirements
and specifications from the following link: <Jira ticket link>
```

### Task 3
```
Run the entire test suite
```

> Note: AI will fetch RCA, fix the locator and then re-run the test

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

## Overview

WebdriverIO + Cucumber BDD test suite for the BStackBank Android app, running on **BrowserStack App Automate**.

**Target devices:** Google Pixel 8 / Android 14, Xiaomi Redmi Note 11 / Android 11
> Note: Use a Non-Samsung device, as the locators are mapped as per it.

---

## Demo Flow Coverage

### Task 1 — Platform & AI
- **Explore** the app live on a real device (Session 1) and auto-generate test cases using AI
- **Automate** those test cases into a runnable test suite

### Task 2 — Test Harness
- **Plan** using a Jira PRD link; generate test cases and sync them to the test harness (Session 2)
- **Compare** Azure Test Plans vs BrowserStack Test Management — field mapping and harness capabilities

### Task 3 — Native IDE & Repo-Aware Context
- **Execute** the full suite triggered directly from the IDE
- **Remediate** failures with real-device-grounded script healing (beyond RCA)

---

## Setup Instructions

Before running the demo, complete the following one-time setup steps:

1. **Non-Samsung device skill** — the `SKILL.md` file configures Test Companion to always use a non-Samsung (Google Pixel) device. No action needed; it is already in the repo.

2. **Image injection rule** — the `Image-Injection-Automation.md` file tells the AI to enable camera/image injection and use `./images/browserstack.jpeg` as the default QR code image. No action needed; it is already in the repo.

3. **Test Companion settings** — in the Test Companion settings panel, enable:
   - ✅ Biometric authentication
   - ✅ Image injection

4. **Intentional locator bug** — `step-definitions/signup.steps.js` line 72 uses `toggle-pasword-visibility` (typo) instead of `toggle-password-visibility`. This is intentional for the Task 3 remediation demo.



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

