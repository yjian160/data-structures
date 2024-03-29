describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree(7);
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });
  
  // Bare minimum requirements additional test
  it('should allow duplicates children of a tree', function() {
    tree.addChild(5);
    tree.addChild(5);
    expect(tree.children.every(function(x){return x.value === 5})).to.equal(true);
  });
  // Advanced Content removeFromParent test
  it('should disassociate the tree with its parent in both directions', function() {
    tree.addChild(5);
    tree.addChild(6);
    var child = tree.children[1];
    child.removeFromParent();
    expect(tree.contains(6)).to.equal(false);
    expect(child.contains(6)).to.equal(true);
    expect(child.parent).to.equal(null);
    expect(tree.children[0].parent.value).to.equal(7);
  });

  it('traverse should execute a callback on every value contained in the tree', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    
    tree.traverse(function(val) {
      this.value  = 10 * val;
    });

    expect(tree.contains(50)).to.equal(true);
    expect(tree.contains(60)).to.equal(true);
  });
});
