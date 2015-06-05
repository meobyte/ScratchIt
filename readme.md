# ScratchIt

> Virtual scratch card game.


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/meobyte/jquery-scratchit/master/dist/jquery.scratchit.min.js
[max]: https://raw.githubusercontent.com/meobyte/jquery-scratchit/master/dist/jquery.scratchit.js

In your web page:

Markup:
```html
<div class="scratchit">
  <img src="images/image-to-scratch.jpg" width="400" height="200" />
  <img src="images/image-to-reveal.jpg" width="400" height="200" />
  <canvas width="400" height="200"></canvas>
</div>
```

JS:
```html
<script src="jquery.js"></script>
<script src="dist/scratchit.min.js"></script>
<script>
  $(function() {
        var $scratchit = $('.scratchit').scratchIt();
  });
</script>
```

## License

MIT © Michelle Anderson
