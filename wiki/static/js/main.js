// Qubes SDP Wiki JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    highlightCurrentPage();

    // Add copy button to code blocks
    addCopyButtons();

    // Add anchor links to headings
    addAnchorLinks();

    // Initialize search if search box exists
    initSearch();
});

// Highlight current page in sidebar navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.background = 'rgba(255,255,255,0.1)';
            link.style.borderLeftColor = '#3874D8';
            link.style.color = 'white';
        }
    });
}

// Add copy buttons to code blocks
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';

        button.addEventListener('click', () => {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });

        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// Add anchor links to headings
function addAnchorLinks() {
    const headings = document.querySelectorAll('h2, h3, h4');

    headings.forEach(heading => {
        const id = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        heading.id = id;

        const anchor = document.createElement('a');
        anchor.className = 'anchor-link';
        anchor.href = `#${id}`;
        anchor.textContent = '#';
        anchor.style.marginLeft = '0.5rem';
        anchor.style.color = '#ccc';
        anchor.style.textDecoration = 'none';
        anchor.style.display = 'none';

        heading.appendChild(anchor);

        heading.addEventListener('mouseenter', () => {
            anchor.style.display = 'inline';
        });

        heading.addEventListener('mouseleave', () => {
            anchor.style.display = 'none';
        });
    });
}

// Simple search functionality
function initSearch() {
    const searchBox = document.getElementById('wiki-search');
    if (!searchBox) return;

    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const content = document.querySelector('.container');
        const text = content.textContent.toLowerCase();

        // Simple highlight (in production, use a proper search library)
        if (query && text.includes(query)) {
            console.log('Found:', query);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add table of contents for long pages
function generateTableOfContents() {
    const headings = document.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Don't generate TOC for short pages

    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';

    const list = toc.querySelector('ul');

    headings.forEach(heading => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent.replace('#', '');

        if (heading.tagName === 'H3') {
            li.style.marginLeft = '1rem';
        }

        li.appendChild(a);
        list.appendChild(li);
    });

    const firstHeading = document.querySelector('h1');
    if (firstHeading && firstHeading.nextSibling) {
        firstHeading.parentNode.insertBefore(toc, firstHeading.nextSibling);
    }
}

// Call TOC generator
generateTableOfContents();
