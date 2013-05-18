/*global describe, it, beforeEach, expect, inject, angular*/
describe('Test mainCtrl', function () {
    'use strict';
    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    // load the controller's module
    beforeEach(angular.mock.module('myApp'));

    describe('setup', function () {
        var scope,
            ctrl,
            mockEditor = function () {
                return {
                    getValue: function () {
                        return "move();";
                    },
                    setValue: function () {
                        return true;
                    }
                };
            },
            editor;

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('mainCtrl', {$scope: scope, localStorage: undefined, editor: mockEditor() });
        }));

        it('should initialise world', function () {
            expect(scope.world[0]).toEqualData([ 0, 0, 1, 0, 'X', 1, 0 ]);
        });

        it('should initialise karel', function () {
            expect(scope.karel).toBeDefined();
            expect(scope.karel.direction).toBe("east");
            expect(scope.karel.position).toEqualData([0, 0]);
        });

        describe("karel ...", function () {
            // test for karel
            it('should be aware of her surroundings', function () {
                expect(scope.karel.leftIsClear()).toBe(false);
                expect(scope.karel.leftIsBlocked()).toBe(true);
                expect(scope.karel.frontIsClear()).toBe(true);
                expect(scope.karel.frontIsBlocked()).toBe(false);
                expect(scope.karel.rightIsClear()).toBe(true);
                expect(scope.karel.rightIsBlocked()).toBe(false);
            });
            
            it('should be able to move around', function () {
                scope.karel.move();
                expect(scope.karel.direction).toBe("east");
                expect(scope.karel.position).toEqualData([1, 0]);
            });

            it('should be able to pick up beepers', function () {
                scope.karel.move();
                scope.karel.move();
                expect(scope.karel.beepersPresent()).toBe(true);
                expect(scope.karel.noBeepersPresent()).toBe(false);
                expect(scope.karel.beepers).toBe(10);
                scope.karel.pickBeeper();
                expect(scope.karel.beepersPresent()).toBe(false);
                expect(scope.karel.noBeepersPresent()).toBe(true);
                expect(scope.karel.beepers).toBe(11);
            });

            it('should be able to change her direction', function () {
                scope.karel.move();
                scope.karel.move();
                scope.karel.move();
                expect(scope.karel.frontIsBlocked()).toBe(true);
                scope.karel.turnLeft();
                expect(scope.karel.facingNorth()).toBe(true);
            });

            it('should be able to place a beeper', function () {
                expect(scope.karel.beepersPresent()).toBe(false);
                scope.karel.putBeeper();
                expect(scope.karel.beepersPresent()).toBe(true);
            });

        }); // karel 
    }); //setup

}); //test mainCtrl
