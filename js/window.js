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
	}

	Window.prototype = {
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
				top:(CFG.x||(window.innerWidth-CFG.width)/2)+"px"
			});
			if(CFG.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>x</span>");
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					boundingBox.remove();
					CFG.handlerCloseBtn&&CFG.handlerCloseBtn();
					mask&&mask.remove();
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
			btn.click(function(){
				CFG.handlerAlertBtn&&CFG.handlerAlertBtn();
				boundingBox.remove();
				mask&&mask.remove();
				
			});
			
		},
		confirm: function() {},
		prompt: function() {}
	}

	return {
		Window: Window
	}
})