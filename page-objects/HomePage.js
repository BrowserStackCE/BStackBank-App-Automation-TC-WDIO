const BasePage = require('./BasePage');

/**
 * HomePage - Page Object for the Home/Dashboard screen
 * Selectors verified via live exploratory session on Google Pixel 8 (Android 14)
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   "Total Balance"       → TextView (text)
 *   "Good morning,"       → TextView (text)
 *   Bottom nav tabs       → View content-desc=", Home|Transfer|Cards|Transactions|Profile"
 *   logout-btn            → Button content-desc="Sign out of your account" (resource-id)
 *   delete-account-btn    → Button content-desc="Delete your account permanently" (resource-id)
 */
class HomePage extends BasePage {
  // ─── Selectors ────────────────────────────────────────────────────────────

  get totalBalanceLabel() {
    return $('android=new UiSelector().text("Total Balance")');
  }

  get profileNavTab() {
    return $('android=new UiSelector().descriptionContains(", Profile")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async isDashboardDisplayed() {
    return this.isDisplayed('android=new UiSelector().text("Total Balance")');
  }

  async waitForDashboard() {
    await this.waitForElement('android=new UiSelector().text("Total Balance")', 20000);
  }

  async navigateToProfile() {
    await this.tap('android=new UiSelector().descriptionContains(", Profile")');
  }
}

module.exports = new HomePage();
