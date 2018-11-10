$(window).on("load",function(){
	$(".inputTex").keyup(function(event){		
		//获取输入框的值
		var inputValue = $("input").val();
		getValueAjax(inputValue);		
	
		
	});
});

//ajax提交form表单，获取数据
function getValueAjax(inputValue){
	$.ajax({
		url:"https://suggest.taobao.com/sug?callback=jsonp525",
		type:"get",
		data:{q:inputValue},
		dataType:"jsonp",		
		success:function(responseText){
			$("ul").html(" ");
			var hoverValue = '';
			var texValut = $("input").val();
			for(var i in responseText.result){
				$("<li>").html(responseText.result[i][0]).appendTo("ul").css({
					lineHeight:1.7
				}).hover(function(){					
					$(this).css({backgroundColor:"#ddd"});
					hoverValue = $(this).html();
				},function(){					
					$(this).css({backgroundColor:"white"});
				}).click(function(){		
					texValut = hoverValue;
					$("input").val(texValut);
					$("ul").html(" ");
					
				}).parent("ul").css({
					border:"1px solid red",
					listStyle:"none"
				});					
			}	
			$("a").click(function (){			
	//			console.log(inputValue)
				if(texValut!=''){
					$("a").attr("target","_blank").attr("href","https://s.taobao.com/search?q="+texValut);
				}
			});
			//enter时触发		

//			var codes = event.keyCode;
//			console.log(codes)
//			if(codes == 13 && texValut!=''){
//				$("a").attr("target","_blank").attr("href","https://s.taobao.com/search?q="+texValut);
//			}
		},
		error:function(){
			alert("服务器出错");
		}
	});
}

