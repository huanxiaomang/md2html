export interface TreeItem {
    el: string;
    type: 'single' | 'self' | 'wrap' | 'text' | 'inline';
    content: string[];
}


const example: TreeItem[] = [
    {
        el: 'h1',
        type: 'single',
        content: ['标题1']
    },
    {
        el: 'ul',
        type: 'wrap',
        content: [

        ]
    }
]