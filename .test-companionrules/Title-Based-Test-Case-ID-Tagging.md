### BrowserStack Test Management - Title-Based Test Case ID Tagging (WebdriverIO + BrowserStack service)

> **Test Companion:** In this project, tag automated tests to Test Management cases by putting the ID at the END of the test/scenario title. Never use `@TCID_` tags, comments, or method names.

WebdriverIO with `services: ['browserstack']` behaves like a BrowserStack SDK run, so the title-based form is the one that links results to the Test Management case.

1. **Confirm the project name first. Never guess it.**
   - Before looking up test cases or tagging anything, confirm the Test Management project name with the user (use `ask_followup_question`: "What is the name of your BrowserStack Test Management project?").
   - If the user already gave it earlier in this chat, reuse it. Otherwise ask, even if a name appears in `wdio.conf.js` or elsewhere.
   - Do not infer the project from config, folder names or earlier chats, and do not create a project.

2. **Format**
   - Append the BrowserStack Test Management identifier (`TC-<digits>`, hyphen included) to the END of the title.
   - Cucumber `.feature`: `Scenario: Login with valid credentials TC-8810`
   - Mocha/Jasmine `.js`/`.ts`: `it('updates user email TC-1234', ...)`
   - A leading ID (`TC-1234: ...`) does not match and opens a new test case.

3. **One ID per test.** Exactly one `TC-` ID per scenario/test. If it already has one, leave it unless the user asks to change it.

4. **Never guess an ID.**
   - Use only IDs read from the confirmed Test Management project.
   - Match by title and intent; when the match is partial or weak, say so in the summary and let the user decide.
   - If no case matches, leave the test untagged. Never increment or invent an ID.

5. **Do not use** `@TCID_TC-xxxx` tags above the Scenario, `record_property`, `Reporter.log` markers, or IDs in comments or step-definition names for this project.

6. **Show a diff first** when retro-tagging existing tests, so the user can review before applying.
