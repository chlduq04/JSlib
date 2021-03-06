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

/**------------------------ mouse wheel control (slide) -----------------------**/

function deltaControl(event, delta){
	
}

function arrayToMap(){
    a = [];
    //a[0] = 0.4;
    return a.map(function(d, i) { return {x: i+1, y: Math.max(0, d)}; });
}

/**---------------------------- dictionary extends ----------------------------**/

Object.extend = function(destination, source) {
    for (var property in source) {
        if (source[property] != undefined && source[property] != null && source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

/**------------------------ jquery extends toggle func ------------------------**/

function jquery_extends(){
	if(jQuery){
		$.fn.extend({
			/**----------- bind click toggle two func -------------**/
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
			/**----------- bind click toggle many funcs -----------**/
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
			/**------------- on click toggle two func -------------**/
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
			/**------------- on click toggle many funcs -----------**/
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

/**------------------------ jquery extends long click -------------------------**/

function clickMouseLong(){
	if(jQuery){
		$.fn.extend({
			bind_clk_long : function(func, timeout){
				var pressTimer;
				$(this).mouseup(function(){
					  clearTimeout(pressTimer)
					  return false;
					}).mousedown(function(){
					  pressTimer = window.setTimeout(func, timeout);
					  return false; 
				});	
			}
		})
	}
}

/**---------------------------- check lock switch -----------------------------**/

function check_lock(switch, func){
	return function(param){
		if(switch){
			func(param);
		}else{
			//...
		}
	}
}
/*
ex)
function something(){
	$(".find").bind("click",check_lock(true, function(e){
		//...
	}));
}
*/


/**----------------------------- easy ajax call -------------------------------**/

function ajax_call( type, url, data, datatype, cache, ifsuccess, iferror ){
	$.ajax({
		type : type,
		url : base_url+url,
		data : JSON.stringify(data),
		dataType : datatype,
		cache : cache,
		success : function(data) {
			ifsuccess(data);
		},
		error : function(e){
			iferror(e);
		}
	});		
}

function easy_ajax_call( url, data, ifsuccess, iferror ){
	$.ajax({
		type : "POST",
		url : base_url+url,
		data : JSON.stringify(data),
		dataType : "json",
		cache : false,
		success : function(data) {
			ifsuccess(data);
		},
		error : function(e){
			iferror(e);
		}
	});		
}

function easy_get_ajax_call( url, ifsuccess, iferror ){
	$.ajax({
		type : "GET",
		url : base_url+url,
		dataType : "json",
		cache : false,
		success : function(data) {
			ifsuccess(data);
		},
		error : function(e){
			iferror(e);
		}
	});		
}

/**---------------------------- input check and detect empty input -----------------------------**/

$("").keypress(function(event){
	if(event.keyCode == "13"){
		var child = $(this).children().find("input");
		for(var i = 0 ; i < child.length ; i++){
			if($(child[i]).val().trim() == ""){
				$(child[i]).focus();
				return;
			}
		}
	}
})

/**---------------------------- display_none or visibility_hidden -----------------------------**/

function custom_css(options) {
	var options = options || {};
	this.display_none = (typeof options.display_none !== 'undefined') ? options.display_none : "display_none";
	this.visibility_hidden = (typeof options.visibility_hidden !== 'undefined') ? options.visibility_hidden : "visibility_hidden";
	var custom = "<style>." + this.display_none + "{display:none;}." + this.visibility_hidden + "{visibility:hidden;}</style>";
	$("head").append(custom);
	if($){this.jquery_extend()}
}
custom_css.prototype.jquery_extend = function () {
	var self = this;
	$.fn.extend({
		display : function (option) {
			return this.each(function () { (option != true) ? $(this).addClass(self.display_none) : $(this).removeClass(self.display_none); });
		},
		visible : function(){
			return this.each(function(){ (option != true) ? $(this).addClass(self.visibility_hidden) : $(this).removeClass(self.visibility_hidden); })
		}
	});
}
custom_css.prototype.display = function (target, option) {
	(option != true) ? target.addClass(this.display_none) : target.removeClass(this.display_none);
}
custom_css.prototype.visible = function (target, option) {
	(optoin != true) ? target.addClass(this.visibility_hidden) : target.removeClass(this.visibility_hidden);
}

