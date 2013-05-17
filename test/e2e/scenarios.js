/*global describe, beforeEach, browser, it , expect, element*/
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function () {
    'use strict';
    beforeEach(function () {
        browser().navigateTo('/index.html');
    });


    describe('play', function () {
    
    
        it('should render view', function () {
            expect(element('#karelinfo p:first').text()).toMatch("Position: 0, 0");
        });

        it('should be able to run', function () {
            element('button:first').click();
            expect(element('#karelinfo p:first').text()).not().toEqual("Position: 0, 0");
        });
    
    
        it('should be able to reset', function () {
            element('button:last').click();
            expect(element('#karelinfo p:first').text()).toMatch("Position: 0, 0");
        });

    });

});