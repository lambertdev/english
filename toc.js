// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="WordPowerMadeEasy/index.html"><strong aria-hidden="true">1.</strong> Word Power Made Easy</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter3.html"><strong aria-hidden="true">1.1.</strong> Chapter 3</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter4.html"><strong aria-hidden="true">1.2.</strong> Chapter 4</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter5.html"><strong aria-hidden="true">1.3.</strong> Chapter 5</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter6.html"><strong aria-hidden="true">1.4.</strong> Chapter 6</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter7.html"><strong aria-hidden="true">1.5.</strong> Chapter 7</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter9.html"><strong aria-hidden="true">1.6.</strong> Chapter 9</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter10.html"><strong aria-hidden="true">1.7.</strong> Chapter 10</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter11.html"><strong aria-hidden="true">1.8.</strong> Chapter 11</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter12.html"><strong aria-hidden="true">1.9.</strong> Chapter 12</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter14.html"><strong aria-hidden="true">1.10.</strong> Chapter 14</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter15.html"><strong aria-hidden="true">1.11.</strong> Chapter 15</a></li><li class="chapter-item expanded "><a href="WordPowerMadeEasy/Chapter16.html"><strong aria-hidden="true">1.12.</strong> Chapter 16</a></li></ol></li><li class="chapter-item expanded "><a href="TechnicalWriting/index.html"><strong aria-hidden="true">2.</strong> Technical Writing Guide</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="TechnicalWriting/One-Introduction.html"><strong aria-hidden="true">2.1.</strong> Part One - Introduction</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Words.html"><strong aria-hidden="true">2.2.</strong> Part One - Words</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-ActiveVoice.html"><strong aria-hidden="true">2.3.</strong> Part One - Active Voice</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-ClearSentences.html"><strong aria-hidden="true">2.4.</strong> Part One - Clear Sentences</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-ShortSentences.html"><strong aria-hidden="true">2.5.</strong> Part One - Short Sentences</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-ListNTables.html"><strong aria-hidden="true">2.6.</strong> Part One - List and tables</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Paragraphs.html"><strong aria-hidden="true">2.7.</strong> Part One - Paragraphs</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Audience.html"><strong aria-hidden="true">2.8.</strong> Part One - Audience</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Documents.html"><strong aria-hidden="true">2.9.</strong> Part One - Documents</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Punctuation.html"><strong aria-hidden="true">2.10.</strong> Part One - Punctuation(Optional)</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/One-Summary.html"><strong aria-hidden="true">2.11.</strong> Part One - Summary</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-Introduction.html"><strong aria-hidden="true">2.12.</strong> Part Two - Introduction</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-Self-editing.html"><strong aria-hidden="true">2.13.</strong> Part Two - Self-editing</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-OrganizeLargeDoc.html"><strong aria-hidden="true">2.14.</strong> Part Two - Organizing large docs</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-Illustrating.html"><strong aria-hidden="true">2.15.</strong> Part Two - Illustrating</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-Sample-code.html"><strong aria-hidden="true">2.16.</strong> Part Two - Create sample code</a></li><li class="chapter-item expanded "><a href="TechnicalWriting/Two-Summary.html"><strong aria-hidden="true">2.17.</strong> Part Two - Summary</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
