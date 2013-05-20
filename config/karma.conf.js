basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'js/**/*.js',
  'test/unit/**/*.js'
];

reporters = ['progress'];

autoWatch = true;

browsers = ['PhantomJS'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

singleRun = false;
