const BS_USER = process.env.BROWSERSTACK_USERNAME || '';
const BS_KEY  = process.env.BROWSERSTACK_ACCESS_KEY || '';
const BS_APP  = process.env.BS_APP_ID || '';

if (!BS_USER || !BS_KEY) {
  throw new Error(
    'BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set as environment variables.\n' +
    'Run: export BROWSERSTACK_USERNAME=<your-username> && export BROWSERSTACK_ACCESS_KEY=<your-access-key>'
  );
}

const BUILD_DATE = process.env.BS_BUILD_DATE || (process.env.BS_BUILD_DATE = new Date().toISOString().split('T')[0]);

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

  maxInstances: 2,

  capabilities: [{
    platformName: 'android',
    'appium:deviceName':        'Google Pixel 8',
    'appium:platformVersion':   '14.0',
    'appium:app':               BS_APP,
    'appium:automationName':    'UiAutomator2',
    'appium:noReset':           true,
    'appium:newCommandTimeout': 300,
    'bstack:options': {
      projectName:                'TC-Demo5',
      buildName:                  `BStackBank - ${BUILD_DATE}`,
      sessionName:                'BStackBank Test',
      debug:                      true,
      networkLogs:                true,
      deviceLogs:                 true,
      enableBiometric:            true,
      enableCameraImageInjection: true,
      interactiveDebugging: true
    },
  }],

  logLevel:               'error',
  bail:                   0,
  waitforTimeout:         15000,
  connectionRetryTimeout: 300000,
  connectionRetryCount:   1,

  services: ['browserstack'],

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require:  ['./step-definitions/**/*.js'],
    timeout:  120000,
    failFast: false,
  },
};
