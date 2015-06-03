(function ($) {
  module('jQuery#ScratchIt', {
    setup: function () {
      var canvas, context;
      this.elems = $('#qunit-fixture').children();
      canvas = document.getElementById('qunit-canvas');
      context = canvas.getContext('2d');
      this.canvas = canvas;
      this.context = context;
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.ScratchIt(), this.elems, 'should be chainable');
  });

  test('is ScratchIt', function () {
    expect(1);
    strictEqual(this.elems.ScratchIt().text(), 'ScratchIt0ScratchIt1ScratchIt2', 'should be ScratchIt');
  });

  test('has Canvas', function(assert) {
    this.context.fillStyle = 'rgba(0, 0, 0, 0)';
    this.context.fillRect(0, 0, 5, 5);
  
    assert.pixelEqual(this.canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(this.canvas, 0, 0, 1, 1, 1, 0);
  });
}(jQuery));
