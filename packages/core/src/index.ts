import { markdownToHtml } from "./markdownToHtml";


export function mdToHTML(markdown: string) {

    const html = markdownToHtml(markdown);

    return html;

}
