const BS_USER = process.env.BROWSERSTACK_USERNAME || '';
const BS_KEY  = process.env.BROWSERSTACK_ACCESS_KEY || '';
const BS_APP  = process.env.BS_APP_ID || '';

if (!BS_USER || !BS_KEY) {
  throw new Error(
    'BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set as environment variables.\n' +
    'Run: export BROWSERSTACK_USERNAME=<your-username> && export BROWSERSTACK_ACCESS_KEY=<your-access-key>'
  );
}

const bstackOptions = (buildSuffix, sessionName) => ({
  userName:    BS_USER,
  accessKey:   BS_KEY,
  projectName: 'BStackBank Automation',
  buildName:   `BStackBank ${buildSuffix} - ${new Date().toISOString().split('T')[0]}`,
  sessionName,
  debug:       true,
  networkLogs: true,
  deviceLogs:  true,
  appiumLogs:  false,
});

const platform = process.env.PLATFORM || 'android';

const allCapabilities = {
  android: {
    platformName: 'android',
    'appium:deviceName':        'Google Pixel 8',
    'appium:platformVersion':   '14.0',
    'appium:app':               BS_APP,
    'appium:automationName':    'UiAutomator2',
    'appium:noReset':           true,
    'appium:newCommandTimeout': 300,
    'bstack:options': {
      ...bstackOptions('Android Pixel', 'BStackBank Signup Test'),
      enableBiometric: true,
    },
  },

  androidPixel: {
    platformName: 'android',
    'appium:deviceName':        'Google Pixel 8',
    'appium:platformVersion':   '14.0',
    'appium:app':               BS_APP,
    'appium:automationName':    'UiAutomator2',
    'appium:noReset':           true,
    'appium:newCommandTimeout': 300,
    'bstack:options': {
      ...bstackOptions('Android Pixel', 'BStackBank QR Scan Test'),
      enableBiometric:            true,
      enableCameraImageInjection: true,
    },
  },

  androidOnePlus: {
    platformName: 'android',
    'appium:deviceName':        'Xiaomi Redmi Note 11',
    'appium:platformVersion':   '11.0',
    'appium:app':               BS_APP,
    'appium:automationName':    'UiAutomator2',
    'appium:noReset':           true,
    'appium:newCommandTimeout': 300,
    'bstack:options': {
      ...bstackOptions('Android Xiaomi', 'BStackBank Signup Test'),
      enableBiometric: true,
    },
  },
};

const capabilitiesMap = {
  androidPixel:   [allCapabilities.androidPixel],
  androidOnePlus: [allCapabilities.androidOnePlus],
  all:            [allCapabilities.android, allCapabilities.androidOnePlus],
  android:        [allCapabilities.android],
};

exports.config = {
  runner:   'local',
  hostname: 'hub-cloud.browserstack.com',
  port:     443,
  protocol: 'https',
  path:     '/wd/hub',
  user:     BS_USER,
  key:      BS_KEY,

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

  maxInstances: 2,

  capabilities: capabilitiesMap[platform] || capabilitiesMap.android,

  logLevel:               'error',
  bail:                   0,
  waitforTimeout:         15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount:   3,

  services: ['browserstack'],

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require:   ['./step-definitions/**/*.js'],
    backtrace: false,
    dryRun:    false,
    failFast:  false,
    snippets:  true,
    source:    true,
    strict:    false,
    // Exclude @qrscan from the default run — it requires PLATFORM=androidPixel
    // with enableCameraImageInjection. Run it via: PLATFORM=androidPixel npm test
    tags:      platform === 'androidPixel' ? '' : 'not @qrscan',
    timeout:   120000,
    ignoreUndefinedDefinitions: false,
  },
};
