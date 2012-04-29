/**
 * Tiny.js
 *
 * A reversible base62 ID obfuscater
 *
 * Authors:
 *   Jacob DeHart (original PHP version) and Kyle Bragger (Ruby port)
 *   and Thorsten Basse (JavaScript port)
 *
 * Usage:
 *   obfuscated_id = Tiny.toTiny(123)
 *   original_id = Tiny.reverseTiny(obfuscated_id)
 *
 * Configuration:
 *   You must user Tiny.generateSet() to generate your own set
 *   Do *not* change this once you start using Tiny, as you won't be able to Tiny.reverseTiny()
 *   any values toTiny()'ed with another set.
 *
 */
 
(function() { 
  var root = this;
  var set = 'iPKMFbnBdoSOWTthzrmUDGClAeQVsfRZwyguNEYcpqaIHvJkxXjL';
  var set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var warnDefaultSet = function() {
    if( set === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ) console.warn('Tiny.js character set is still default. You need to generate your own.');
  }
  var range = function(low, high) {
    var arr = [];
    for( var i=low; i<=high; i++ ) {
      arr.push(i);
    }
  };
  var Tiny = {
    toTiny: function(id) {
      warnDefaultSet();
      var hex_n = '';
      id = Math.floor(Math.abs(Number(id)));
      var radix = set.length
      while (true) {
        var r = id % radix;
        hex_n = set[r] + hex_n;
        id = (id-r) / radix;
        if( id === 0 ) break;
      }
      return hex_n;
    },
    reverseTiny: function(string) {
      warnDefaultSet();
      var radix = set.length;
      var strlen = string.length;
      var n = 0;
      for( var i=0; i<strlen; i++) {
        n += set.indexOf( string[i] ) * Math.pow(radix, (strlen-i-1) );
      }
      return n;
    },
    generateSet: function() {
      var arr = [];
      for( var i=65; i<=122; i++) {
        if (i<91 || i>96) arr.push( String.fromCharCode(i) );
      }
      arr = arr.concat(range(0, 9));
      arr.sort(function() {return 0.5 - Math.random()}) // shuffle array
      return arr.join('');
    }
  }
   
  if (typeof exports !== 'undefined') {
   if (typeof module !== 'undefined' && module.exports) {
     exports = module.exports = Tiny;
   }
   exports = Tiny;
  } else if (typeof define === 'function' && define.amd) {
   // Register as a named module with AMD.
   define('Tiny', function() {
     return Tiny;
   });
  } else {
   // Exported as a string, for Closure Compiler "advanced" mode.
   root['Tiny'] = Tiny;
  }
   
})();