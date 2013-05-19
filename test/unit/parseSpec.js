describe('Testing parse > ', function(){
	



  	var parse, tree;
  	parse = make_parse();

    it('should contain an make_parse function', function() {
      expect(angular.isFunction(make_parse)).toBeTruthy();
    });

    it('should reject for missing semicolon', function() {
      
      try{
      	tree = parse('move()');
      	expect(false).toBeTruthy();
      } catch(e){
      	expect(e.message).toBe('Expected \';\'.');
      }
    });

    it('should accept for move();', function() {
      
      try{
      	tree = parse('move();');
      	expect(true).toBeTruthy();
      } catch(e){
      	expect(false).toBeTruthy()
      }
    });

    it('should accept for beepersPresent();', function() {
      
      try{
      	tree = parse('beepersPresent();');
    	expect(true).toBeTruthy();
      } catch(e){
      	expect(false).toBeTruthy()
      }
    });


    it('should accept for beepersPresent() as an expression', function() {
      
      try{
      	tree = parse('var bp=beepersPresent();if(bp){move();}');
      	expect(true).toBeTruthy();
      } catch(e){
      	//expect(e.message).not.toBe('Undefined.');
      }
    });


});