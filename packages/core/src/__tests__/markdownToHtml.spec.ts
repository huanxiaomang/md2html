import { describe, expect, it } from 'vitest';
import { markdownToHtml } from '../markdownToHtml';

describe('markdownToHtml', () => {
    it('should convert a single line of plain text', () => {
        const markdown = 'Just some plain text.';
        const expectedHtml = '<p>Just some plain text.</p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert multiple paragraphs of plain text', () => {
        const markdown = 'First paragraph.\n\nSecond paragraph.';
        const expectedHtml = '<p>First paragraph.</p><p>Second paragraph.</p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle text with no formatting', () => {
        const markdown = 'This is a simple text with no special Markdown syntax.';
        const expectedHtml = '<p>This is a simple text with no special Markdown syntax.</p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert headers without nested elements', () => {
        const markdown = '# Header 1\n## Header 2\n### Header 3';
        const expectedHtml = '<h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert bold text', () => {
        const markdown = '**Bold Text**';
        const expectedHtml = '<p><strong>Bold Text</strong></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert italic text', () => {
        const markdown = '*Italic Text*';
        const expectedHtml = '<p><em>Italic Text</em></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert inline code', () => {
        const markdown = '`console.log()`';
        const expectedHtml = '<p><code>console.log()</code></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert code blocks', () => {
        const markdown = '```\nfunction test() {\n  return true;\n}\n```';
        const expectedHtml = '<pre><code>function test() {\n  return true;\n}\n</code></pre>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert links without nested elements', () => {
        const markdown = '[hxm](http://czstudio.tech)';
        const expectedHtml = '<p><a href="http://czstudio.tech">hxm</a></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert images without nested elements', () => {
        const markdown = '![Alt text](https://img.bosszhipin.com/static/file/2024/mctx1cdg891707037634775.png)';
        const expectedHtml = '<p><img src="https://img.bosszhipin.com/static/file/2024/mctx1cdg891707037634775.png" alt="Alt text"/></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert ordered lists without nested elements', () => {
        const markdown = '1. First item\n2. Second item\n3. Third item';
        const expectedHtml = '<ol><li>First item</li><li>Second item</li><li>Third item</li></ol>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should convert unordered lists without nested elements', () => {
        const markdown = '- First item\n- Second item\n- Third item';
        const expectedHtml = '<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle blockquotes without nested elements', () => {
        const markdown = '> This is a blockquote.';
        const expectedHtml = '<blockquote><p>This is a blockquote.</p></blockquote>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle horizontal rules', () => {
        const markdown = '---';
        const expectedHtml = '<hr />';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle empty input', () => {
        const markdown = '';
        const expectedHtml = '';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle mixed content', () => {
        const markdown = '# Header\n\n**Bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n`inline code`';
        const expectedHtml = '<h1>Header</h1><p><strong>Bold</strong> and <em>italic</em> text.</p><ul><li>List item 1</li><li>List item 2</li></ul><p><code>inline code</code></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle multiple code blocks', () => {
        const markdown = '```\nCode block 1\n```\n\n```\nCode block 2\n```';
        const expectedHtml = '<pre><code>Code block 1\n</code></pre><pre><code>Code block 2\n</code></pre>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle mixed lists', () => {
        const markdown = '- Unordered item 1\n- Unordered item 2\n\n1. Ordered item 1\n2. Ordered item 2';
        const expectedHtml = '<ul><li>Unordered item 1</li><li>Unordered item 2</li></ul><ol><li>Ordered item 1</li><li>Ordered item 2</li></ol>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should close open lists and blockquotes before new content', () => {
        const markdown = '- List item\n> Blockquote\nSome other text';
        const expectedHtml = '<ul><li>List item</li></ul><blockquote><p>Blockquote</p></blockquote><p>Some other text</p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle closing open lists and blockquotes at end of input', () => {
        const markdown = '- List item\n> Blockquote';
        const expectedHtml = '<ul><li>List item</li></ul><blockquote><p>Blockquote</p></blockquote>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should close a code block at the end of input', () => {
        const markdown = '```\nCode block\n```';
        const expectedHtml = '<pre><code>Code block\n</code></pre>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle an open code block with no closing backticks', () => {
        const markdown = '```\nOpen code block';
        const expectedHtml = '<pre><code>Open code block\n</code></pre>'; // Ensure the code block is closed properly
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should match snapshot for mixed content', () => {
        const markdown = '# Header\n\n**Bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n`inline code`';
        expect(markdownToHtml(markdown)).toMatchSnapshot();
    });

    it('should match snapshot for complex document', () => {
        const markdown = `
# Main Header

**Bold text** and *italic text*.

1. First ordered item
2. Second ordered item

- First unordered item
- Second unordered item

> A blockquote

\`\`\`
Code block
\`\`\`

[Link](http://example.com)
![Image](http://example.com/image.png)
        `;
        expect(markdownToHtml(markdown)).toMatchSnapshot();
    });

    it('should handle nested images within links', () => {
        const markdown = '[![Image](http://example.com/image.png)](http://example.com)';
        const expectedHtml = '<p><a href="http://example.com"><img src="http://example.com/image.png" alt="Image"/></a></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle nested links within strong', () => {
        const markdown = '**[This is a link](http://example.com)**';
        const expectedHtml = '<p><strong><a href="http://example.com">This is a link</a></strong></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

    it('should handle nested images within strong', () => {
        const markdown = '**![Image](http://example.com/image.png)**';
        const expectedHtml = '<p><strong><img src="http://example.com/image.png" alt="Image"/></strong></p>';
        expect(markdownToHtml(markdown)).toBe(expectedHtml);
    });

});
