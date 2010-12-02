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
			console.log(this.options.thresholds);
			var self = this, aThresholds = [], count;
			this.options.max = this.options.max || this.element.attr('maxlength');
			
			// Create thresholds array for sorting
			for (level in this.options.thresholds) {
				if (this.options.thresholds.hasOwnProperty(level) && typeof this.options.thresholds[level] === 'number') {
					aThresholds.push([level, this.options.thresholds[level]]);
				}
			}
			
			aThresholds.sort(function (a, b) {
				return b[1] - a[1];
			});
			
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
		_change: function (e) {
			this.option('count', this.getCount());

			this._trigger('callback', e, this.options);
		},
		build: function ( /* Int */ count) {
			var aTxt = this.options.text.split(' '),
					threshold = this.getThreshold(count),
					classes = (threshold) ? this.options['class'] + ' ' + threshold : this.options['class'], 
					$counter;
					
			aTxt = this.options.text.split(' ');
			aTxt[0] = aTxt[0].pluralize(count);
			$counter = $('<p />', {
				'class': classes,
				html: '<span>' + count + '</span> ' + aTxt.join(' ')
			});
		
			if (!this.$counter) {
				this.element.after($counter);
			} else {
				this.$counter.replaceWith($counter);
			}
			this.$counter = $counter;
		},
		getCount: function () {
			return this.options.max - this.element[0].value.length; // Int
			
		},
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
			$counter.remove();
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);