'use strict';

describe('Test mainCtrl', function(){

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    // load the controller's module
    beforeEach(angular.mock.module('myApp'));

    describe('setup', function(){

        var scope, 
            ctrl,            
            mockEditor = function(){
                return {
                    getValue: function() {          
                        return "move();";
                    },
                    setValue: function() {
                        return true;
                    }
                };
            },
            editor;  

        beforeEach(inject(function( $rootScope, $controller, myKarel, world ) {
            editor = mockEditor();
            scope = $rootScope.$new();
            ctrl = $controller( 'mainCtrl', {$scope: scope });
        }));

        iit('should initialise world and karel', function() {
            
            //scope.world = world.setWorld();
            //scope.karel = myKarel.init(scope.world);
            //scope.karel.init();
            dump(scope)
        });



        describe("Module A", function(){
            // test for karel
            it('should initialise karel', function() { 
                expect( scope.karel.direction).toBe("east");
                //equals( myKarel.position[0], 0 , 'karel (x) in initial position 0'); 
                //equals( myKarel.position[1], 0 , 'karel (y) in initial position 0'); 
                //ok( !myKarel.leftIsClear(), 'Left is not clear');
                //ok( myKarel.leftIsBlocked(), 'Left is blocked');
                //ok( myKarel.frontIsClear(), 'Front is clear');
                //ok( !myKarel.frontIsBlocked(), 'Front is not blocked');
                //ok( myKarel.rightIsClear(), 'Right is clear');
                //ok( !myKarel.rightIsBlocked(), 'Right is not blocked');
            });  
            /*
            test('karel.move()', function() { 
                myKarel.move();
                //ok( karel.move(), 'move Karel');    
                equals( myKarel.direction, "east" , 'karel still facing east'); 
                equals( myKarel.position[0], 1 , 'karel (x) has moved one spot'); 
                equals( myKarel.position[1], 0 , 'karel (y) not in position'); 
            })  

            test('karel.pickBeeper()', function() { 
                myKarel.move();
                ok( myKarel.beepersPresent(), 'Beeper is Present');
                ok( !myKarel.noBeepersPresent(), 'Not no Beeper is Present');
                myKarel.pickBeeper();
                ok( !myKarel.beepersPresent(), 'Beeper not Present');
                ok( myKarel.noBeepersPresent(), 'no Beepers Present');
            })  

            test('karel.turnLeft()', function() { 
                myKarel.move();
                ok( myKarel.frontIsBlocked(), 'Karel blocked by Obstacle');
                myKarel.turnLeft();
                ok( myKarel.facingNorth(), 'Karel is facing North');
            })  

            test('karel.putBeeper()', function() { 
                ok( !myKarel.beepersPresent(), 'No Beepers present');
                myKarel.putBeeper();
                ok( myKarel.beepersPresent(), 'yes beepers');
            }) */
        }); // Module A

    }); //setup

}); //test mainCtrl
