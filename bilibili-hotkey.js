let changeDanmu = function () {
    let openSelection = "div[name='ctlbar_danmuku_close']";
    let closeSelection = "div[name='ctlbar_danmuku_on']";
	let opens = $(openSelection);
	opens.length===0?$(closeSelection).click():opens.click();
}

let fullScreen = function () {
    $("div[name=browser_fullscreen]").click()
}

let hotKey = {}

chrome.storage.sync.get(null, (config) => {
    hotKey = config;
});

let eventEnum = {
    danmu: changeDanmu,
    full: fullScreen
}


$("html").keypress(function(k){
    let action = hotKey[k.key];
    if(action){
        eventEnum[action].call();
    }
})

chrome.runtime.onMessage.addListener(function (msg) {
    hotKey = msg;
});
