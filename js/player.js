	var audio = document.getElementById("myMusic");


	var sentence = new Array()
	sentence[0] = "我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！我再测试一下谷歌，因为火狐真的不好使，懒得去调哪里有问题了。还是谷歌好，不会出错。下面开始进行歌词输入。预备。冉冉升起，在分裂的天空留下足迹，生命中，最美丽的一天。哦哦哦哦哦哦。一切都是太阳的光辉，金色月亮，生命中，最美丽的一天~！！！！"

	var timeTable = [2,1,100,3,200,8,300,12,400,13,833,60]

	var tableLenght = sentence[0].length
	var nowHeight=10;
	//定义一个当前行高度。
	var halfWindowHeight = $(window).height()/2;
	//当前浏览器窗口一半的高度

	for (var i = 0; i < tableLenght; i++) {
	$("#wordsTable").append('<span style="display:none">' + sentence[0][i] + '</span>');
	}
	//实在是找不到JS，追加HTML不自动匹配<>标签的方法，只能用PHP来生成了。
	
	

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
			console.log("跳过了",queue[i])
			}
			else{
			playSentence(queue[i][0],queue[i][1],queue[i][2]/(queue[i][1]-queue[i][0]))
			//这个速度是本组 总用时/(末字-首字)*1000 是每个字的平均播放速度,为speed参数
			
			window.setTimeout(function(){queuePlay(i+1)},queue[i][2]);
			//此处的速度，为此组总用时。本组播完后，进行下一组播放。
			}	
			}
		else{
		clearInterval(myClock)
		$("#bottom").html('<a href="javascript:window.location.reload()">刷新重看</a>')
		}
	}
	
	

	//一个一个字播放，并且自动滚屏
		function playSentence(start,end,speed){
	
	//不加这个判断无法正常播放，时间会慢很多，我还不知道怎么回事
		if(start<end)
		{
		$("#wordsTable").find('span:eq(' + start + ')').css('position', 'relative').fadeIn(1000);  
		
		if($("#wordsTable").find('span:eq(' + start + ')').offset().top>nowHeight){
		
		nowHeight=$("#wordsTable").find('span:eq(' + start + ')').offset().top
		//查询每一个字的高度，如果换行，一定增加，将新的高度赋值给nowHeight
		
	
		
		//console.log(" 当前字高"+nowHeight,"窗体一半高度： "+halfWindowHeight,"滚动条距离顶部高度： "+$(window).scrollTop())
		
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
	$("#title").text(str.substring(0,str.indexOf(".") + 2))
	
	if($("#title").text()=='5.0'){
		//$("#backGround").fadeIn();
		}
	}
	
	$(function(){ 

	 audio.src = "06.mp3";
	 
	 audio.addEventListener("canplaythrough", function (){
	$('body,html').animate({'scrollTop':0},0)
	$("#wordsTable").css('height',tableLenght/27*64+halfWindowHeight)
	 $("#waitingBar").fadeOut(1100)
	 window.setTimeout(function(){play();},1000);
	 }, false);
	 
	 
    });