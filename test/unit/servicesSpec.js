'use strict';

//
// test/unit/servicesSpec.js
//
describe("Unit: Testing Services", function() {

  beforeEach(function(){
    this.addMatchers({
        toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
      });
  });

  beforeEach(angular.mock.module('myApp'));

  describe('myKarel service' , function(){

    it('should contain an myKarel service', inject(function(myKarel) {
      var myNewKarel;
      expect(myKarel).not.toEqual(null);
      expect(angular.isFunction(myKarel.init)).toBeTruthy();
      myNewKarel = myKarel.init([0,0,1,0,'X',1,0]);
      myNewKarel.init();
      expect(myNewKarel.position).toEqual([0, 0]);
    }));

  });

  describe('world service' , function(){

    it('should contain an world service', inject(function(world) {
      var myWorld;
      expect(world).not.toEqual(null);
      expect(angular.isFunction(world.setWorld)).toBeTruthy();
      myWorld = world.setWorld();
      expect(myWorld[0]).toEqual([0,0,1,0,'X',1,0]);
    }));
  });


});