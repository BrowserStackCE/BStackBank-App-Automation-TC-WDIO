const { Given, When, Then } = require('@wdio/cucumber-framework');
const signupPage = require('../page-objects/SignupPage');
const homePage = require('../page-objects/HomePage');
const { acceptLocationPermission } = require('./hooks');

/**
 * Signup Step Definitions — Test 1
 * Verified flow on Samsung Galaxy S23 / Android (com.yash.bankingapp):
 *
 *   1. App launch → accept notification permission (if present)
 *   2. Login screen → tap "Go to sign up" (resource-id: goto-signup)
 *   3. Signup screen → scroll down → tap "Auto-fill" (resource-id: autofill-new-user)
 *                   → tap eye icon (resource-id: toggle-password-visibility) to show password
 *                   → tap "Create Account" (resource-id: signup-btn)
 *   4. Location permission dialog → accept "While using the app"
 *   5. Home dashboard with "Total Balance" visible
 *
 * SESSION: Shared across all 3 feature files (maxInstances: 1).
 *          This test runs first and lands on the home dashboard for Test 2 to continue.
 */

Given('the BStackBank app is launched and I am on the signup screen', async () => {
  // Dismiss notification permission if present
  try {
    const notifBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
    if (await notifBtn.isDisplayed()) {
      await notifBtn.click();
    }
  } catch { /* not present */ }

  // Wait for login screen then navigate to signup
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      if (src.includes('signup-btn')) return true;
      if (src.includes('login-btn') || src.includes('Welcome Back')) {
        try {
          const link = await $('android=new UiSelector().resourceId("goto-signup")');
          if (await link.isDisplayed()) {
            await link.click();
          }
        } catch { /* not present */ }
      }
      return false;
    },
    { timeout: 30000, timeoutMsg: 'Could not reach signup screen within 30 seconds' }
  );
});

When('I fill in the signup form with valid details', async () => {
  // Scroll down to reveal autofill-new-user button
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      if (src.includes('autofill-new-user')) return true;
      await driver.action('pointer')
        .move({ duration: 0, x: 540, y: 1600 })
        .down({ button: 0 })
        .move({ duration: 600, x: 540, y: 400 })
        .up({ button: 0 })
        .perform();
      return false;
    },
    { timeout: 10000, timeoutMsg: 'autofill-new-user button not found after scrolling' }
  );
  // Use autofill-new-user to generate a unique user each run
  await signupPage.fillSignupFormWithAutofill();
});

When('I tap the Create Account button', async () => {
  // Tap eye icon first to show password (required by the app flow)
  const eyeBtn = await $('android=new UiSelector().resourceId("toggle-password-visibility")');
  await eyeBtn.waitForDisplayed({ timeout: 5000 });
  await eyeBtn.click();

  // Tap Create Account button
  await signupPage.tapCreateAccountButton();

  // Accept location permission if it appears after signup
  await acceptLocationPermission();
});

Then('I should be on the home dashboard after signup', async () => {
  await driver.waitUntil(
    async () => {
      // Handle biometric dialog that may appear after account creation
      try {
        const src = await driver.getPageSource();
        if (src.includes('Biometric Authentication') || src.includes('Do you want it to pass or fail')) {
          await driver.execute('browserstack_executor: {"action":"biometric", "arguments": {"biometricMatch": "pass"}}');
        }
        // Handle location permission that may appear after biometric
        if (src.includes('permission_allow_foreground_only_button') || src.includes('While using the app')) {
          try {
            const locationBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
            if (await locationBtn.isDisplayed()) await locationBtn.click();
          } catch { /* not present */ }
        }
      } catch { /* ignore errors during dialog handling */ }
      return homePage.isDashboardDisplayed();
    },
    { timeout: 40000, timeoutMsg: 'Home dashboard did not appear after signup' }
  );
  const isDisplayed = await homePage.isDashboardDisplayed();
  expect(isDisplayed).toBe(true);
});
