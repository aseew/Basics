<?php
	//分页，获取页数
	$page = $_POST['page'];	
//	print_r($page);
	//获取json里的值
	$imgArr = json_decode(file_get_contents("img.json"),true);
//	print_r($imgArr);
	//每一次显示15个
//	1      0-14
//	2      15-29
	$beginIndex = ($page-1) * 15;
	//剪切数组成每15个一组               数组             起始位置    个数  
	$everyArr = array_slice($imgArr,$beginIndex,15);
	echo json_encode($everyArr);