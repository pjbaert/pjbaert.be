
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
  var wave = String.fromCodePoint(128075);
  var args = [ '\n %c ' + wave + ' Nice to meet you! %c pjbaert.be \n\n', 'color: #fff; background: #000; padding:5px 0;', 'color: #000; background: #fff; padding:5px 0;'];
  window.console.log.apply(console, args); //jshint ignore:line
} 
else if (window.console) {
  window.console.log(' ' + wave + ' Nice to meet you! - pjbaert.be/')  //jshint ignore:line;
}
