(function($) {

"use strict";

var ScrollObserver = function(options) { this.init(options); };

$.extend(ScrollObserver.prototype, {

  init: function(options) {
    this.events = [];
    this.el = options.el;

    $(this.el)
      .data('scrollObserver', this)
      .scroll($.proxy(this, 'onScroll'));
  },

  trigger: function(type, handler, data) {
    return handler.call(this.el, $.Event(type, data));
  },

  triggerAt: function(hanlder, data) {
    return this.trigger('scrollat', hanlder, data);
  },

  triggerBetween: function(handler, data, progress) {
    return this.trigger('scrollbetween', handler, $.extend({}, data, {
      progress: progress
    }));
  },

  testAt: function(event, target, handler, data) {
  if (event.type !== 'scrollat') { return; }
    var point = event.data.point;

    if ($.isFunction(point)) { point = point.call(target); }

    if (this.isBetween(data.scrollTop, this.position, point)) {
      this.triggerAt(handler, data);
    }
  },

  testBetween: function(event, target, handler, data) {
    if (event.type !== 'scrollbetween') { return; }

    var start   = event.data.start,
        end     = event.data.end,
        trigger = $.proxy(this, 'triggerBetween');

    if ($.isFunction(start)) { start = start.call(target); }
    if ($.isFunction(end)) { end = end.call(target); }

    if (this.isBetween(start, end, data.scrollTop)) {
      return trigger(handler, data, (data.scrollTop - start) / (end - start));
    }

    if (this.isBetween(data.scrollTop, this.position, end)) {
      return trigger(handler, data, 1);
    }

    if (this.isBetween(data.scrollTop, this.position, start)) {
      return trigger(handler, data, 0);
    }
  },

  isBetween: function(a, b, n) {
    return (n >= a && b >= n) || (n >= b && a >= n);
  },

  onScroll: function() {
    var self     = this,
        events   = this.events,
        data     = {};

    data.scrollTop = $(this.el).scrollTop();
    data.direction = (data.scrollTop > this.position) ? 1 : -1;

    $.each(events, function(index, event) {
      var target  = event.data.target,
          handler = event.handler;

      self.testAt(event, target, handler, data);
      self.testBetween(event, target, handler, data);
    });

    this.position = data.scrollTop;
  }

});

var special = jQuery.event.special;

special.scrollstart = special.scrollend = {
  add: function(event) {
    $(this).on('scroll.scrollstart.' + event.guid, special.scrollstart.onScroll);
  },

  remove: function(event) {
    $(this).off('scroll.scrollstart.' + event.guid);
  },

  onScroll: function() {
    var el   = $(this),
        data = el.data();

    if (data.scrollTimeout) {
      clearTimeout(data.scrollTimeout);
      delete data.scrollTimeout;
    } else {
      el.trigger('scrollstart');
    }

    data.scrollTimeout = setTimeout(function() {
      clearTimeout(data.scrollTimeout);
      delete data.scrollTimeout;

      el.trigger('scrollend');
    }, 100);
  }
};

special.scrollat = special.scrollbetween = {
  add: function(event) {
    var observer = $(this).data('scrollObserver') || new ScrollObserver({ el: this }),
        events   = observer.events;

    event.data.target = this;
    events.push(event);
  },

  remove: function(event) {
    var observer = $(this).data('scrollObserver'),
        events   = observer.events;

    events.splice($.inArray(event, events), 1);
  }
};

$.extend($.fn, {
  scrollStart: function(handler) {
    return this.on('scrollstart', handler);
  },

  scrollEnd: function(handler) {
    return this.on('scrollend', handler);
  },

  scrollAt: function(point, handler) {
    return this.on('scrollat', { point: point }, handler);
  },

  scrollBetween: function(points, handler) {
    return this.on('scrollbetween', points, handler);
  }
});

})(jQuery);
