<!--
 $(document).ready(function(){

	var world = [[0,0,1,0,'X',0,0],
				 [0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0],
				 [0,0,0,0,1,0,0],
				 [0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0],
				 [0,1,0,0,0,0,0]];

	var karel = { 
		name:"Karel",
		position:[0,0],
		beepers: 10,
		direction: "east",
		init: function(){
			this.position = [0,0];
			this.beepers = 10;
			this.direction = 'east';
			drawWorld($('#myWorld'));
		}, //init
		move:function(){
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
				drawWorld($('#myWorld'));
			} else {
				//raise error
				throw "karel cannot perform request! - path not clear";
			}
		}, //move
		turnLeft:function(){
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
			drawWorld($('#myWorld'));
		}, //turnLeft
		putBeeper: function(){
			if ( this.beepers > 0){
				world[this.position[1]][this.position[0]]++;
				this.beepers--;
				drawWorld($('#myWorld'));
			} else { 
				throw "karel cannot perform this request! - no beepers in bag";
			}
		},//putBeeper
		pickBeeper: function(){
			if (world[this.position[1]][this.position[0]] > 0) {
				world[this.position[1]][this.position[0]]--;
				this.beepers++;
				drawWorld($('#myWorld'));
			} else {
				throw "karel cannot perform this request! - no beepers";

			}
		},//pickBeeper
		play: function(){
			localStorage.setItem('mycode', editor.getValue());
			with (this) {
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
		},
	};//karel

	$('#play').click(function(){
		karel.play();
	});

	$('#init').click(function(){
		karel.init();
	});

	
	var drawWorld = function(elem){
		elem.html(''); // clear div
		var content = "<div id='matrix'><table>";
		//loop over world
		for ( y in world ){
			content += "<tr style='height:30px;'>";
			for ( x in world[y] )	{
				//if position is KAREL else draw world
				if( x == karel.position[0] && y == karel.position[1] ){		
					content += "<td class='karel' >K</td>";
				} else {
					content += "<td>" + world[y][x] + "</td>";
				}
			}	
			content += "</tr>";	
		}
		content += "</table></div>";
		content += "<div id='karelinfo'>";
		content += "<p>Position: " + karel.position[0] + ", " + karel.position[1] + "<p>";
		content += "<p>Direction: " + karel.direction + "<p>";
		content += "<p>Beepers: " + karel.beepers + "<p>";
		content += "</div>";
		elem.append(content);
	}; //drawWorld

	var snippet  = "/* help karel (K) move around his world avoiding obstacles (X) and collecting beepers. */\n";
	snippet += "var moveAndPick = function(){\n";
	snippet += "	move();\n";
  	snippet += "		while(beepersPresent()){\n";
  	snippet += "  			pickBeeper();\n";
  	snippet += "	}\n";
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
  	snippet += "	}\n";
	snippet += "})();\n";


	var foldFunc = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	  	mode: "javascript",
	  	lineNumbers: true,
	  	lineWrapping: true,
	  	onGutterClick: foldFunc,	
	  	onCursorActivity: function() {
	    	editor.setLineClass(hlLine, null);
	    	hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
	  	}
	});
	var hlLine = editor.setLineClass(0, "activeline");
	
	editor.setValue(localStorage.getItem('mycode') || snippet);

	karel.init();

});//document ready
-->