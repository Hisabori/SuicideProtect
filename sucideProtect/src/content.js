chrome.storage.sync.get('keywords', function(data) {
    let keywords = data.keywords;
    console.log('Keywords loaded: ', keywords);

    // 웹페이지 내용을 감시
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (keywords.some(keyword => node.textContent.includes(keyword))) {
                            console.log('Keyword found in text node: ', node.textContent);
                            chrome.runtime.sendMessage({ action: "alertKeyword" });
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        if (keywords.some(keyword => node.innerHTML.includes(keyword))) {
                            console.log('Keyword found in element node: ', node.innerHTML);
                            chrome.runtime.sendMessage({ action: "alertKeyword" });
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('Observer started');

    // 키보드 입력을 감시
    document.body.addEventListener('input', function(e) {
        if (e.target.value) {
            if (keywords.some(keyword => e.target.value.includes(keyword))) {
                console.log('Keyword found in input: ', e.target.value);
                chrome.runtime.sendMessage({ action: "alertKeyword" });
            }
        }
    });
});
