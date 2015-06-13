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
    color: "#C4B178",
    goal: 100,
    brush: 15
    
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
              var scratchedImage = new Image();
              scratchedImage.onload = function(){
                context.drawImage(scratchedImage, 0, 0);
              };
              scratchedImage.src = this.$element.find('img').attr("src");
              
            } 
            

            this.context.strokeStyle = "#FFF";
            this.context.lineJoin = "round";
            this.context.lineCap = "round";
            this.context.lineWidth = this.options.brush;
            
            this.offsetxy  = this.canvas.offset();
            
            this.canvas.on({
              'mousedown.scratchit' : $.proxy(this.onDown, this),
              'mousemove.scratchit' : $.proxy(this.onMove, this),
              'mouseup.scratchit' : $.proxy(this.onUp, this)
            });
        },
        
        onDown: function(e) {
          var context = this.context;
          x = e.pageX - this.offsetxy.left;
          y = e.pageY - this.offsetxy.top;
          context.globalCompositeOperation = "destination-out";
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x-1, y);
          context.stroke();
          this.isScratching = true;
          this.percentScratched();

        },
        onMove: function(e) {
          var context = this.context;
          if (!this.isScratching) {return;}
          x = e.pageX - this.offsetxy.left;
          y = e.pageY - this.offsetxy.top;
          context.lineTo(x, y);
          context.stroke();
          this.percentScratched();
        },
        onUp: function () {
          this.percentScratched();
          this.isScratching = false;
          
        },
        
        clear: function () {
          
        },
        
        onLoad: function(){
          
        },
        
        percentScratched: function () {

          var imageData = this.context.getImageData(0,0, this.canvas[0].width, this.canvas[0].height),
          imageDataLength = imageData.data.length;
          var now = Date.now();
          var clearedPixels = 0;
          
          if (!this.lastEvent || now - this.lastEvent >= 200) {
            for (var i=0; i < imageDataLength; i=i+4) {
              //the alpha of eace pixel is the 4th value
              if (imageData.data[i+3] === 0) {
                clearedPixels++;
  
              }
            }
            console.log((clearedPixels / this.totalPixels) * 100);
            this.lastEvent = now;
          }
          
          
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
