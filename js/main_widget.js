require.config({
	paths:{
		jquery:'jquery-3.1.0',
		jqueryUI:'https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui'
	},
    shim: {
        jqueryUI: {
            deps: ['jquery']
        }
    }
})

require(['jquery','window_widget','jqueryUI'],function($,w,$UI){
	$("#trigger-alert").on("click",function(){
		var win =new w.Window();
//		alert()弹框调用
		win.alert({
			title:"提示",
			content:'welcome!',
			handler:function(){
				alert("you click the button");
			},
			width:300,
			height:150,
			y:50,
			textAlertBtn:"确定按钮",
			hasCloseBtn:true,
			dragHandle:'.window_header',
			skinClassName:"window_skin_a",
			handlerAlertBtn:function(){
				alert("you click the alert button");
			},
			handlerAlertBtn:function(){
				alert("you click the alert button");
			},
			handlerCloseBtn:function(){
				alert("you click the close button");
				
			}
		}).on('alert',function(){
			alert("the second alert handler");
		}).on('alert',function(){
			alert("the third alert handler");
		}).on('close',function(){
			alert("the second close handler");
		});
		
//		win.on('alert',function(){
//			alert("the second alert handler");
//		});

	});
	
	$("#b").on("click",function(){
		var win =new w.Window();
//		confirm()弹框调用
		
		win.confirm({
			title:"系统消息",
			content:'你确定要删除这个文件吗？',
			handler:function(){
				alert("you click the button");
			},
			width:300,
			height:'auto',
			y:50,
			textConfirmBtn:"是",
			textCancelBtn:"否",
			hasCloseBtn:true,
			dragHandle:'.window_header',
			skinClassName:"window_skin_a",
			handlerCloseBtn:function(){
				alert("you click the close button");
			},
			handlerConfirmBtn:function(){
				alert("you click the Confirm button");
			},
			handlerCancelBtn:function(){
				alert("you click the cancel button");
			}
		}).on('confirm',function(){
			alert("the second click confimBtn");
		}).on('cancel',function(){
			alert("the second click cancelBtn");
		}).on('close',function(){
			alert("the second close handler");
		});
		
//		win.on("confirm",function(){
//			alert(123)
//		})
	});
})
