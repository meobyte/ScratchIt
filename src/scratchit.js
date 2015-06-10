/*
 * 
 * 
 *
 * Copyright (c) 2015 Michelle Anderson
 * Licensed under the MIT license.
 */
; (function ($, window, document, undefined) {
  var x, y;
  var defaults = {
    color: "#C4B178"
  };

  /**
  * ScratchIt
  * @constructor
  * @param {Object} element
  * @param {Object} options (Optional)
  */
    function ScratchIt(element, options) {
        this.$element = $(element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = 'scratchIt';

        this.isScratching === undefined && this.init();

    }

    ScratchIt.prototype = {

        init: function () {
          
            this.canvas = this.$element.find('canvas');
            this.context = this.canvas[0].getContext('2d');
            
            var context = this.context; 
            this.context.fillStyle = this.options.color;
            this.context.fillRect(0,0, this.canvas[0].width, this.canvas[0].height);
            this.totalPixels = this.canvas[0].width * this.canvas[0].height;
            if (this.$element.find('img').length > 1) {
              this.scratchedImage = this.$element.find('img').first();
              var scratchedImage = this.scratchedImage[0];
            
              scratchedImage.onload = function(){
                context.drawImage(scratchedImage, 0, 0);

              };
            } 
            

            this.context.strokeStyle = "#F00";
            this.context.lineJoin = "round";
            this.context.lineCap = "round";
            this.context.lineWidth = 50;
            
            this.offsetxy  = this.canvas.offset();
            
            this.canvas.on({
              'mousedown.scratchit' : $.proxy(this.onDown, this),
              'mousemove.scratchit' : $.proxy(this.onMove, this),
              'mouseup.scratchit' : $.proxy(this.onUp, this)
            });
        },
        
        onDown: function(e) {
          
          var context = this.context;
          context.globalCompositeOperation = "destination-out";
          context.beginPath();
          x = e.pageX;
          y = e.pageY - this.offsetxy.top;
          context.moveTo(x, y);
          this.isScratching = true;
          this.percentScratched();

        },
        onMove: function(e) {
          var context = this.context;
          if (!this.isScratching) {return;}
          x = e.pageX;
          y = e.pageY - this.offsetxy.top;
          context.lineTo(x, y);
          context.stroke();
          this.percentScratched();
        },
        onUp: function () {
          this.isScratching = false;

        },
        
        onLoad: function(){
          
        },
        
        percentScratched: function () {
          var clearedPixels = 0,
          imageData = this.context.getImageData(0,0, this.canvas[0].width, this.canvas[0].height),
          imageDataLength = imageData.data.length;
          
          for (var i=0; i < imageDataLength; i=i+4) {
            //the alpha of eace pixel is every 4th value
            if (imageData.data[i+3] === 0) {
              clearedPixels++;

            }
          }
          console.log((clearedPixels / this.totalPixels) * 100);
          
        }
        
        
    };

  $.fn.scratchIt = function (options) {
    return this.each(function () {
      if (!$.data(this, 'scratchIt')) {
        $.data(this, 'ScratchIt',
                    new ScratchIt(this, options));
      }

    });
  };
})(jQuery, window, document);
