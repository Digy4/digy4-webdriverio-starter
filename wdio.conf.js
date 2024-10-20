// Copyright (c) 2022 Digy4 Inc. and its affiliates. All rights reserved.
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Any illegal or unauthorized usage or violations will result in immediate legal action.

const { DigyRunnerService } = require('@digy4/digyrunner-wdio/DigyRunnerService');
const video = require('wdio-video-reporter');

const wdioParallel = require('wdio-cucumber-parallel-execution');
// The below module is used for cucumber html report generation
const reporter = require('cucumber-html-reporter');
const fs = require("fs");
const currentTime = new Date().toJSON().replace(/:/g, "-");
const { join } = require('node:path');

const sourceSpecDirectory = `./features`;
const tmpSpecDirectory = `./features-tmp`;
const parallelExecutionReportDirectory = `.`;

let featureFilePath = `${sourceSpecDirectory}/**/expedia.feature`;

const PARALLEL_EXECUTION = false;
//const PARALLEL_EXECUTION = false;

if (PARALLEL_EXECUTION) {
    featureFilePath = `${tmpSpecDirectory}/**/*.feature`;
}

const setupParallelExecution = () => {
    // If parallel execution is set to true, then create the Split the feature files
    // And store then in a tmp spec directory (created inside `the source spec directory)
    wdioParallel.performSetup({
        sourceSpecDirectory: sourceSpecDirectory,
        tmpSpecDirectory: tmpSpecDirectory,
        cleanTmpSpecDirectory: true
    });
};

const digyRunnerConfig = {
    lob: "digydashboard",
    application: "checkout",
    release: "release",
    projectName: "WdioMocha",
    suiteName: "Regression",
    teamName: "Digy4",
    appVersion: "2.0",
    environment: "test",
    moduleName: "SomeModuleName",
    tester: "Joe Bloggs",
    ba: "Joe Bloggs",
    developer: "Joe Bloggs",
    region: "us-east-2",
    protocol: 'https',
    strictSSL: false,
    port: 443,
    resultsSummaryUrl: 'https://3qsmhuqr59.execute-api.us-east-1.amazonaws.com/digy4-test/v3/resultsSummary',
    logsUploadBaseUrl: 'https://3qsmhuqr59.execute-api.us-east-1.amazonaws.com/digy4-test/getPresignedUrl',
    projectPlanUrl: 'https://z85m9oisq5.execute-api.us-east-1.amazonaws.com/test/users/project-plan-details',
    clientId: "d9dcd234876b01884e4c955bff981122:4265abcd95c634944621bb3462a4aff6",
    clientSecret: "3ae857e2028da33c1387d9a9b3864f92:b1debc12b3feca57275acc624fcda4ec",
    testType: 'MOBILE_APP'
};

exports.config = {
    services: [
        [new DigyRunnerService(digyRunnerConfig)],
        //'edgedriver',
        //'geckodriver',
        [
            'appium',
            {
                // This will use the globally installed version of Appium
                // command: 'appium',
                args: {
                    // This is needed to tell Appium that we can execute local ADB commands
                    // and to automatically download the latest version of ChromeDriver
                    relaxedSecurity: true,
                    // Write the Appium logs to a file in the root of the directory
                    log: './logs/appium.log',
                },
            },
        ],
    ],
    /*before: async ()=> {
        console.log('inside appium before in wdio conf...');
        // Only update the setting for Android, this is needed to reduce the timeout for the UiSelector locator strategy,
        // which is also used in certain tests, so it will not wait for 10 seconds if it can't find an element
        if (driver.isAndroid){
            await driver.updateSettings({
                // This reduces the timeout for the UiUiSelector from 10 seconds to 3 seconds
                waitForSelectorTimeout: 3 * 1000
            });
        }
    },*/
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [
        //`${featureFilePath}`,
        '/Users/skhan/DEV/digy4/digy4-webdriverio-starter/features/login.feature',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 3,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [
        /*{
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 3,
            browserName: process.env.BROWSER_NAME || 'chrome',
            //browserName: 'chrome',
            "goog:loggingPrefs": {
                'driver': 'INFO',
                'browser': 'DEBUG',
                'performance': 'INFO'
              },

              'goog:chromeOptions': {
                  args: ['headless','disable-gpu'],
              },
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
            //outputDir: `./${process.pid}`,
            excludeDriverLogs: ['bugreport', 'javascript'],
        },*/
        {
            // The defaults you need to have in your config
            platformName: "Android",
            "wdio:maxInstances": 1,
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here

            //
            // NOTE: Change this name according to the Emulator you have created on your local machine
            "appium:deviceName": "nightwatch-android-11",
            //
            // NOTE: Change this version according to the Emulator you have created on your local machine
            "appium:platformVersion": "11.0",
            "appium:orientation": "PORTRAIT",
            "appium:automationName": "UiAutomator2",
            // The path to the app
            "appium:app": join(
                process.cwd(),
                "apps",
                //
                // NOTE: Change this name according to the app version you downloaded
                "android.wdio.native.app.v1.0.8.apk"
            ),
            "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
            "appium:newCommandTimeout": 240,
        }
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    //baseUrl: '',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 20000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
			'cucumberjs-json',
			[video, {
				saveAllVideos: true,       // If true, also saves videos for successful test cases
				videoSlowdownMultiplier: 5, // Higher to get slower videos, lower for faster videos [Value 1-100]
				videoFormat: 'mp4'
			}],
		],


    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./features/step-definitions/**/*.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

	onPrepare: (config, capabilities) => {
		console.log('DigyRunnerService: Inside onPrepare...');
		//removeSync(parallelExecutionReportDirectory);
		if (PARALLEL_EXECUTION) {
			setupParallelExecution();
		}
	}

}
