if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

var key ="abcdefghijklmnopqrstuvwxyz123456";

function AES_Encode(plain_text){
	GibberishAES.size(256);	
	return GibberishAES.aesEncrypt(plain_text, key);
}

function AES_Decode(base64_text){
	GibberishAES.size(256);	
	return GibberishAES.aesDecrypt(base64_text, key);
}

String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
}

/**-------------------- mouse wheel control stop and start --------------------**/

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = false;
}

function wheel(e) {
	preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
}
function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

/**-------------------- mouse wheel control (slide) --------------------**/

function deltaControl(event, delta){
	
}

function arrayToMap(){
    a = [];
    //a[0] = 0.4;
    return a.map(function(d, i) { return {x: i+1, y: Math.max(0, d)}; });
}

/**-------------------- dictionary extends --------------------**/

Object.extend = function(destination, source) {
    for (var property in source) {
        if (source[property] != undefined && source[property] != null && source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

/**-------------------- jquery extends toggle func --------------------**/

function jquery_extends(){
	if(jQuery){
		$.fn.extend({
			bind_clk_toggle : function(on_func, off_func){
				var self = this;
				this.swt = false;
				$(this).bind("click",function(){
					this.swt = !this.swt;
					if(this.swt){
						on_func(this);
					}else{
						off_func(this);
					}
				})
			},
			bind_clk_toggles : function(){
				var self = this;
				this.swt = false;
				this.argus = arguments;
				return (function(target, argu){
					target.bind("click",function(){
						if(this.swt == undefined || this.swt+1 == argu.length){
							this.swt = 0;
						}else{
							this.swt++;
						}
						argu[this.swt](target);
					})
				})(self, arguments)
			},
			on_clk_toggle : function(on_func, off_func){
				var self = this;
				this.swt = false;
				$(this).on("click",function(){
					this.swt = !this.swt;
					if(this.swt){
						on_func(this);
					}else{
						off_func(this);
					}
				})
			},
			on_clk_toggles : function(){
				var self = this;
				this.swt = false;
				this.argus = arguments;
				return (function(target, argu){
					target.on("click",function(){
						if(this.swt == undefined || this.swt+1 == argu.length){
							this.swt = 0;
						}else{
							this.swt++;
						}
						argu[this.swt](target);
					})
				})(self, arguments)
			},
		})
	};
}


/**-------------------- long click --------------------**/

function clk_L(){
	var pressTimer;
	$(".investigation-title-img").mouseup(function(){
		  clearTimeout(pressTimer)
		  // Clear timeout
		  return false;
		}).mousedown(function(){
		  // Set timeout
		  pressTimer = window.setTimeout(function() {
			  
		  },500)
		  return false; 
	});	
}
