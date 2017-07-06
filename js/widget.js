/**
 * 一般存放与UI有关的一些公共组件和类
 */



define(function(){
	function Widget(){
		this.handlers = {};
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
		},
		render:function(container){
			this.renderUI();//dom渲染
			this.handlers = {}; //事件清空
			this.bindUI(); //事件绑定
			this.syncUI(); //css渲染
			$(container||document.body).append(this.boundingBox);
		},
		destory:function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},
		renderUI:function(){},
		bindUI:function(){},
		syncUI:function(){},
		destructor:function(){}
	}
	
	return {
		Widget:Widget
	}
})


