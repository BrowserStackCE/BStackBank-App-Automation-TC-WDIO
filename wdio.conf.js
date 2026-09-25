// Load .env — works in both launcher and worker processes
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

// Resolve credentials: prefer env vars (CI), fall back to .env values already loaded above
const BS_USER = process.env.BROWSERSTACK_USERNAME;
const BS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const platform = process.env.PLATFORM || 'android';
// Supported PLATFORM values: android, androidPixel, androidOnePlus (Xiaomi), androidTablet, ios, all

if (!BS_USER || !BS_KEY) {
  throw new Error('BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set in .env or environment');
}

// Centralised capability definitions live in config/capabilities.js
const capabilities = require('./config/capabilities');

exports.config = {
  runner: 'local',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
  user: BS_USER,
  key: BS_KEY,

  // Session 1: signup → delete-account (shared session)
  // Session 2: view-balance (self-contained: signup → view balance → delete)
  specs: [
    [
      './features/signup.feature',
      './features/delete-account.feature',
    ],
    [
      './features/view-balance.feature',
    ],
  ],
  exclude: [],

  maxInstances: 4,

  capabilities:
    platform === 'ios'
      ? [capabilities.ios]
      : platform === 'androidPixel'
        ? [capabilities.androidPixel]
        : platform === 'androidOnePlus'
          ? [capabilities.androidOnePlus]
          : platform === 'all'
            ? [capabilities.android, capabilities.androidOnePlus]
            : [capabilities.android],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['browserstack'],

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require: ['./step-definitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    // Exclude @qrscan from the default run — it requires PLATFORM=androidPixel
    // with enableCameraImageInjection. Run it via: npm run test:qrscan
    tagExpression: platform === 'androidPixel' ? '' : 'not @qrscan',
    timeout: 120000,
    ignoreUndefinedDefinitions: false,
  },

};
