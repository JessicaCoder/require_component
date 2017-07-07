require.config({
	paths:{
		jquery:'jquery-3.1.0',
		jqueryUI:'https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui'
	}
})
define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
	function Window() {
		this.cfg = {
			width: 500,
			height: 300,
			title: "系统消息",
			content: '',
			textAlertBtn: '',
			textConfirmBtn: '',
			textCancelBtn: '',
			handler: null,
			handlerAlertBtn: null,
			handlerConfirmBtn: null,
			handlerCancelBtn: null,
			handlerCloseBtn: null,
			hasMask: true,
			hasCloseBtn: false,
			isDraggable: true,
			skinClassName: null,
			dragHandle: null
		};
//		this.handlers = {}
	}
	/**
	 * 观察者模式
	 * 跳出原生事件的限制，提高封装的抽象层级
	 * 连缀语法：增加 return this;
	 */
	Window.prototype = $.extend({},new widget.Widget(), {
		renderUI: function(cfg) {
			var footerContent = "";
			switch (this.cfg.winType){
				case 'alert':
				footerContent='<input type="button" value="' + this.cfg.textAlertBtn + '" class="window_alertBtn" />';
					break;
				case "confirm":
				footerContent='<input type="button" value="'+
				this.cfg.textConfirmBtn + 
				'" class="window_confirmBtn" /><input type="button" value="' +
				this.cfg.textCancelBtn + '" class="window_cancelBtn" />';
					break;
				default:
					break;
			}

			this.boundingBox = $('<div class="window_boundingBox">' +
				'<div class="window_header">' + this.cfg.title + '</div>' +
				'<div class="window_body">' + this.cfg.content + '</div>' +
				'<div class="window_footer">' + footerContent + '</div>' +
				'</div>');
			
			if(this.cfg.hasMask) {
				this._mask = $('<div class="window_mask"></div>');
				$("body").append(this._mask);
			}
			if(this.cfg.hasCloseBtn) {
				var closeBtn = $("<span class='window_closeBtn'>x</span>");
				closeBtn.appendTo(this.boundingBox);
//				closeBtn.click(function() {
//					boundingBox.remove();
//					mask && mask.remove();
//					//					CFG.handlerCloseBtn&&CFG.handlerCloseBtn();
//					that.fire('close');
//				});
			}
			this.boundingBox.appendTo("body");
		},
		bindUI:function(){
			var that =this;
			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire("alert");
				that.destory();
			}).delegate(".window_closeBtn","click",function(){
				that.fire('close');
				that.destory();
			}).delegate(".window_alertBtn","click",function(){
				that.fire('alert');
				that.destory();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire('confirm');
				that.destory();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire('cancel');
				that.destory();
			});
			if(this.cfg.handlerAlertBtn) {
				this.on("alert", this.cfg.handlerAlertBtn);
			}
			if(this.cfg.handlerCloseBtn) {
				this.on("close", this.cfg.handlerCloseBtn);
			}
			if(this.cfg.handlerConfirmBtn) {
				this.on("confirm", this.cfg.handlerConfirmBtn);
			}
			if(this.cfg.handlerCancelBtn) {
				this.on("cancel", this.cfg.handlerCancelBtn);
			}
			
		},
		syncUI:function(){
			this.boundingBox.css({
				width: this.cfg.width + "px",
				height: this.cfg.height + "px",
				left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
				top: (this.cfg.x || (window.innerHeight - this.cfg.height) / 2) + "px"
			});
			if(this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable) {
				if(this.cfg.dragHandle) {
					this.boundingBox.draggable({
						handle: this.cfg.dragHandle
					});
				} else {
					this.boundingBox.draggable();
				}
			}
		},
		confirm:function(cfg){
			$.extend(this.cfg, cfg,{winType:"confirm"});
			this.render();
			return this;
		},
		destructor:function(){
			this._mask&&this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg, cfg,{winType:"alert"});
			this.render();
			return this;
		},
		
//		alert: function(cfg) {
//			var CFG = $.extend({}, this.cfg, cfg);
//			var boundingBox = $('<div class="window_boundingBox">' +
//					'<div class="window_header">' + CFG.title + '</div>' +
//					'<div class="window_body">' + CFG.content + '</div>' +
//					'<div class="window_footer"><input type="button" value="' + CFG.textAlertBtn + '" /></div>' +
//					'</div>'),
//				btn = boundingBox.find(".window_footer input");
//			boundingBox.appendTo("body");
//			boundingBox.css({
//				width: CFG.width + "px",
//				height: CFG.height + "px",
//				left: (CFG.x || (window.innerWidth - CFG.width) / 2) + "px",
//				top: (CFG.x || (window.innerHeight - CFG.height) / 2) + "px"
//			});
//			if(CFG.hasCloseBtn) {
//				var closeBtn = $("<span class='window_closeBtn'>x</span>");
//				closeBtn.appendTo(boundingBox);
//				closeBtn.click(function() {
//					boundingBox.remove();
//					mask && mask.remove();
//					//					CFG.handlerCloseBtn&&CFG.handlerCloseBtn();
//					that.fire('close');
//				});
//			}
//			mask = null;
//			if(CFG.hasMask) {
//				mask = $('<div class="window_mask"></div>');
//				mask.appendTo("body");
//			}
//			if(CFG.skinClassName) {
//				boundingBox.addClass(CFG.skinClassName);
//			}
//			if(CFG.isDraggable) {
//				if(CFG.dragHandle) {
//					boundingBox.draggable({
//						handle: CFG.dragHandle
//					});
//				} else {
//					boundingBox.draggable();
//				}
//			}
//			if(CFG.handlerAlertBtn) {
//				this.on("alert", CFG.handlerAlertBtn);
//			}
//			if(CFG.handlerCloseBtn) {
//				this.on("close", CFG.handlerCloseBtn);
//			}
//			btn.click(function() {
//				//				CFG.handlerAlertBtn&&CFG.handlerAlertBtn();
//				boundingBox.remove();
//				mask && mask.remove();
//				that.fire('alert');
//			});
//			that = this;
//			console.log(that);
//			return this;
//		},
//		confirm: function() {},
//		prompt: function() {}
	});

	return {
		Window: Window
	}
})