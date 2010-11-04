/* 
 * usage: new Date().toGenString()
 */

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
		pad(this.getSeconds());
		
		// output 10/10/2010 21:15:07
	};
}