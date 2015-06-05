(function ($) {
  module('jQuery#ScratchIt', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
      this.elem = $('#qunit-fixture');
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.scratchIt(), this.elems, 'should be chainable');
  });

  test('is ScratchIt', function () {
    expect(1);
    strictEqual(this.elems.scratchIt().text(), 'ScratchIt0ScratchIt1ScratchIt2', 'should be ScratchIt');
  });
  test('init', function(assert){
    assert.ok(this.elem.scratchIt().init);
  });
  /* 
  test('init Canvas', function(assert){
    this.elem.scratchIt().init.context.fillStyle = 'rgba(0, 0, 0, 0)';
    this.elem.scratchIt().init.context.fillRect(0, 0, 5, 5);

    assert.pixelEqual(this.elem.scratchIt().init.canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(this.elem.scratchIt().init.canvas, 0, 0, 1, 1, 1, 0);
  });

 module('Canvas', {
    setup: function () {
      var canvas, context;
      canvas = $('#qunit-fixture').find('canvas')[0];

      try {
        context = canvas.getContext('2d');
      }
      catch (e) {
        // probably no canvas support, just exit
        return;
      }

      this.canvas = canvas;
      this.context = context;
    }
  });

  test('Canvas pixels from manual fills', function (assert) {
    expect(2);
    this.context.fillStyle = 'rgba(0, 0, 0, 0)';
    this.context.fillRect(0, 0, 5, 5);

    assert.pixelEqual(this.canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(this.canvas, 0, 0, 1, 1, 1, 0);
  });
*/

} (jQuery));
