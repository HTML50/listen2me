var previousCount=0;
var theBiggest=0;
var previousWord=null;
var pPreviousWord=null;

var str="0";


var hasStarted=false;
var timeTable  = new Array;



var time=0;
var myClock;

var audio = document.getElementById("myMusic");


			


function start(){
$('#myContent').focus()
audio.play();
$("#startBtn").attr("value","有事情，暂停一下")
$("#startBtn").attr("onclick","pauseWriting()")
myClock=setInterval("timer()",100)
}

function pauseWriting(){
audio.pause();
$("#startBtn").attr("value","继续写作")
$("#startBtn").attr("onclick","start()")
clearInterval(myClock)
}

function submit(){
audio.pause();
console.log(str)
var timeArray = [$("#myContent").val().length,str.substring(0,str.indexOf(".") + 2)]
timeTable.push(timeArray)

var content = document.getElementById("myContent");
var str1=content.value.replace(/\n/g, '←')
//content.value=str+"\n\r"+timeTable
clearInterval(myClock)
$("#startBtn").remove()
$("#watchLink").append('<a href="index.html?content='+str1+'&timetable='+timeTable+'">前往参观</a>')
}

function timer(){
time=time+0.1
str=time+""
}

function wordCheck(){
var cursortPosition=$("#myContent").get(0).selectionStart;
var nowCount= $("#myContent").val().length;
var nowContent=$("#myContent").val()
var nowInput = nowContent[nowCount-1]
var re=/^[\u4E00-\u9FA5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|\u007e]+$/
console.log("当前输入： "+nowInput,"上一个字："+previousWord," 字数： "+nowCount,"时间： "+str)


	if(nowCount>theBiggest){
	theBiggest=nowCount
	}
	//加一个最大值，为了区分输入一个中文，与删除中文前的英文
	//这个判断可以继续完善，因为可以检测当前光标，就可以判断光标左右是否有字，来确定是否插入。


	if(nowCount-previousCount==-1){
		if (re.test(nowInput)) {
			if(re.test(previousWord)){
			console.log("删除中文")
			}
			else if(!re.test(pPreviousWord)){
				if(nowCount+1==theBiggest){
				console.log("输入了一个中文")
				var timeArray = [nowCount,str.substring(0,str.indexOf(".") + 2)]
				timeTable.push(timeArray)
				}
				else{
				console.log("删除中文前面的符号或英文",previousWord)
				}
			}
			else{
			console.log("删除了中文前的一个东西",previousWord)
			}
		
		}
		else{
		console.log("删除英文")
		}
	}
	else if(nowCount-previousCount<-1){
		if (re.test(nowInput)) {
			console.log("连拼输入")
			var timeArray = [nowCount,str.substring(0,str.indexOf(".") + 2)]
			timeTable.push(timeArray)
			}
	}
	else{
	if (re.test(nowInput)) {
		console.log("中文输入")
		var timeArray = [nowCount,str.substring(0,str.indexOf(".") + 2)]
		timeTable.push(timeArray)
		}
	else{
	console.log("英文输入")
	}
	}
	
	
	previousCount=nowCount;
	pPreviousWord=previousWord;
	previousWord=nowInput;
	
}


function readyToWrite(){
	 $("#waitingBar").fadeOut(1100)
	 audio.removeEventListener("canplaythrough", readyToWrite)
	}
	
	function cookieCheck(){
		var strCookie=document.cookie; 
		if(strCookie!=""){
		return true;
		}
		else{
		var date=new Date(); 
		var expiresDays=100; 
		date.setTime(date.getTime()+expiresDays*24*3600*1000); 	
		document.cookie="wc"; 
		return false;
		}
	}