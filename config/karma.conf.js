basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular/angular.js',
  'test/lib/angular/angular-mocks.js',
  'js/*.js',
  'test/unit/*.js'
];

reporters = ['dots','junit'];

//logLevel = 'LOG_DEBUG';

autoWatch = false;

browsers = ['PhantomJS'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

singleRun = true;
