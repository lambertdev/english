// mdBook additional-js for english.lambert.wang (path in book.toml is relative to this directory).
// Adds a "back to main site" icon link to the menu bar of every page.
(function () {
    var bar = document.querySelector('#menu-bar .right-buttons');
    if (!bar) return;
    var a = document.createElement('a');
    a.className = 'icon-button';
    a.href = 'https://lambert.wang/';
    a.title = 'Back to lambert.wang';
    a.setAttribute('aria-label', 'Back to lambert.wang');
    var icon = document.createElement('i');
    icon.className = 'fa fa-globe';
    icon.setAttribute('aria-hidden', 'true');
    a.appendChild(icon);
    bar.insertBefore(a, bar.firstChild);
})();
