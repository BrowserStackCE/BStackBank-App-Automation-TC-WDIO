const { When, Then } = require('@wdio/cucumber-framework');

/**
 * View Balance Step Definitions — Test 2
 * Verified flow on Samsung Galaxy S23 / Android (com.yash.bankingapp):
 *
 *   Continues from home dashboard (left by Test 1 — signup).
 *   1. Tap balance eye icon (resource-id: balance-eye-btn,
 *      content-desc: "Show balance — requires passcode")
 *   2. Biometric Authentication dialog appears (BrowserStack mock dialog)
 *   3. Send biometric PASS via BrowserStack executor
 *   4. Balance revealed — eye icon changes to content-desc: "Hide balance"
 *
 * SESSION: Shared with signup.steps.js and delete-account.steps.js (maxInstances: 1).
 */

When('I tap the balance eye icon', async () => {
  // balance-eye-btn triggers a BrowserStack Biometric Authentication mock dialog
  const eyeBtn = await $('android=new UiSelector().resourceId("balance-eye-btn")');
  await eyeBtn.waitForDisplayed({ timeout: 10000 });
  await eyeBtn.click();

  // Wait for the Biometric Authentication dialog to appear
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      return src.includes('Biometric Authentication') || src.includes('Do you want it to pass or fail');
    },
    { timeout: 10000, timeoutMsg: 'Biometric Authentication dialog did not appear' }
  );

  // Send PASS via BrowserStack biometric executor
  await driver.execute('browserstack_executor: {"action":"biometric", "arguments": {"biometricMatch": "pass"}}');
});

Then('I should see the balance revealed', async () => {
  // After biometric PASS, balance-eye-btn changes to "Hide balance"
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      return src.includes('Hide balance') || src.includes('$');
    },
    { timeout: 10000, timeoutMsg: 'Balance was not revealed after biometric PASS' }
  );

  const hideBtn = await $('android=new UiSelector().resourceId("balance-eye-btn")');
  await hideBtn.waitForDisplayed({ timeout: 5000 });
  const desc = await hideBtn.getAttribute('content-desc');
  expect(desc).toBe('Hide balance');
});
