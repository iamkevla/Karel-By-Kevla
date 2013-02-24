myApp.value('localStorage', window.localStorage);

myApp.factory('myKarel', function(){
	return {
  		init: function(world){
  			return { 
				init: function(pos,beeps,dir){
					this.position = pos || [0,0];
					this.beepers = beeps || 10;
					this.direction = dir || 'east';		
				}, //init
				move: function(){
					if(this.frontIsClear()){
						switch(this.direction){
							case "east":
								this.position[0]++;
								break;
							case "north":
								this.position[1]--;
								break;
							case "west":
								this.position[0]--;
								break;
							case "south":
								this.position[1]++;
								break;	
						} //switch
					} else {
						throw "karel cannot perform request! - path not clear";
					}
				}, //move
				turnLeft: function(){
					switch(this.direction){
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
				putBeeper: function(){
					if ( this.beepers > 0){
						world[this.position[1]][this.position[0]]++;
						this.beepers--;
					} else { 
						throw "karel cannot perform request! - no beepers in bag";
					}
				},//putBeeper
				pickBeeper: function(){
					if (world[this.position[1]][this.position[0]] > 0) {
						world[this.position[1]][this.position[0]]--;
						this.beepers++;
					} else {
						throw "karel cannot perform this request! - no beepers";
					}
				},//pickBeeper
				play: function(){
					var txt;
					with(this){
						try {
							eval(editor.getValue());
						} //try
						catch(err) {
							txt="There was an error on this page.\n\n";
							txt+="Error description: " + err.message + "\n\n";
							txt+="Click OK to continue.\n\n";
							alert(txt);
						} //catch
					} //with
				},//play
				frontIsClear: function(){
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
				frontIsBlocked: function(){
					return !this.frontIsClear();
				},
				leftIsClear: function(){
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
				leftIsBlocked: function(){
					return !this.leftIsClear();
				},
				rightIsClear: function(){
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
				rightIsBlocked: function(){
					return !this.rightIsClear();
				},
				beepersPresent: function(){
					if ( world[this.position[1]][this.position[0]] > 0 ){ 
						return true;
					} else {
						return false;
					}
				},
				noBeepersPresent: function(){
					return !this.beepersPresent();
				},
				facingNorth: function(){
					if (this.direction === 'north') {
						return true;
					} else {
						return false;
					}
				},
				notFacingNorth: function(){
					return !this.facingNorth;
				},
				facingSouth: function(){
					if (this.direction === 'south') {
						return true;
					} else {
						return false;
					}
				},
				notFacingSouth: function(){
					return !this.facingSouth;
				},
				facingEast: function(){
					if (this.direction === 'east') {
						return true;
					} else {
						return false;
					}
				},
				notFacingEast: function(){
					return !this.facingEast;
				},
				facingWest: function(){
					if (this.direction === 'west') {
						return true;
					} else {
						return false;
					}
				},
				notFacingWest: function(){
					return !this.facingWest;
				}
			};//karel 
  		}
  	};
});

myApp.factory('world', function(){
 
	return {
		setWorld : function(w){
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

