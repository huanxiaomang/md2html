import { Tags, VNode } from "./type";

const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#/;
const reg_heading = /^(#{1,6}\s+)/;
const reg_blockQuote = /^(\>\s+)/;
const reg_unorderedList = /^((\*|-){1}\s+)/;
const reg_image = /\!\[(.*?)\]\((.*?)\)/g;
const reg_strongText = /\*{2}(.*?)\*{2}/g;
const reg_codeLine = /\`{1}(.*?)\`{1}/g;

export function parser(markdown: string): VNode[] {
    const reader = new Reader(markdown);
    const vnodes: VNode[] = reader.run();
    return vnodes;
}

class Parser {
    constructor() { }



    public parser(line: string): VNode {
        const advance = (step: number) => {
            line = line.slice(step);
        }

        if (reg_heading.test(line)) {

            const text = line.split('# ')[1];
            const first = line.indexOf('#');
            let end = first;
            while (line[end += 1] === '#') { }
            const level = end - first;
            return this.createHeading(text, level as any);

        }

        if (reg_strongText.test(line)) {
            reg_strongText.exec(line);

            const text = reg_strongText.exec(line)[1];
            return this.createStrongText(text);

        }
    }

    private createHeading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6): VNode {

        return {
            type: Tags[`H${level}`],
            children: [{
                type: Tags.TEXT,
                text: text
            }]
        };
    }

    private createStrongText(text: string): VNode {
        return {
            type: Tags.B,
            children: [{
                type: Tags.TEXT,
                text: text
            }]
        };
    }

    public isEmptyLine(line: string): boolean {
        return line.length === 0;
    }


}

class Reader {
    private lines: string[];
    private VNodes: VNode[] = [];
    constructor(private text: string) {
        this.lines = this.splitLines(text);
    }

    private splitLines(text: string): string[] {
        return text.split('\n');
    }

    public run() {
        const { parser, isEmptyLine } = new Parser();

        while (this.lines.length > 0) {
            const currentLine = this.lines.shift();
            if (isEmptyLine(currentLine)) continue;

            const vNode: VNode = parser(currentLine);

            this.VNodes.push(vNode);
        }

        return this.VNodes;
    }
}