const { Before, After, BeforeAll, AfterAll } = require('@wdio/cucumber-framework');

/**
 * Global Hooks
 * Verified flow (Samsung Galaxy S23, com.yash.bankingapp):
 *   1. App launch → Notification permission dialog (Allow / Don't allow)
 *   2. Login → Biometric Authentication dialog (CANCEL / FAIL / PASS)
 *   3. After biometric PASS → Location permission dialog (While using / Only this time / Don't allow)
 *   4. Home dashboard loads
 */

BeforeAll(async () => {
  console.log('=== BStackBank Test Suite Starting ===');
});

AfterAll(async () => {
  console.log('=== BStackBank Test Suite Complete ===');
});

Before(async (scenario) => {
  console.log(`\n▶ Starting: ${scenario.pickle.name}`);

  // Set BrowserStack session name to the scenario name so each scenario
  // appears as a separate named test with its own video in the dashboard.
  try {
    await driver.execute(`browserstack_executor: {"action":"setSessionName","arguments":{"name":"${scenario.pickle.name}"}}`);
  } catch { /* session may not be ready yet — non-fatal */ }
});

After(async (scenario) => {
  const status = scenario.result?.status;
  console.log(`${status === 'PASSED' ? '✅' : '❌'} Finished: ${scenario.pickle.name} [${status}]`);

  if (status === 'FAILED') {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      // Ensure reports directory exists before saving screenshot
      const fs = require('fs');
      fs.mkdirSync('./reports/screenshots', { recursive: true });
      await driver.saveScreenshot(`./reports/screenshots/failure_${scenarioName}_${timestamp}.png`);
    } catch {
      // Screenshot may fail if session is already closed
    }
  }
});

/**
 * Accept notification permission dialog if present.
 * resource-id: com.android.permissioncontroller:id/permission_allow_button
 */
async function acceptNotificationPermission() {
  try {
    const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
    await allowBtn.waitForDisplayed({ timeout: 6000 });
    await allowBtn.click();
    console.log('[Hook] Notification permission accepted');
  } catch {
    // No notification dialog — continue
  }
}

/**
 * Handle biometric — wait for the system PASS/FAIL dialog (requires enableBiometric: true
 * in bstack:options), then send PASS via the BrowserStack executor.
 *
 * Correct payload per BrowserStack docs:
 *   {"action":"biometric", "arguments": {"biometricMatch": "pass"}}
 */
async function handleBiometricDialog() {
  try {
    await driver.waitUntil(
      async () => {
        const src = await driver.getPageSource();
        return src.includes('Biometric Authentication') || src.includes('Verify Your Identity');
      },
      { timeout: 12000, timeoutMsg: 'Biometric screen did not appear' }
    );
    await driver.execute('browserstack_executor: {"action":"biometric", "arguments": {"biometricMatch": "pass"}}');
    console.log('[Hook] Biometric PASS sent via BrowserStack executor');
  } catch {
    // No biometric screen — continue
  }
}

/**
 * Accept location permission dialog — tap "While using the app".
 * resource-id: com.android.permissioncontroller:id/permission_allow_foreground_only_button
 */
async function acceptLocationPermission() {
  try {
    const locationBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
    await locationBtn.waitForDisplayed({ timeout: 6000 });
    await locationBtn.click();
    console.log('[Hook] Location permission accepted (While using the app)');
  } catch {
    // No location dialog — continue
  }
}

/**
 * Logout from the app via Profile tab → Sign Out button.
 * resource-id: logout-btn (content-desc: "Sign out of your account")
 */
async function logoutFromApp() {
  try {
    const profileTab = await $('android=new UiSelector().descriptionContains(", Profile")');
    await profileTab.waitForDisplayed({ timeout: 5000 });
    await profileTab.click();
    // Use UiScrollable to scroll to logout button in native Android
    const logoutBtn = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("logout-btn"))');
    await logoutBtn.waitForDisplayed({ timeout: 8000 });
    await logoutBtn.click();
    console.log('[Hook] Logged out via Profile → Sign Out');
  } catch (e) {
    console.log('[Hook] Logout failed:', e.message);
  }
}

module.exports = {
  acceptNotificationPermission,
  handleBiometricDialog,
  acceptLocationPermission,
  logoutFromApp,
};
