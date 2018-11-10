(function($){
	$.fn.extend({
		waterFlow:function(){
			//获取items的宽度
//			console.log(this)
			var itemsWidth = this.outerWidth();
//			console.log(itemsWidth)
			//获取每一条item的宽度
			imgBoxs = this.find("div");
			imgBoxWidth = imgBoxs.outerWidth();
//			console.log(imgBoxs);
//			console.log(imgBoxWidth)
			//每一行显示5个
			var rowNum = 5;
			//计算间隙space
			var space = (itemsWidth - imgBoxWidth * rowNum) / (rowNum - 1);
//			console.log(space)
			//定义一个存储item高度的数组
			var imgBoxsHeightArr = [];
			
			imgBoxs.each(function(index,ele){
//				console.log(index)				
//				console.log(ele)
//				console.log($(ele))							
				var itemLeft = index * (imgBoxWidth + space);
//				console.log(itemLeft)
				//显示第一行的5个图片,存储这5个高度
				if(index < rowNum){
					imgBoxsHeightArr[index] = $(ele).outerHeight();
					$(ele).css({
						top:0,
						left:itemLeft
					});
				}else{
					//判断数组里哪个最小
					var minHeight = imgBoxsHeightArr[0];
					var minIndex = 0;
					//获取当前元素图像 高度
					var currentHeight = $(ele).outerHeight();
//					console.log(currentHeight)
//					console.log(currentHeight)
//					console.log(imgBoxsHeightArr)
					for(var i in imgBoxsHeightArr){
//						console.log(imgBoxsHeightArr)
						if(imgBoxsHeightArr[i] < minHeight){
							minHeight = imgBoxsHeightArr[i];
							minIndex = i;
						}
					}
					//找到最小高度值后，将当前的元素图像的高度叠加在最小高度上,就是当前元素图像所在的位置
					imgBoxsHeightArr[minIndex] = currentHeight + minHeight + space;
					
					$(ele).css({
						top:minHeight + space,
						left:minIndex * (imgBoxWidth + space)
					});
				}
				
			});
			//找到最高的那个数
//				console.log(imgBoxsHeightArr)
				var maxHeight = imgBoxsHeightArr[0];
				var maxIndex = 0;
				for(var j in imgBoxsHeightArr){
//					console.log(imgBoxsHeightArr[j])
					if(imgBoxsHeightArr[j] > maxHeight){
						maxHeight = imgBoxsHeightArr[j];
						maxIndex = j;
					}
				}
//				console.log(maxHeight)
				//设置items的值
//				console.log(this)
				this.height(maxHeight);
		}
	});
})(jQuery);


$(window).on("load",function(){
	//在文档加载完执行加载15张图片
	var pageNum = 1;
	ajaxGetImg(pageNum);
	
	$("#loadMore").click(function(){
		//ajax获取图片
	    pageNum ++;
		ajaxGetImg(pageNum);
	});
	//滑动加载
	$(window).scroll(function(){
		//获取
	//	var docscrollTop = $(document).scrollTop();
	//	var wimscrollTop = $(window).scrollTop();
	//	
	//	var documentheight = $(document).height()
	//	var windowheight= $(window).height()
	//	
	//	console.log("docscrollTop======>",docscrollTop)
	//	console.log("wimscrollTop=====>",wimscrollTop)
	//	console.log("documentheight=====>",documentheight)
	//	console.log("windowheight=====>",windowheight)
		var totalHeight = Math.ceil($(window).height() + $(window).scrollTop());
		if(totalHeight >= $(document).height()){
			pageNum ++;
			ajaxGetImg(pageNum);
		}
	});
});


function ajaxGetImg(pageNum){
	//分页
	$.ajax({
		type:"post",
		url:"water.php",
		data:{page:pageNum},
		dataType:"json",
		success:function(responseDate){
			console.log(responseDate)
			for(var i in responseDate){
				var path = responseDate[i].path;
				var title = responseDate[i].title;
				var divItem = $("<div>",{class:"item"}).appendTo("#items");
				$("<img>",{src:path}).appendTo(divItem);
				$("<p>").html(title).appendTo(divItem);				
			}
			$(".item img").on("load",function(){
				//瀑布流
				$("#items").waterFlow();
			});
			if(responseDate.length == 0){
				$("#loadMore").html("没有更多数据");
			}
			
		},
		error:function(xhr,error,ex){
				alert('服务器错误!稍后重试!');
			}
	});
}