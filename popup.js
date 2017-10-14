// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */

let lastTabId;

function getCurrentTabUrl(callback) {
    let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
      let tab = tabs[0];
      let url = tab.url;
      lastTabId = tab.id;
    callback(url);
  });
}

function changeHotKey(config){
    chrome.tabs.sendMessage(lastTabId, config);
}

function showConfig(config){
    $(".hotKey").each((i, e) => {
        e.value = config[e.id] ? config[e.id] : "空";
    });
}

function saveConfig(config) {
    chrome.storage.sync.clear();
    chrome.storage.sync.set(config);
}

// 默认配置
let defaultHotKey = {
    d: "danmu",
    danmu: "d",
    f: "full",
    full: "f"
}


document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl(() => {
      chrome.storage.sync.get(null, (config) => {
            if (Object.getOwnPropertyNames(config).length > 0){
                defaultHotKey = config;
            }
          changeHotKey(defaultHotKey);
          showConfig(defaultHotKey)
      });

      $(".hotKey").change((e) => {
          let input = $(e.target);
          let action = input.first().prop("id");
          let key = input.first().val();
          let oldKey = defaultHotKey[action];
          let oldAction = defaultHotKey[key];
          delete defaultHotKey[oldAction];
          delete defaultHotKey[oldKey];
          delete defaultHotKey[action];
          delete defaultHotKey[key];
          defaultHotKey[action] = key;
          defaultHotKey[key] = action;
          changeHotKey(defaultHotKey);
          saveConfig(defaultHotKey);
          showConfig(defaultHotKey)
      });
  });
});

