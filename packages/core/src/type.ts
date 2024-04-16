export interface VNode {
    type: Tags;
    children: (VNode | Text)[];
}

export interface Text {
    type: Tags.TEXT;
    text: string;
}

export enum Tags {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
    P = 'p',
    LI = 'li',
    UL = 'ul',
    OL = 'ol',
    BLOCKQUOTE = 'blockquote',
    CODE = 'code',
    B = 'b',
    IMG = 'img',
    A = 'a',
    HR = 'hr',
    TEXT = 'text',
}