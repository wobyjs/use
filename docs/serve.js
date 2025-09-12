const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.md': 'text/markdown',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Simple markdown to HTML converter
function mdToHtml(md) {
    // Convert headers
    let html = md.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Convert inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Convert lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');

    // Convert paragraphs
    html = html.replace(/^\n/gim, '<br>');

    return html;
}

// Wrap markdown content in basic HTML
function wrapMarkdownContent(title, content) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title} - use-woby</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <h1>${title}</h1>
    ${content}
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Security check to prevent directory traversal
    if (filePath.includes('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Try with .md extension
                if (extname === '' || extname === '.html') {
                    const mdPath = filePath.replace(/(\.html)?$/, '.md');
                    fs.readFile(mdPath, (mdError, mdContent) => {
                        if (mdError) {
                            fs.readFile('./404.html', (err, content) => {
                                res.writeHead(404, { 'Content-Type': 'text/html' });
                                res.end(content, 'utf-8');
                            });
                        } else {
                            const title = path.basename(mdPath, '.md');
                            const htmlContent = wrapMarkdownContent(title, mdToHtml(mdContent.toString()));
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(htmlContent, 'utf-8');
                        }
                    });
                } else {
                    fs.readFile('./404.html', (err, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            if (extname === '.md') {
                const title = path.basename(filePath, '.md');
                const htmlContent = wrapMarkdownContent(title, mdToHtml(content.toString()));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent, 'utf-8');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Documentation server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});