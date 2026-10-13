# BStackBank App Automation — Test Companion Demo (30 minutes)

A WebdriverIO + Cucumber BDD suite for the **BStackBank Android app** on **BrowserStack App Automate**, used to showcase what **Test Companion** can do inside your IDE in about **30 minutes**:

| # | Capability | What you show |
|---|------------|---------------|
| 1 | **Test case coverage** | Generate comprehensive test cases from a Jira story + PRD and measure what is covered vs. missing |
| 2 | **Retro-tag existing tests** (BrowserStack TM only) | Tag tests automated before your test-case tagging convention existed: Test Companion finds the untagged tests, matches each to the right test case, and opens the tagged changes as a diff for review |
| 3 | **Parallel sessions** | Run multiple Test Companion tasks at once — to accelearte exploratory testing, test case design and test automation all together. |
| 4 | **Real device exploration** | Explore on a real device for advanced features: **biometric** auth and **image (QR) scanning** |
| 5 | **AI RCA and script remediation** | Analyse failures with AI RCA and auto-fix broken locators in the scripts |

---

## Table of Contents

1. [Agenda (30 min)](#agenda-30-min)
2. [One-time Setup](#one-time-setup)
3. [Prerequisites](#prerequisites)
4. [Demo Walkthrough and Prompts](#demo-walkthrough-and-prompts)
5. [Running Tests](#running-tests)
6. [Test Scenarios and Parallel Sessions](#test-scenarios-and-parallel-sessions)
   (AI RCA and remediation are covered in [Session 3 — Execution](#session-3--execution))
7. [Repo Layout](#repo-layout)
8. [Resetting for the Next Run](#resetting-for-the-next-run)

---

## Agenda (30 min)

| Time | Segment | Capability |
|------|---------|------------|
| 0–3 min | Intro: app, repo, rules and skills | Context |
| 3–10 min | Plan from Jira story + PRD, review coverage gaps | Test case coverage |
| 10–15 min | Retro-tag existing tests to their test cases | Retro-tag existing tests |
| 15–23 min | Explore on a real device: biometric + QR scan, then automate | Real device exploration |
| 23–26 min | Run the full suite, watch 2 sessions run side by side | Parallel sessions |
| 26–29 min | Broken locator: AI RCA, then remediate the script | AI RCA and remediation |
| 29–30 min | Wrap-up: dashboard, build link | Recap |

> Tip: kick off the long-running steps (npm install, the test run) early and talk over them.

---

## One-time Setup

1. **Skills and rules (auto-detected)** — the `.test-companionrules/` folder holds the project's skills (`skills/`) and rules (e.g. `Image-Injection-Automation.md`, `Test-Management-Project.md`). Test Companion detects them automatically and applies them in every chat: device selection for image-scanning flows, camera/image injection, biometric enablement and the default QR image (see `resources/sample-qr-images/`). No action needed; they are already in the repo.

3. **Test Companion settings** — in the Test Companion settings panel, enable:
   - ✅ Biometric authentication
   - ✅ Image injection

4. **Jira / Test Management** — connect Jira and BrowserStack Test Management (Azure Test Plans optional) so the planning step can read the story and push cases.
   The requirement documents are in `resources/`: `BrowserStack_Bank_PRD_v1.0.pdf` and `Jira Story.pdf`.
   > **Note:** Copy the content of `Jira Story.pdf` into a new Jira story (as the description) and attach `BrowserStack_Bank_PRD_v1.0.pdf` to that story. Use that story's link in the Test Plan prompt (Step 1).

5. **Get and upload the app** — the BStackBank app is hosted on [Google Drive](https://drive.google.com/file/d/1wRhofwxVsm2h1nGaBbK3BUvNJ8NHzGNh/view). Download it, then upload it to BrowserStack App Automate (or let Test Companion upload it during exploration). Copy its `bs://` ID from the panel into `BS_APP_ID`.

---

## Prerequisites

1. **Node.js** ≥ 18
2. **BrowserStack credentials** — set these in your shell:
   ```bash
   export BROWSERSTACK_USERNAME=<your-username>
   export BROWSERSTACK_ACCESS_KEY=<your-access-key>
   export BS_APP_ID=bs://<your-app-id>
   ```
3. **BrowserStack Test Management project** — create one project (for example, `BStackBank Demo`) in BrowserStack Test Management **before the demo** and use that same project in all three sessions. Test cases generated in Session 1 are pushed to it, and Session 3 retro-tagging matches existing tests against it. The `Test-Management-Project.md` rule in `.test-companionrules/` makes Test Companion ask for the project name, apply it as `projectName` in `wdio.conf.js`, and use it for test case push and retro-tagging, so give the same name in each chat.
4. Install dependencies:
   ```bash
   npm install
   ```

> Never commit credentials. If a key is ever pasted into a chat or file, rotate it.

---

## Demo Walkthrough and Prompts

Run the demo as **three Test Companion chats (sessions)**, open side by side. Each session owns one task, so planning, exploration and execution progress at the same time. Rules and skills in `.test-companionrules/` are applied automatically in every chat.

| Session | Task | Capabilities shown |
|---------|------|--------------------|
| **Session 1 — Test Plan** | Requirements to test cases, coverage gaps, push to Test Management | Test case coverage |
| **Session 2 — Exploratory + Automation** | Explore on a real device (biometric, QR scan), then automate the cases | Real device exploration |
| **Session 3 — Execution** | Retro-tag, run in parallel, AI RCA and fix | Retro-tagging, parallel sessions, AI RCA and remediation |

> All three sessions use the **same Test Management project** (see [Prerequisites](#prerequisites)).

> Keep sessions independent: don't ask one chat to read another's output. Session 2 adds new feature files; Session 3 tags only the existing files in `features/`, so they don't overlap.

### Session 1 — Test Plan

**Goal:** turn the Jira story + PRD into test cases and see what the existing suite doesn't cover.

1. Generate test cases from the requirements:
   ```
   Create comprehensive test cases based on the project requirements
   and specifications from the following link: <Jira ticket link>
   ```
2. Check coverage against the existing suite:
   ```
   Compare the generated test cases with the existing features/ folder and show
   which requirements are not yet covered by automation.
   ```
3. Optionally push the cases to BrowserStack Test Management (or Azure Test Plans) and compare field mapping.

### Session 2 — Exploratory + Automation

**Goal:** explore the app on a real device for biometric and image scanning, then automate what was found.

1. Explore and generate cases:
   ```
   Create 2 comprehensive test cases for biometric and image scanning
   by exploring the following app
   ```
2. Automate the generated cases:
   ```
   Click on Automate Icon in the Test Grid to automate into existing WebdriverIO and Cucumber, following the existing page objects.
   ```

Notes:
- Test Companion drives a real device with biometric and camera injection enabled, applying the project's skills and rules automatically.
- QR scanning uses the injected image `browserstack.jpeg` (alternate: `Wikepedia.jpeg`) from `resources/sample-qr-images/`.
- Biometric prompts are passed via `enableBiometric: true` in `wdio.conf.js`.

### Session 3 — Execution

**Goal:** tag the existing tests, run them in parallel sessions, then analyse and fix a broken locator.

1. **Retro-tag existing tests (BrowserStack Test Management only).** Use this for tests that were automated before your test-case tagging convention existed. Test Companion finds the untagged tests, matches each one to the right test case in BrowserStack Test Management, and opens the tagged changes as a diff for you to review before anything is applied.

   Example: the scenarios in `features/` (signup, delete-account, view-balance) have no test-case tags. Ask:
   ```
   Retro-tag the existing automated tests in features/ with their matching
   BrowserStack Test Management test cases. Show me the changes as a diff to review.
   ```
   What to expect:
   - It lists the untagged scenarios, for example `Signup with auto-credentials and land on home dashboard`.
   - It matches each to a test case, for example the signup scenario to the signup test case in your TM project, and adds that test-case ID as a tag on the scenario.
   - It opens the result as a diff. Review it, then accept or reject each change.

   > Requires the test cases to exist in BrowserStack Test Management (for example, the ones generated in Session 1). Azure Test Plans is not supported for this step.

2. **Run in parallel sessions:**
   ```
   Run the entire test suite
   ```
   Open the BrowserStack App Automate dashboard to show both sessions running at once.

3. **Break a locator on purpose.** In `step-definitions/signup.steps.js` (line 72) change `toggle-password-visibility` to `toggle-pasword-visibility`, then run the suite again so the signup and view-balance tests fail.

4. **AI RCA:**
   ```
   Analyse the failures in this build with AI RCA and tell me why they failed.
   ```
   AI RCA reads the BrowserStack session logs and identifies the failing step and cause (element not found for the `toggle-pasword-visibility` resource-id).

5. **Remediate the script:**
   ```
   Fix the failing tests
   ```
   Test Companion corrects the locator against the real device, updates the step definition and re-runs the affected tests to confirm they pass. This goes beyond RCA by fixing the script grounded on acutal locator on the device than AI guesswork.

---

## Running Tests

```bash
npm test                      # full suite, 2 parallel sessions
npm run test:signup           # signup feature only
npm run test:view-balance     # view-balance feature only
npm run test:delete-account   # delete-account feature only
npm run test:smoke            # tests tagged @smoke
npm run test:regression       # tests tagged @regression
```

---

## Test Scenarios and Parallel Sessions

Configured in `wdio.conf.js` (`maxInstances: 2`) on **Google Pixel 8 / Android 14**. The suite runs as **2 parallel sessions**:

### Device run A — `signup.feature` + `delete-account.feature` (shared session)

| Feature | Scenario | Description |
|---------|----------|-------------|
| `signup.feature` | Signup with auto-credentials and land on home dashboard | Autofill → eye icon → Create Account → home dashboard |
| `delete-account.feature` | Go to profile and delete the account | Profile tab → scroll → Delete Account → confirm → login screen |

### Device run B — `view-balance.feature` (self-contained session)

| Feature | Scenario | Description |
|---------|----------|-------------|
| `view-balance.feature` | Signup, view balance, then delete account | Signup → home dashboard → tap eye icon → biometric PASS → balance revealed → delete account |

---

## Repo Layout

```
.test-companionrules/   Project rules and skills (auto-applied in every chat)
features/               Cucumber feature files
step-definitions/       Step implementations and hooks
page-objects/           Page objects (Base, Home, Login, Signup)
resources/              PRD, Jira story PDF, sample QR images
wdio.conf.js            BrowserStack App Automate config, parallel specs, capabilities
```

---

## Resetting for the Next Run

After the demo, reset the repo to the baseline commit (`git reset --hard <baseline-sha>` or rebase) so generated tests, tags and any intentional locator bug are cleared.