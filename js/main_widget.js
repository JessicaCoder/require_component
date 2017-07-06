require.config({
	paths:{
		jquery:'jquery-3.1.0',
		jqueryUI:'https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui'
	}
})

require(['jquery','window_widget','jqueryUI'],function($,w,$UI){
	$("#trigger-alert").on("click",function(){
		var win =new w.Window();
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
//		win.on('alert',function(){
//			alert("the third alert handler");
//		});
//		win.on('close',function(){
//			alert("the second close handler");
//		});
		
		
	});
})
