import { markdownToHtml } from "./markdownToHtml";


export function mdToHTML(markdown: string) {

    const html = markdownToHtml(markdown);
    const markdown1 = `
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
    console.log(markdownToHtml(markdown1));

    return 'sb';

}
