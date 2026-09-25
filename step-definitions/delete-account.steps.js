const { When, Then } = require('@wdio/cucumber-framework');
const homePage = require('../page-objects/HomePage');
const loginPage = require('../page-objects/LoginPage');

/**
 * Delete Account Step Definitions — Test 3
 * Verified flow on Samsung Galaxy S23 / Android (com.yash.bankingapp):
 *
 *   Continues from home dashboard (left by Test 2 — view balance).
 *   1. Tap Profile nav tab (content-desc: ", Profile")
 *   2. Scroll down → delete-account-btn becomes visible
 *   3. Tap delete-account-btn (resource-id: delete-account-btn,
 *      content-desc: "Delete your account permanently")
 *   4. Confirmation dialog title: "Delete Account"
 *      DELETE button: resource-id: android:id/button1
 *   5. Redirected to Login screen
 *
 * SESSION: Shared with signup.steps.js and view-balance.steps.js (maxInstances: 1).
 */

When('I navigate to the Profile tab', async () => {
  // content-desc: ", Profile"
  await homePage.navigateToProfile();
});

When('I scroll down to find the Delete Account button', async () => {
  // Scroll down on Profile screen to reveal delete-account-btn
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      if (src.includes('delete-account-btn')) return true;
      await driver.action('pointer')
        .move({ duration: 0, x: 540, y: 1600 })
        .down({ button: 0 })
        .move({ duration: 600, x: 540, y: 400 })
        .up({ button: 0 })
        .perform();
      return false;
    },
    { timeout: 15000, timeoutMsg: 'Delete Account button did not appear after scrolling' }
  );
});

When('I tap the Delete Account button', async () => {
  const deleteBtn = await $('android=new UiSelector().resourceId("delete-account-btn")');
  await deleteBtn.waitForDisplayed({ timeout: 5000 });
  await deleteBtn.click();
});

When('I confirm account deletion', async () => {
  // Confirmation dialog title: "Delete Account"
  // DELETE button: resource-id: android:id/button1
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      return src.includes('android:id/button1') && src.includes('Delete Account');
    },
    { timeout: 8000, timeoutMsg: 'Delete Account confirmation dialog did not appear' }
  );
  const deleteConfirmBtn = await $('android=new UiSelector().resourceId("android:id/button1")');
  await deleteConfirmBtn.waitForDisplayed({ timeout: 5000 });
  await deleteConfirmBtn.click();
});

Then('I should be redirected to the login screen', async () => {
  await driver.waitUntil(
    async () => loginPage.isLoginScreenDisplayed(),
    { timeout: 15000, timeoutMsg: 'Login screen did not appear after account deletion' }
  );
  const isDisplayed = await loginPage.isLoginScreenDisplayed();
  expect(isDisplayed).toBe(true);
});
