define(['jquery'], function($) {
	function Window() {
		this.cfg = {
			width :500,
			height:300,
			title:"系统消息",
			content:'',
			textAlertBtn:'',
			handler:null,
			handlerAlertBtn:null,
			handlerCloseBtn:null,
			hasMask:true,
			hasCloseBtn:false,
			isDraggable:true,			
			skinClassName:null,
			dragHandle:null
		};
		this.handlers={}
	}
/**
 * 观察者模式
 * 跳出原生事件的限制，提高封装的抽象层级
 * 连缀语法：增加 return this;
 */
	Window.prototype = {
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
		alert: function(cfg) {
			var CFG = $.extend({},this.cfg, cfg);
			var boundingBox = $('<div class="window_boundingBox">' +
				'<div class="window_header">' + CFG.title + '</div>' +
				'<div class="window_body">' + CFG.content + '</div>' +
				'<div class="window_footer"><input type="button" value="'+CFG.textAlertBtn+'" /></div>' +
				'</div>'),
			btn = boundingBox.find(".window_footer input");
			boundingBox.appendTo("body");
			boundingBox.css({
				width:CFG.width+"px",
				height:CFG.height+"px",
				left:(CFG.x||(window.innerWidth-CFG.width)/2)+"px",
				top:(CFG.x||(window.innerHeight-CFG.height)/2)+"px"
			});
			if(CFG.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>x</span>");
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					boundingBox.remove();
					mask&&mask.remove();
//					CFG.handlerCloseBtn&&CFG.handlerCloseBtn();
					that.fire('close');
				});
			}
			mask=null;
			if(CFG.hasMask){
				mask=$('<div class="window_mask"></div>');
				mask.appendTo("body");
			}
			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}
			if(CFG.isDraggable){
				if (CFG.dragHandle) {
					boundingBox.draggable({handle:CFG.dragHandle});
				} else{
					boundingBox.draggable();
				}
			}
			if(CFG.handlerAlertBtn){
				this.on("alert",CFG.handlerAlertBtn);
			}
			if(CFG.handlerCloseBtn){
				this.on("close",CFG.handlerCloseBtn);
			}
			btn.click(function(){
//				CFG.handlerAlertBtn&&CFG.handlerAlertBtn();
				boundingBox.remove();
				mask&&mask.remove();
				that.fire('alert');
			});
			that = this;
			console.log(that);
			return this;
		},
		confirm: function() {},
		prompt: function() {}
	}

	return {
		Window: Window
	}
})