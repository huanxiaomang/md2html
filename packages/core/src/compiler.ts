// import { TreeItem } from "./type";

// const reg_mark = /^(.+?)\s/;
// const reg_sharp = /^\#/;

// export function compilerHTML(markdown: string): string {
//     const mdArr = markdown.split('\n');
//     const htmlPool = createTree(mdArr);

//     return mdArr;
// }

// function createTree(mdArr: string[]): TreeItem[] {
//     let htmlPool: TreeItem[] = [];
//     mdArr.map((mdFragment) => {
//         const matched = mdFragment.match(reg_mark);
//         if (matched) {
//             const mark = matched[1];
//             const input = matched['input'];

//             if (reg_sharp.test(mark)) {
//                 const tag = `h${mark.length}`;
//                 const tagContent = input.replace(reg_mark, '');
//                 console.log(tag, tagContent);

//             }
//         }

//     })
// }
