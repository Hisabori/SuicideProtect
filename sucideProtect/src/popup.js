document.getElementById('save').addEventListener('click', function() {
    let keywords = document.getElementById('keywords').value.split(',').map(kw => kw.trim());
    chrome.storage.sync.set({ keywords: keywords }, function() {
        console.log('Keywords are set to: ', keywords);
    });
});
