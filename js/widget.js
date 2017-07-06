/**
 * 一般存放与UI有关的一些公共组件和类
 */



define(function(){
	function Widget(){
		this.handlers = {};
	}
	function TableView(){
//		this.handlers = {};
	}
	
	Widget.prototype={
		on:function(type,handler){
			console.log(type)
			console.log(handler)
			
			if(typeof this.handlers[type]=='undefined'){
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
			console.log(this.handlers)
			return this;
		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for (var i=0,len=handlers.length;i<len;i++) {
					handlers[i](data);
				}
			}
		}
	}
	
	TableView.prototype=$.extend({},new widget.Widget(),{
		someMethod:function(cfg){
			
		}
	});
	return {
		Widget:Widget
	}
})


