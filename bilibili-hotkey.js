let openSelection = "div[name='ctlbar_danmuku_close']";
let closeSelection = "div[name='ctlbar_danmuku_on']";

let changeDanmu = function(){
	let opens = $(openSelection);
	opens.length==0?$(closeSelection).click():opens.click();
}

let hotKey = {
    d : "danmu"
}

let eventEnum = {
    danmu : changeDanmu
}


$("html").keypress(function(k){
    let action = hotKey[k.key];
    if(action){
        eventEnum[action].call();
    }
})
