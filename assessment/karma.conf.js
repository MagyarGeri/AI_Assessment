module.exports = function(config) {
  config.set({

    // Base path relative to this config file
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // Files/patterns to load in the browser
    files: [
      // Include all spec files and source files handled by Angular CLI
    ],

    // Preprocessors to apply (handled by Angular CLI)
    preprocessors: {},

    // Test reporters
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],

    // Web server port
    port: 9876,

    // Enable colors in the output (reporters and logs)
    colors: true,

    // Log level
    logLevel: config.LOG_INFO,

    // Disable watching files and rerun automatically
    autoWatch: false,

    // Start these browsers
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode: run once and exit
    singleRun: true,

    // Concurrency level (how many browsers to start simultaneously)
    concurrency: Infinity,

    // Timeout settings for CI stability
    captureTimeout: 120000,          // 2 minutes
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60000,

    // JUnit reporter configuration for CI compatibility
    junitReporter: {
      outputDir: 'test-results',        // Output folder for junit reports
      outputFile: 'junit-report.xml',   // Single output file
      useBrowserName: false              // Do not append browser name to file
    },

    // Coverage reporter configuration
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: '.' },    // Human-readable HTML report
        { type: 'lcov', subdir: '.', file: 'lcov.info' },  // For coverage tools
        { type: 'text-summary' }              // Summary in console
      ]
    },

    // Plugins explicitly listed (required)
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: true,
      }
    },
  });
};

