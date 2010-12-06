(function($){
	$.widget('glg.countdown', {
		options: {
			count: 0,
			max: 0,
			'class': 'counter',
			text: 'character left',
			thresholds: {},
			events: ['keyup', 'blur', 'focus', 'change', 'paste'],
			callback: $.noop
		},
		_create: function () {
			var self = this, 
					aThresholds = [], 
					count;

			this.options.max = this.options.max || this.element.attr('maxlength');
			
			// Create thresholds array for sorting
			for (level in this.options.thresholds) {
				if (this.options.thresholds.hasOwnProperty(level) && typeof this.options.thresholds[level] === 'number') {
					aThresholds.push([level, this.options.thresholds[level]]);
				}
			}
			
			// Sort said thresholds array
			aThresholds.sort(function (a, b) {
				return b[1] - a[1];
			});
			
			// Overwrite the thresholds object with the array
			this.options.thresholds = aThresholds;
			
			count = this.getCount();
			this.build(count);
			
			// Bind name spaced event listeners
			var aEvents = $.map(this.options.events, function(evt){
				return evt + '.' + self.widgetName;
			});
			aEvents.push('reCount');
			this.element.bind(aEvents.join(' '), $.proxy(this._change, this));
		},
		// If the option being updated is count, and it's change, rebuild the counter
		_setOption: function (key, value) {
			switch (key) {
				case 'count':
					if (value !==  this.options.count) {
						this.build(value);
					}
					break;
			}
			
			$.Widget.prototype._setOption.apply(this, arguments);
		},
		// Do the count thing and then call the custom callback
		_change: function (e) {
			this.option('count', this.getCount());

			this._trigger('callback', e, this.options);
		},
		// Create countdown timer from scratch each time
		build: function ( /* Int */ count) {
			var aTxt = this.options.text.split(' '),
					threshold = this.getThreshold(count),
					classes = (threshold) ? this.options['class'] + ' ' + threshold : this.options['class'], 
					$counter;
			
			// Build out html		
			aTxt = this.options.text.split(' ');
			aTxt[0] = aTxt[0].pluralize(count);
			$counter = $('<p />', {
				'class': classes,
				html: '<span>' + count + '</span> ' + aTxt.join(' ')
			});
		
			// Drop it into the DOM, replacing if already exists
			if (!this.$counter) {
				this.element.after($counter);
			} else {
				this.$counter.replaceWith($counter);
			}
			this.$counter = $counter;
		},
		// Get how many characters are left in the max
		getCount: function () {
			return this.options.max - this.element[0].value.length; // Int
		},
		// Get the threshold the value has passed (if any)
		getThreshold: function ( /* Int */ count ) {
			var l = this.options.thresholds.length,
					threshold = '';

			while (l--) {
				if (count < this.options.thresholds[l][1] * this.options.max) {
					threshold =  this.options.thresholds[l][0];
					break;
				}
			}
			
			return threshold; // String
		},
		destroy: function () {
			this.$counter.remove();
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);