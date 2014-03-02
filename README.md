jquery-scrollevents
===================

A handful of jQuery special events for scrolling

- `scrollstart` an element starts being scrolled
- `scrollend` an element has stopped being scrolled
- `scrollat` an element is scrolled past a given point
- `scrollbetween` an element is scrolled between two points

```javascript
$(window).scrollStart(function() {
  console.log('Started scrolling…');
});

$(window).scrollEnd(function() {
  console.log('Stopped scrolling…');
});

$(window).scrollAt(500, function(event) {
  event.scrollTop // The current scroll position
  event.direction // The direction of the scroll (1 or -1)
});

$(window).scrollBetween({
  start: 500,
  end: 1000
}, function(event) {
  event.scrollTop // The current scroll position
  event.direction // The direction of the scroll (1 or -1)
  event.progress  // The progress of a scrollbetween event (between 0 and 1)
});
```

**scrollat** and **scrollbetween** can also take functions instead of numbers:

```javascript
$(window).scrollAt(function() {
  return $(window).height() / 2;
}, myHandler);

$(window).scrollBetween({
  start: 500,
  end: function() { return $(window).height() + 500; }
}, myHandler);
```
