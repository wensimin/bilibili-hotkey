// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function changeHotKey(config){
      let script = "hotKey = "+ JSON.stringify(config);
      chrome.tabs.executeScript({
        code: script
      });
}

function showConfig(config){
    var danmu = document.getElementById('danmu');
    for(var index in config) {
       if (config.hasOwnProperty(index)) {
           var attr = config[index];
           if(attr==='danmu'){
                danmu.value=index;
                return;
           }
       }
    }
}

// 默认配置
let hotKey = {
    d : "danmu"
}


document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
      var danmu = document.getElementById('danmu');
      chrome.storage.sync.get(null, (config) => {
            if (Object.getOwnPropertyNames(config).length > 0){
                hotKey = config;
            }
            changeHotKey(hotKey);
            showConfig(hotKey)
      });
      danmu.addEventListener('change', () => {
        let key = danmu.value
        let config = {};
        config[key]="danmu";
        changeHotKey(config);
        chrome.storage.sync.clear();
        chrome.storage.sync.set(config);
      });
  });
});

