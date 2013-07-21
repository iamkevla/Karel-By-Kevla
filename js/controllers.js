/* Controllers */
/*global myApp */

myApp.controller('mainCtrl', function ($scope, myKarel, localStorage, world, editor) {
    'use strict';
	var setWorld, snippet;


	snippet  = "// help karel (K) move around his world avoiding obstacles (X) and collecting beepers.\n";
	snippet += "var moveAndPick = function(){\n";
	snippet += "	move();\n";
	snippet += "	while(beepersPresent()){\n";
	snippet += "       pickBeeper();\n";
	snippet += "   }\n";
	snippet += "};\n";
	snippet += "\n";
	snippet += "var turnRight = function(){\n";
	snippet += "  turnLeft();\n";
	snippet += "  turnLeft();\n";
	snippet += "  turnLeft();\n";
	snippet += "};\n";
	snippet += "\n";
	snippet += "var turnAround = function(){\n";
	snippet += "  if( facingEast() ){\n";
	snippet += "    turnRight();\n";
	snippet += "    moveAndPick();\n";
	snippet += "    turnRight();\n";
	snippet += "  } else {\n";
	snippet += "    turnLeft();\n";
	snippet += "    moveAndPick();\n";
	snippet += "    turnLeft();\n";
	snippet += "  }\n";
	snippet += "};\n";
	snippet += "\n";
	snippet += "var traverseRow = function(){\n";
	snippet += "  while( frontIsClear() ){ moveAndPick() };\n";
	snippet += "};\n";
	snippet += "\n";
	snippet += "var run = (function(){\n";
	snippet += "	traverseRow();\n";
	snippet += "	while( (facingEast() && rightIsClear()) || (facingWest() && leftIsClear()) ){\n";
    snippet += "		turnAround();\n";
    snippet += "		traverseRow();\n";
    snippet += "    }\n";
	snippet += "})();\n";

	if (localStorage !== undefined) {
		editor.setValue(localStorage.getItem('mycode') || snippet);
	} else {
		editor.setValue(snippet);
	}

	$scope.play = function () {
		if (localStorage !== undefined) {
			localStorage.setItem('mycode', editor.getValue());
		}
		$scope.karel.play();
	};

	$scope.init = function () {
		$scope.karel.init();
	};

	$scope.world = world.setWorld();
	$scope.karel = myKarel.init($scope.world);
	$scope.karel.init();

});