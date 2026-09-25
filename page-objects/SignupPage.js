const BasePage = require('./BasePage');

/**
 * SignupPage - Page Object for the Signup screen
 * Selectors verified via live exploratory session on Google Pixel 8 (Android 14)
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   bs-logo-signup          → LinearLayout (resource-id)
 *   fullname-input          → EditText (resource-id)
 *   email-input             → EditText (resource-id)
 *   password-input          → EditText (resource-id, password=true)
 *   confirm-password-input  → EditText (resource-id, password=true)
 *   signup-btn              → Button content-desc="Create your account" (resource-id)
 *   goto-login              → ViewGroup content-desc="Already have an account? Sign In" (resource-id)
 *   autofill-new-user       → ViewGroup content-desc="Auto-fill" (resource-id)
 */
class SignupPage extends BasePage {
  // ─── Selectors ────────────────────────────────────────────────────────────

  get fullNameField() {
    return $('android=new UiSelector().resourceId("fullname-input")');
  }

  get emailField() {
    return $('android=new UiSelector().resourceId("email-input")');
  }

  get passwordField() {
    return $('android=new UiSelector().resourceId("password-input")');
  }

  get confirmPasswordField() {
    return $('android=new UiSelector().resourceId("confirm-password-input")');
  }

  get createAccountButton() {
    return $('android=new UiSelector().resourceId("signup-btn")');
  }

  get goToLoginLink() {
    return $('android=new UiSelector().resourceId("goto-login")');
  }

  get autofillNewUser() {
    return $('android=new UiSelector().resourceId("autofill-new-user")');
  }

  get createAccountHeading() {
    return $('android=new UiSelector().text("Create Account")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async isSignupScreenDisplayed() {
    return this.isDisplayed('android=new UiSelector().resourceId("signup-btn")');
  }

  async fillSignupForm(fullName, email, password) {
    await this.typeText('android=new UiSelector().resourceId("fullname-input")', fullName);
    await this.typeText('android=new UiSelector().resourceId("email-input")', email);
    await this.typeText('android=new UiSelector().resourceId("password-input")', password);
    await this.typeText('android=new UiSelector().resourceId("confirm-password-input")', password);
    await this.hideKeyboard();
  }

  async fillSignupFormWithAutofill() {
    await this.tap('android=new UiSelector().resourceId("autofill-new-user")');
  }

  async tapCreateAccountButton() {
    await this.tap('android=new UiSelector().resourceId("signup-btn")');
  }
}

module.exports = new SignupPage();
