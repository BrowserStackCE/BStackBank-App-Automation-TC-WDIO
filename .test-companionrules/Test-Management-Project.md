### BrowserStack Test Management - Project Name Rule

> **Test Companion:** Before generating, pushing, tagging or running anything that touches Test Management, make sure you know the user's Test Management project name. Ask once per chat if you don't have it, then reuse it everywhere.

1. **Ask for the project name first.**
   - Ask the user: "What is the name of your BrowserStack Test Management project?" (use `ask_followup_question`).
   - Do not guess a name, and do not create a new project unless the user asks.
   - If the user already gave the name earlier in this chat, reuse it and do not ask again.

2. **Apply it in `wdio.conf.js`.**
   - Set the project name in `capabilities[0]['bstack:options'].projectName` so the Automate build and the Test Management project share the same name.
   - Keep `buildName` and `sessionName` as they are, unless the user asks to change them.
   - Do not hard-code credentials. `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` and `BS_APP_ID` stay as environment variables.
   - Do not add any Test Management config key that has not been verified in the BrowserStack docs. If the user wants one, ask them for the documented key.

3. **Use the same project for all tasks.**
   - Test case generation and push: add generated test cases to this project.
   - Retro-tagging (BrowserStack Test Management only): look up test cases in this project only, match each untagged automated test to its test case, and show the tagged changes as a diff for the user to review before applying.
   - If the project has no test cases yet, tell the user to generate and push them first instead of tagging.

4. **Keep it consistent across chats.** The demo uses one project for the planning, exploratory/automation and execution chats. If the user gives a different name in a later chat, confirm before changing `wdio.conf.js`.
