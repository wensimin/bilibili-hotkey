let openSelection = "div[name='ctlbar_danmuku_close']";
let closeSelection = "div[name='ctlbar_danmuku_on']";

let changeDanmu = function(){
	let opens = $(openSelection);
	opens.length==0?$(closeSelection).click():opens.click();
}

$("html").keypress(function(k){
	if(k.key==='d'){
		changeDanmu();
	}
})
