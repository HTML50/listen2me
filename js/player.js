	var audio = document.getElementById("myMusic");
	
	var enterHeight=0;
	var tableLenght = sentence[0].length
	var nowHeight=10;
	//定义一个当前行高度。
	var halfWindowHeight = $(window).height()/1.5;
	//当前浏览器窗口一半的高度
	$("#wordsTable").append('&nbsp;&nbsp;&nbsp;&nbsp;');
	for (var i = 0; i < tableLenght; i++) {
	if( sentence[0][i] =="←"){
		$("#wordsTable").append('<span style="display:none"><br>&nbsp;&nbsp;&nbsp;&nbsp;</span>');
		enterHeight+=64;
			}
	else{
		$("#wordsTable").append('<span style="display:none">' + sentence[0][i] + '</span>');
	}
	}
	

	//生成数组queue，包含了字句与时间的对应顺序。
	//参数：开始文字，结束文字，播放速度
	var playSector= timeTable.length/2	
	var queue = new Array()
	for(i=0;i<playSector-1;i++){	
	var startWord= timeTable[2*i]
	var endWord= timeTable[2*(i+1)]
	var wordSpeed = (timeTable[2*i+3]-timeTable[2*i+1])*1000

	queue[i]=[startWord,endWord,wordSpeed]
	}
	
	
	//顺序播放数组queue
	
	function queuePlay(i){
		
		if(i<queue.length){
			
			if(queue[i][0]>=queue[i][1]){
			//这里加了一个判断，对于数组前大于后的顺序，直接跳过playSentence函数，进行下一组调用。
			
			window.setTimeout(function(){queuePlay(i+1)},queue[i][2]);
			//console.log("跳过了",queue[i])
			}
			else{
			playSentence(queue[i][0],queue[i][1],queue[i][2]/(queue[i][1]-queue[i][0]))
			//这个速度是本组 总用时/(末字-首字)*1000 是每个字的平均播放速度,为speed参数
			
			window.setTimeout(function(){queuePlay(i+1)},queue[i][2]);
			//此处的速度，为此组总用时。本组播完后，进行下一组播放。
			}	
			}
		else{
		//clearInterval(myClock)
		$("#wordsTable").append('<br><centeR><a href="write.html">我也写一个试试</a></centeR>')
		}
	}
	
	

	//一个一个字播放，并且自动滚屏
		function playSentence(start,end,speed){
	
	//不加这个判断无法正常播放，时间会慢很多，我还不知道怎么回事
		if(start<end)
		{
		$("#wordsTable").find('span:eq(' + start + ')').fadeIn(1000);  
		
		
		wordHeight=$("#wordsTable").find('span:eq(' + start + ')').offset().top
		if(wordHeight>nowHeight){
		
		nowHeight=wordHeight
		//查询每一个字的高度，如果换行，一定增加，将新的高度赋值给nowHeight
		
	
		
		//console.log("哪个字: "+$("#wordsTable").find('span:eq(' + start + ')').text()+" 当前字高"+nowHeight,"窗体一半高度： "+halfWindowHeight,"滚动条距离顶部高度： "+$(window).scrollTop())
		
				if(nowHeight-$(window).scrollTop()>halfWindowHeight)
				//如果行高度多于屏幕的一半，既超出了中心高度，需要进行向下滚动
				{
				var needScroll= nowHeight-halfWindowHeight;
				$('html,body').animate({scrollTop: needScroll}, 1000);
				//滚动的高度是，行的高度 减去 屏幕一半，即向下滚动了约一行的高度
				//console.log("滚到了:"+needScroll)
				}
		
		}
		
		setTimeout(function(){playSentence((start +1),end,speed)}, speed);
		}
	
	}
	
	
	var time=timeTable[1]
	var myClock;
	function play(){
	
	//提前播放音乐
	
	
	//我太笨了，弄不好数组，只能用笨办法代替。先播前几个字，也就是0至数组第一个数量。然后调用循环播放。
	window.setTimeout(function(){playSentence(0,timeTable[0],(timeTable[1]/timeTable[0]*1000));myClock=setInterval("timer()",100);audio.play();},2000);
	
	//此处的速度，为此组总用时。前几个字放完，进行数组循环调用播放。
	window.setTimeout(function(){queuePlay(0)},timeTable[1]*1000+2000);
	

	
	}

	function timer(){
	time=time+0.1
	var str=time+""
	//$("#title").text(str.substring(0,str.indexOf(".") + 2))
	
	if(str.substring(0,str.indexOf(".") + 2)%15==0){
		var randomBgIndex = Math.round( Math.random() * 33 );
		$("#backGround").fadeOut(1500,function (){ $("#backGround").css("background-Image","url("+bodyBgs[randomBgIndex]+")");$("#backGround").css("background-size","100%");});
		$("#backGround").fadeIn(1500,function (){$("#backGround").animate({"background-size":"112%"},12000)});
		
		
		}
	}
	
	function readyToGo(){
	$('body,html').animate({'scrollTop':0},0)
	//$("#wordsTable").css('height',tableLenght/27*64+halfWindowHeight+enterHeight)
	//上面的页面宽度计算只针对于PC, 显示器基本上每行28个字左右。对于移动端，不适用
	$("#wordsTable").css('height','10000px')
	 $("#waitingBar").fadeOut(1100)
	 window.setTimeout(function(){play();},1000);
	 
	 audio. removeEventListener("canplaythrough", readyToGo)
	 
	 $(window).bind("wheel",function(event){
    event.preventDefault();
    return false;
	});
	}
	
	