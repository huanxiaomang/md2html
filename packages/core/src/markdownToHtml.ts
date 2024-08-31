// 正则表达式常量
const HEADER_REGEX = /^(#{1,6}) /;
const UNORDERED_LIST_ITEM_REGEX = /^- /;
const ORDERED_LIST_ITEM_REGEX = /^\d+\. /;
const HORIZONTAL_RULE_REGEX = /^---$/;
const BLOCKQUOTE_REGEX = /^> /;
const INLINE_CODE_REGEX = /`(.*?)`/g;
const STRONG_TEXT_REGEX = /\*\*(.*?)\*\*/g;
const EMPHASIS_TEXT_REGEX = /__(.*?)__/g;
const EMPHASIS_TEXT_ALT_REGEX = /\*(.*?)\*/g;
const EMPHASIS_TEXT_ALT2_REGEX = /_(.*?)_/g;
const IMAGE_TAG_REGEX = /!\[(.*?)\]\((.*?)\)/g;
const LINK_TAG_REGEX = /\[(.*?)\]\((.*?)\)/g;

// HTML 标签转换函数
const wrapInTag = (tag: string, content: string): string => `<${tag}>${content}</${tag}>`;

// 处理行内容
const processLine = (line: string, context: {
    inCodeBlock: boolean;
    inBlockquote: boolean;
    listStack: string[];
    html: string;
}): void => {
    if (context.inCodeBlock) {
        if (line.startsWith('```')) {
            context.html += '</code></pre>';
            context.inCodeBlock = false;
        } else {
            context.html += `${line}\n`;
        }
        return;
    }

    if (line.startsWith('```')) {
        closeLists(context);
        closeBlockquote(context);
        context.html += '<pre><code>';
        context.inCodeBlock = true;
        return;
    }

    if (BLOCKQUOTE_REGEX.test(line)) {
        if (!context.inBlockquote) {
            closeLists(context);
            context.html += '<blockquote>';
            context.inBlockquote = true;
        }
        line = line.replace(BLOCKQUOTE_REGEX, '');
    } else if (context.inBlockquote && !BLOCKQUOTE_REGEX.test(line)) {
        closeBlockquote(context);
    }

    const headerMatch = HEADER_REGEX.exec(line);
    if (headerMatch) {
        closeLists(context);
        closeBlockquote(context);
        const headerLevel = headerMatch[1].length;
        const headerText = line.substring(headerMatch[0].length);
        context.html += wrapInTag(`h${headerLevel}`, headerText);
        return;
    }

    if (UNORDERED_LIST_ITEM_REGEX.test(line)) {
        if (!context.listStack.includes('ul')) {
            context.html += '<ul>';
            context.listStack.push('ul');
        }
        line = line.replace(UNORDERED_LIST_ITEM_REGEX, '');
        context.html += wrapInTag('li', line);
        return;
    }

    if (ORDERED_LIST_ITEM_REGEX.test(line)) {
        if (!context.listStack.includes('ol')) {
            context.html += '<ol>';
            context.listStack.push('ol');
        }
        line = line.replace(ORDERED_LIST_ITEM_REGEX, '');
        context.html += wrapInTag('li', line);
        return;
    }

    if (context.listStack.length && !ORDERED_LIST_ITEM_REGEX.test(line) && !UNORDERED_LIST_ITEM_REGEX.test(line)) {
        closeLists(context);
    }

    if (HORIZONTAL_RULE_REGEX.test(line)) {
        context.html += '<hr />';
        return;
    }

    line = line
        .replace(IMAGE_TAG_REGEX, '<img src="$2" alt="$1"/>')
        .replace(LINK_TAG_REGEX, '<a href="$2">$1</a>')
        .replace(STRONG_TEXT_REGEX, '<strong>$1</strong>')
        .replace(EMPHASIS_TEXT_REGEX, '<strong>$1</strong>')
        .replace(EMPHASIS_TEXT_ALT_REGEX, '<em>$1</em>')
        .replace(EMPHASIS_TEXT_ALT2_REGEX, '<em>$1</em>')
        .replace(INLINE_CODE_REGEX, '<code>$1</code>');

    if (line.trim()) {
        context.html += wrapInTag('p', line);
    }
};

// 关闭所有列表标签
const closeLists = (context: { listStack: string[]; html: string }) => {
    while (context.listStack.length) {
        const tag = context.listStack.pop();
        context.html += `</${tag}>`;
    }
};

// 关闭引用块
const closeBlockquote = (context: { inBlockquote: boolean; html: string }) => {
    if (context.inBlockquote) {
        context.html += '</blockquote>';
        context.inBlockquote = false;
    }
};

// 主转换函数
export function markdownToHtml(markdown: string): string {
    const lines = markdown.split('\n');
    const context = {
        listStack: [] as string[],
        inBlockquote: false,
        inCodeBlock: false,
        html: ''
    };

    lines.forEach(line => processLine(line, context));

    closeBlockquote(context);
    if (context.inCodeBlock) {
        context.html += '</code></pre>';
    }
    closeLists(context);

    return context.html;
}
