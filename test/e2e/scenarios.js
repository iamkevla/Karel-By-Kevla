'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html');
  });


  describe('play', function() {


    it('should render view', function() {
      expect(element('#karelinfo p:first').text()).
        toMatch("Position: 0, 0");
    });

  });



});
