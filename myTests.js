// test for karel
  test('karel.init()', function() { 
    karel.init();
    //ok( karel.init(), 'Initialisation');    
    equals( karel.direction, "east" , 'karel facing east'); 
    equals( karel.position[0], 0 , 'karel (x) in initial position 0'); 
    equals( karel.position[1], 0 , 'karel (y) in initial position 0'); 
    ok( !karel.leftIsClear(), 'Left is not clear');
    ok( karel.leftIsBlocked(), 'Left is not clear');
    ok( karel.frontIsClear(), 'Front is clear');
    ok( !karel.frontIsBlocked(), 'Front is not blocked');
    ok( karel.rightIsClear(), 'Right is clear');
    ok( !karel.rightIsBlocked(), 'Right is not blocked');
})  

test('karel.move()', function() { 
    karel.move();
    //ok( karel.move(), 'move Karel');    
    equals( karel.direction, "east" , 'karel still facing east'); 
    equals( karel.position[0], 1 , 'karel (x) has moved one spot'); 
    equals( karel.position[1], 0 , 'karel (y) not in position'); 
})  

test('karel.pickBeeper()', function() { 
    karel.move();
    ok( karel.beepersPresent(), 'Beeper is Present');
    ok( !karel.noBeepersPresent(), 'Not no Beeper is Present');
    karel.pickBeeper();
    ok( !karel.beepersPresent(), 'Beeper not Present');
    ok( karel.noBeepersPresent(), 'no Beepers Present');
})  

test('karel.turnLeft()', function() { 
    karel.move();
    ok( karel.frontIsBlocked(), 'Karel blocked by Obstacle');
    karel.turnLeft();
    ok( karel.facingNorth(), 'Karel is facing North');
})  

test('karel.putBeeper()', function() { 
    ok( !karel.beepersPresent, 'No beepers');
    karel.putBeeper();
    ok( karel.beepersPresent, 'Yes beepers');
}) 


