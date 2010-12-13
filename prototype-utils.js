// STRING -----------------------------------------------------------------------------------------------------------

	// usage: 'singluar'.pluralize(2, 'plural');
	if (!String.prototype.pluralize) {
		String.prototype.pluralize = function (/* Int */count, /* String? */plural) {
			var text = this, lastIdx;
			
			if (count !== 1) {
				if (plural) return plural; // String
				
				lastIdx = text.length - 1;
				switch (text[lastIdx]) {
					case 'x':
					case 'h':
					case 's':
						text += 'es';
						break;
					case 'y':
						text = text.substring(0, lastIdx) + 'ies';
						break;
					default:
						text += 's';
						break;
				}
			}
			
			return text.toString(); //String
		};
	}
	
// DATE -------------------------------------------------------------------------------------------------------------

	// usage: Date().toGenString()
	 
	if (!Date.prototype.toGenString) {
		Date.prototype.toGenString = function () {		
			function pad (i) {
				return (i < 10) ? '0' + i.toString(10) : i.toString(10);
			}
			
			return pad(this.getMonth() + 1) + '/' +
			pad(this.getDate()) + '/' +
			this.getFullYear() + ' ' +
			pad(this.getHours()) + ':' +
			pad(this.getMinutes()) + ':' +
			pad(this.getSeconds()); // output '10/10/2010 21:15:07'
		};
	}