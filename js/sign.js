$(function() {
	var cale = new Calendar(
		"idCalendar",
		{
			SelectDay : new Date().setDate(10),
			onSelectDay : function(o) {
				o.className = "onSelect";
			},
			onToday : function(o) {
				o.className = "onToday";
			},
			onFinish : function() {
				$("#idCalendarYear").html(this.Year);
				$("#idCalendarMonth").html(this.Month);
				var data = [];
				$.ajax({
					type: "POST",
			        url: "js/getSignRecordInfo.json",
			        data:{
			        	yearMonth:this.Year+"-"+this.Month,
			        	limitMax : 5
			        },
			        success: function(formData){
			        	data = formData.data.ja ;
			        	//个人信息
			        	toAccountInfo(formData.account);
			        	//签到信息
			        	toSignInfo(formData.data);
			        	// 签到达人信息
			        	toSupTable(formData.list);
						//经验值信息
						for (var i = 0, len = data.length; i < len; i++) {
							//this.Days[data[i].dayNum].innerHTML = getShowInfo(data[i].dayNum,data[i].rewardExp,data[i].rewardPoints);
							cale.Days[data[i].dayNum].innerHTML = getShowInfo(data[i].dayNum,data[i].rewardExp,data[i].rewardPoints);
						}
			        }
			     });
			}
		}
	);
	$("#idCalendarPre").click(function(){
		cale.PreMonth();
	});

	$("#idCalendarNext").click(function(){
		cale.NextMonth( );
	});
	
});
var headImg = "/images/headImg/";
var productImg = "/images/productImg/";
//账户信息
function toAccountInfo(account){
	var html_info = "";
	html_info += "<img src='"+headImg+account.headImage+"' class='profile'/>";
	html_info += "<span>"+account.nickName+"</span>";
	$("#mysingPhoId").html(html_info);

}
//签到信息
function toSignInfo(data){
	var html_info = "";//今日已领"++"经验值，
	if(data.nowDay == 0){
		html_info += "今日未签到";
	}else{
		if(data.tommorExp > 0){
			html_info += "明天签到可领"+data.tommorExp+"经验值";
		}
		if(data.tommorPoints > 0){
			html_info += ","+data.tommorPoints+"擎天币";
		}
		$("#signIn").html("签到完成");
	}
	$("#tommorSingInfoId").html(html_info);
}
//签到达人信息
function toSupTable(list){
	var html_info = "";
	for (var i = 0; i < list.length; i++) {
		// list[i];
		 html_info += "<tr>";
		 html_info += "	<td width='20%'><a class='ranknum'>"+(i+1)+"</a></td>";
		 html_info += "	<td><img src='"+headImg+list[i].headImage+"' class='profile'/></td>";
		 html_info += "	<td><a>"+list[i].nickname+"</a><p>已签到："+list[i].signDays+"天</p></td>";
		 html_info += "</tr>";
	}
	$("#supTableId").html(html_info);
}
//日期 经验信息
function getShowInfo(dataInfo,rewardExp,rewardPoints){
	var html_info = dataInfo;
	html_info += "<div class='sing'></div>";
	html_info += "<div class='tLv'>";
	if (rewardPoints > 0 ){
		html_info += "<p>";
		html_info += "<img src='images/qtb.jpg' width='10'/>";
		html_info += "<span class='yellow'>+"+rewardPoints+"</span>";
		html_info += "</p>";
		html_info += "";
	}
	if (rewardExp > 0 ){
		html_info += "<p>";
		html_info += "<img src='images/lv.png' width='10'/>";
		html_info += "<span class='blue'>+"+rewardExp+"</span";
		html_info += "</p>";
	}
	html_info += "</div>";
	return html_info ;
}


