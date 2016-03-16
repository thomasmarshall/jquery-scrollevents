QUnit.test('scrollStart', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollStart(function() {
    assert.ok(true, 'expected to have started scrolling');
    done();
  });
  context.scrollTop(25);
});

QUnit.test('scrollEnd', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollEnd(function() {
    assert.ok(true, 'expected to have ended scrolling');
    done();
  });
  context.scrollTop(25);
});

QUnit.test('scrollstart event', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.on('scrollstart', function() {
    assert.ok(true, 'expected to receive scrollstart event');
    done();
  });
  context.scrollTop(25);
});

QUnit.test('scrollend event', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.on('scrollend', function() {
    assert.ok(true, 'expected to receive scrollend event');
    done();
  });
  context.scrollTop(25);
});

QUnit.test('scrolling at number', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollAt(50, function() {
    assert.ok(true, 'expected to have scrolled at 50');
    done();
  });

  context.scrollTop(25);
  setTimeout(function() {
    context.scrollTop(75);
  });
});

QUnit.test('scrolling at function', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');
  var at = function() { return 50; };

  context.scrollAt(at, function() {
    assert.ok(true, 'expected to have scrolled at 50');
    done();
  });

  context.scrollTop(25);
  setTimeout(function() {
    context.scrollTop(75);
  });
});

QUnit.test('scrolling between numbers', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollBetween({ start: 25, end: 75 }, function() {
    assert.ok(true, 'expected to have scrolled at 50');
    done();
  });

  context.scrollTop(50);
});

QUnit.test('scrolling between functions', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');
  var start = function() { return 25; };
  var end = function() { return 75; };

  context.scrollBetween({ start: start, end: end }, function() {
    assert.ok(true, 'expected to have scrolled at 50');
    done();
  });

  context.scrollTop(50);
});

QUnit.test('scroll direction up', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollAt(50, function(event) {
    assert.equal(event.direction, 1, 'expected event direction to be 1');
    done();
  });
  context.scrollTop(25);
  setTimeout(function() {
    context.scrollTop(75);
  });
});

QUnit.test('scroll direction down', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollAt(50, function(event) {
    assert.equal(event.direction, -1, 'expected event direction to be -1');
    done();
  });
  context.scrollTop(75);
  setTimeout(function() {
    context.scrollTop(25);
  });
});

QUnit.test('scroll progress', function(assert) {
  var done = assert.async();
  var context = $('#scrollable');

  context.scrollBetween({ start: 25, end: 75 }, function(event) {
    assert.equal(event.progress, 0.5, 'expected event progress to be 0.5');
    done();
  });
  context.scrollTop(50);
});
