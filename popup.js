document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('disable').addEventListener('click', function() {
        chrome.tabs.create({ url: 'chrome://chrome/extensions' });
    });
});
