// usage: 'singluar'.pluralize(2, 'plural');
if (!String.prototype.pluralize) {
	String.prototype.pluralize = function (/* Int */count, /* String? */plural) {
		var text = this, lastIdx;
		
		if (count !== 1) {
			if (plural) return plural; // String
			
			lastIdx = text.length - 1;
			switch (text[lastIdx]) {
				case 'x':
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