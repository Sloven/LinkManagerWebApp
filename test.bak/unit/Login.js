describe("A suite is just a function", function() {

  //beforeEach(module("LinkManager"));

  //   var cntrl, stateParams;

  //   beforeEach(inject(function(_$controller_) {
	// 	cntrl = _$controller_;
	// }));

  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
    
  });
});