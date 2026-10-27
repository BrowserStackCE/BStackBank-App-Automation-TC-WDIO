# BStackBank App Testing — Test Companion Demo (30 minutes)

Use this repository to demonstrate a complete, **end-to-end mobile testing lifecycle** for a native banking application using **Test Companion**. In under 30 minutes, showcase the full potential of Test Companion from
- Structured **📋 Test Planning**,
- Deep-dive **📱 Advanced Mobile Exploratory Testing**,
- Context-driven **🤖 Repo-aware Automation**,
- Real-device grounded **Script 📲  Remediation**.

APK: [Download](https://drive.google.com/drive/folders/1J7HBizvt2QNP90FQHwGN_koda7WrBe_P?usp=sharing)

## Table of Contents

1. [Key Capabilities to Highlight](#key-capabilities-to-highlight)
2. [Agenda (30 Minutes)](#agenda-30-minutes)
3. [Repository Layout](#repository-layout)
4. [Prerequisites & One-Time Setup](#prerequisites--one-time-setup)
   - [Environment & Dependencies](#1-environment--dependencies)
   - [Test Companion Settings](#2-test-companion-settings)
   - [Test Management & Jira Setup](#3-test-management--jira-setup)
5. [Demo Walkthrough: 3 Parallel Sessions](#demo-walkthrough-3-parallel-sessions)
   - [Chat 1 — Test Planning & Coverage Gap Analysis](#chat-1--test-planning--coverage-gap-analysis)
   - [Chat 2 — Real-Device Exploration & Codegen](#chat-2--real-device-exploration--codegen)
   - [Chat 3 — Retro-Tagging, Execution & AI Remediation](#chat-3--retro-tagging-execution--ai-remediation)
6. [Test Execution Commands](#test-execution-commands)
7. [Demo Reset](#demo-reset)

---

## Key Capabilities to Highlight

| Capability | What to Showcase |
| :--- | :--- |
| **Requirements-to-Tests Coverage** | Generate comprehensive test cases from a Jira story + PRD; surface automation gaps instantly. |
| **Retro-Tagging** | Map legacy, untagged tests to Test Management IDs automatically via reviewable git diffs. |
| **Parallel Chat Sessions** | Run planning, exploration, and execution concurrently in independent sessions. |
| **Advanced Real-Device Exploration** | Drive native features on real devices: biometric bypass and camera/QR code injection. |
| **AI RCA & Auto-Remediation** | Diagnose failures using real device logs and auto-correct broken locators in code. |

---

## Agenda (30 Minutes)

| Time | Segment | Focus Capability |
| :--- | :--- | :--- |
| **00–03 min** | Intro: Architecture, rules, and skills | Setup & Context |
| **03–10 min** | Plan from Jira + PRD; review coverage gaps | Test Case Coverage |
| **10–15 min** | Retro-tag legacy features to test cases | Retro-Tagging |
| **15–23 min** | Explore real device (Biometric + QR scan); automate | Real-Device Exploration |
| **23–26 min** | Trigger parallel execution across devices | Parallel Sessions |
| **26–29 min** | Simulate broken locator; run AI RCA & remediation | AI RCA & Script Healing |
| **29–30 min** | Review App Automate dashboard and wrap up | Recap |

> **Presenter Tip:** Kick off `npm install` and the app upload before the demo starts so you can present without downtime.

---

## Repository Layout

```text
BStackBank-App-Automation-TC-WDIO/
├── .test-companionrules/             # Auto-applied project rules and device skills
│   ├── Image-Injection-Automation.md # Camera injection & biometric bypass rules
│   ├── Test-Management-Project.md    # Test management project binding rule
│   └── skills/pixel-device/SKILL.md  # Device targeting skill for QR flows
├── features/                         # Cucumber feature specifications
│   ├── signup.feature
│   ├── delete-account.feature
│   └── view-balance.feature
├── step-definitions/                 # Step implementations and lifecycle hooks
├── page-objects/                     # Page Object Models
├── resources/                        # Demo collateral (PRD, Jira spec, QR assets)
│   ├── BrowserStack_Bank_PRD_v1.0.pdf
│   ├── Jira Story.pdf
│   └── sample-qr-images/             # Injected images (browserstack.jpeg, Wikepedia.jpeg)
├── wdio.conf.js                      # WDIO & App Automate configuration
└── package.json
```

---

## Prerequisites & One-Time Setup

### 1. Environment & Dependencies
```bash
# Verify Node.js >= 18
node -v

# Set BrowserStack credentials
export BROWSERSTACK_USERNAME="<your-username>"
export BROWSERSTACK_ACCESS_KEY="<your-access-key>"

# Install dependencies
npm install
```

### 2. Test Companion Settings
In the Test Companion panel, enable the following under **Mobile Settings**:
* ✅ **Biometric bypass**
* ✅ **Camera media injection**
* ✅ **Use my App Automate Account**

### 3. Test Management & Jira Setup
1. **Create a Test Project:** In BrowserStack Test Management, create a blank project named `BStackBank Demo`. Use this exact name across all chat sessions.
2. **Create a Jira Story:** Create a Jira ticket with the contents of `resources/Jira Story.pdf` as the description, and attach `resources/BrowserStack_Bank_PRD_v1.0.pdf`. Copy the ticket link for Session 1.
3. **App Upload:** Upload the target APK/IPA to BrowserStack App Automate and copy its `bs://` App URL.

---

## Demo Walkthrough: 3 Parallel Sessions

Run three Test Companion chats side-by-side to showcase parallel velocity. Rules in `.test-companionrules/` apply automatically across all chats.

```text
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│     Chat 1: Planning    │   Chat 2: Exploration   │    Chat 3: Execution    │
│  Generate test cases &  │ Real-device QR/biometric│  Retro-tag, execute, &  │
│  identify missing tests │  exploration & codegen  │  auto-heal broken locs  │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

### Chat 1 — Test Planning & Coverage Gap Analysis
**Goal:** Transform Jira requirements into test cases and find unautomated edge cases.

1. **Generate test cases:**
   > `Create comprehensive test cases from the following link: <Jira link ticket>`
2. **Identify coverage gaps:**
   > `Compare the generated test cases with the existing features/ folder and show which requirements are not yet covered by automation.`
3. **Export:** Review the mapping grid and sync test cases directly to your BrowserStack Test Management project.

---

### Chat 2 — Real-Device Exploration & Codegen
**Goal:** Explore hardware-dependent flows (biometrics, camera) on a real device and generate WDIO steps.

1. **Explore on device:**
   > `Create 2 comprehensive test cases for biometric authentication and image scanning by exploring the BStackBank app.`
   * *Under the hood:* Test Companion activates the Pixel skill, enables camera injection with `resources/sample-qr-images/browserstack.jpeg`, and triggers biometrics.
2. **Automate into repo:**
   > Click **Automate** in the Test Grid to convert findings into step definitions and page objects matching your repository pattern.

---

### Chat 3 — Retro-Tagging, Execution & AI Remediation
**Goal:** Tag legacy suites, trigger parallel runs, and heal broken locators live.

1. **Retro-tag untagged tests:**
   > `Retro-tag the existing automated tests in features/ with their matching BrowserStack Test Management test cases. Show me the changes as a diff to review.`
   * Review and accept the git diff adding case IDs directly to the `.feature` files.
2. **Trigger parallel test run:**
   > `Run the entire test suite.`
   * Open the BrowserStack App Automate dashboard to show two parallel threads running specs simultaneously.
3. **AI RCA & Remediation:**
   * Select the failed test in the **Failure Analysis** panel and click **Fix**.
   * Run the AI-RCA pre-filled prompt
   * Test Companion inspects real device accessibility trees, identifies the typo, updates the locator in code, and re-runs the spec to verify the fix.

---

## Test Execution Commands

```bash
# Run full suite in parallel (2 instances)
npm test

# Run a specific feature
npm run test:view-balance
```

---

## Demo Reset

Clean up generated files, tags, and locator adjustments to restore the demo environment to its baseline:

```bash
git reset --hard && git clean -fd
```
