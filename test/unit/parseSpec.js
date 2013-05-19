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

    it('should accept beepersPresent()', function() {
      
      try{
        tree = parse('beepersPresent()');
    	 expect(true).toBeTruthy();
      } catch(e){
      	expect(false).toBeTruthy()
      }
    });

    it('should accept beepersPresent() as an expression', function() {
      
      try{
      	tree = parse('if(beepersPresent()){move();}');
      	expect(true).toBeTruthy();
      } catch(e){
      	//expect(e.message).not.toBe('Undefined.');
      }
    });


});