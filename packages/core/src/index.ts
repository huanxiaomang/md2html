// import { compilerHTML } from "./compiler";
import markdownit from 'markdown-it';

export function mdToHTML(markdown: string) {

    const md = markdownit();
    const html = md.render(markdown);

    return html;

}
