const BasePage = require('./BasePage');

/**
 * LoginPage - Page Object for the Login screen
 * Selectors verified via live exploratory session on Google Pixel 8 (Android 14)
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   login-btn    → Button content-desc="Sign in to your account" (resource-id)
 *   goto-signup  → View content-desc="Go to sign up" (resource-id)
 */
class LoginPage extends BasePage {
  // ─── Selectors ────────────────────────────────────────────────────────────

  get loginButton() {
    return $('android=new UiSelector().resourceId("login-btn")');
  }

  get signUpLink() {
    return $('android=new UiSelector().resourceId("goto-signup")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async isLoginScreenDisplayed() {
    return this.isDisplayed('android=new UiSelector().resourceId("login-btn")');
  }
}

module.exports = new LoginPage();
