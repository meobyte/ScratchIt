/*
 * 
 * 
 *
 * Copyright (c) 2015 Michelle Anderson
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.ScratchIt = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('ScratchIt' + i);
    });
  };
}(jQuery));
