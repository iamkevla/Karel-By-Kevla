/*services*/
/*global myApp, window */
/*jslint es5: false, sloppy: true, evil: false */

myApp.value('localStorage', window.localStorage);
myApp.value('editor', window.editor);

myApp.factory('myKarel', function () {
	return {
        init: function (world) {
            return {
				init: function (pos, beeps, dir) {
					this.position = pos || [0, 0];
					this.beepers = beeps || 10;
					this.direction = dir || 'east';
				}, //init
				move: function () {
					if (this.frontIsClear()) {
                        switch (this.direction) {
                        case "east":
                            this.position[0] = this.position[0] + 1;
                            break;
                        case "north":
                            this.position[1] = this.position[1] - 1;
                            break;
                        case "west":
                            this.position[0] = this.position[0] - 1;
                            break;
                        case "south":
                            this.position[1] = this.position[1] + 1;
                            break;
                        } //switch
					} else {
						throw "karel cannot perform request! - path not clear";
					}
				}, //move
				turnLeft: function () {
					switch (this.direction) {
                    case "east":
                        this.direction = "north";
                        break;
                    case "north":
                        this.direction = "west";
                        break;
                    case "west":
                        this.direction = "south";
                        break;
                    case "south":
                        this.direction = "east";
                        break;
					}//switch
				}, //turnLeft
				putBeeper: function () {
					if (this.beepers > 0) {
						world[this.position[1]][this.position[0]] = world[this.position[1]][this.position[0]] + 1;
						this.beepers = this.beepers - 1;
					} else {
						throw "karel cannot perform request! - no beepers in bag";
					}
				},//putBeeper
				pickBeeper: function () {
					if (world[this.position[1]][this.position[0]] > 0) {
						world[this.position[1]][this.position[0]] = world[this.position[1]][this.position[0]] - 1;
						this.beepers = this.beepers + 1;
					} else {
						throw "karel cannot perform this request! - no beepers";
					}
				},//pickBeeper
				play: function () {
                    var that = this;
					with (that) {
                        try {
                        	eval(editor.getValue());
                       	} catch (e) {
                       		alert('Error: ' + e.message );
                        }							
					} //with
				},//play
				frontIsClear: function () {
					var front = [];
					switch(this.direction){
                    case "east":
                        front = [this.position[0]+1,this.position[1]];
                        break;
                    case "west":
                        front = [this.position[0]-1,this.position[1]];
                        break;
                    case "north":
                        front = [this.position[0],this.position[1]-1];
                        break;
                    case "south":
                        front = [this.position[0],this.position[1]+1];
                        break;
					}
					//if we have reached end of world or a wall return false
					if ( front[1] < 0 || front[1] >= world.length || front[0] < 0 || front[0] >= world[front[1]].length ||  world[front[1]][front[0]] === 'X' ){
						return false;
					} 
					return true;
				},
				frontIsBlocked: function () {
					return !this.frontIsClear();
				},
				leftIsClear: function () {
					var left = [];
					switch(this.direction){
                    case "east":
                        left = [this.position[0],this.position[1]-1];
                        break;
                    case "west":
                        left = [this.position[0],this.position[1]+1];
                        break;
                    case "north":
                        left = [this.position[0]-1,this.position[1]];
                        break;
                    case "south":
                        left = [this.position[0]+1,this.position[1]];
                        break;
					}
					//if we have reached end of world or a wall return false
					if ( left[1] < 0 || left[1] >= world.length || left[0] <0 || left[0] >= world[left[1]].length ||  world[left[1]][left[0]] === 'X' ){
						return false;
					} 
					return true;
				},
				leftIsBlocked: function () {
					return !this.leftIsClear();
				},
				rightIsClear: function () {
					var right = [];
					switch(this.direction){
                    case "east":
                        right = [this.position[0],this.position[1]+1];
                        break;
                    case "west":
                        right = [this.position[0],this.position[1]-1];
                        break;
                    case "north":
                        right = [this.position[0]+1,this.position[1]];
                        break;
                    case "south":
                        right = [this.position[0]-1,this.position[1]];
                        break;
					}
					//if we have reached end of world or a wall return false
					if ( right[1] < 0 || right[1] >= world.length || right[0] <0 || right[0] >= world[right[1]].length ||  world[right[1]][right[0]] === 'X') {
						return false;
					} 
					return true;
				},
				rightIsBlocked: function () {
					return !this.rightIsClear();
				},
				beepersPresent: function () {
					return ( world[this.position[1]][this.position[0]] > 0 );
				},
				noBeepersPresent: function () {
					return !this.beepersPresent();
				},
				facingNorth: function () {
					return (this.direction === 'north');
				},
				notFacingNorth: function () {
					return !this.facingNorth;
				},
				facingSouth: function () {
					return (this.direction === 'south');
				},
				notFacingSouth: function () {
					return !this.facingSouth;
				},
				facingEast: function () {
					return (this.direction === 'east');
				},
				notFacingEast: function () {
					return !this.facingEast;
				},
				facingWest: function () {
					return (this.direction === 'west');
				},
				notFacingWest: function () {
					return !this.facingWest;
				}
			};//karel 
  		}
  	};
});

myApp.factory('world', function () {
 
	return {
		setWorld : function (w) {
			switch(w){
            default:	
                return ([
                    [0,0,1,0,'X',1,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    ['X',0,0,0,1,0,0],
                    [1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,1,0,0,0,0,0]
                ]);
			}
		}
	};


});


if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Transform a token object into an exception object and throw it.

Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};