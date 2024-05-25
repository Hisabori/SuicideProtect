chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ keywords: ['자살', '극단선택', '죽고 싶다', '삶이 끝났으면', '모든 것을 포기하고 싶다', '더 이상 살고 싶지 않다'] }, function() {
        console.log('Default keywords are set.');
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "alertKeyword") {
        console.log('Keyword alert received');
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: '자살 예방 알림',
            message: '자살 암시 키워드가 탐지되었습니다. 도움이 필요하시면 109에 연락하세요.'
        });
    }
});
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        keywords: [
            '자살', '극단선택', '죽고 싶다', '삶이 끝났으면',
            '모든 것을 포기하고 싶다', '더 이상 살고 싶지 않다'
        ]
    }, function() {
        console.log('Default keywords are set.');
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "alertKeyword") {
        console.log('Keyword alert received');
        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: '자살 예방 알림',
            message: '자살 암시 키워드가 탐지되었습니다. 도움이 필요하시면 109에 연락하세요.',
            buttons: [{
                title: '109에 전화하기'
            }]
        }, function(notificationId) {
            chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
                if (notifId === notificationId && btnIdx === 0) {
                    chrome.tabs.create({ url: 'tel:109' });
                }
            });
        });
    }
});
