import { describe, expect, it } from "vitest";
import { parser } from "../parser";
import { Tags } from "../type";

describe("Parser", () => {
    describe('h1~h6', () => {
        it('# 标题1', () => {
            const result = parser('# 标题1');
            expect(result).toStrictEqual([{
                type: Tags.H1,
                children: [{ type: 'text', text: '标题1' }]
            }]);
        });

        it('一堆标题', () => {
            const result = parser(`# 标题1

## 标题2

### 标题3

#### 标题4

##### 标题5

###### 标题6`);

            expect(result).toMatchSnapshot();
        });
    });

    // describe('text', () => {
    //     it('text', () => {
    //         const result = parser('你好！');
    //         expect(result).toStrictEqual([{
    //             type: Tags.TEXT,
    //             text: '你好！'
    //         }]);
    //     });

    // });
    describe('strongText', () => {
        it('single strongText', () => {
            const result = parser('**粗体**');
            expect(result).toStrictEqual([{
                type: Tags.B,
                children: [{ type: 'text', text: '粗体' }]
            }]);
        });
        // it('multi strongText', () => {
        //     const result = parser('**粗体1** **粗体2** **粗体3**');
        //     expect(result).toStrictEqual([{
        //         type: Tags.B,
        //         children: [{ type: 'text', text: '粗体' }]
        //     }, {
        //         type: Tags.B,
        //         children: [{ type: 'text', text: '粗体1' }]
        //     }, {
        //         type: Tags.B,
        //         children: [{ type: 'text', text: '粗体3' }]
        //     }

        //     ]);
        // })
    });
    describe('strongText in h1', () => {
        it('text', () => {
            const result = parser('# 标题**1**');
            expect(result).toStrictEqual([{
                type: Tags.H1,
                children: [
                    { type: 'text', text: '标题' },
                    { type: Tags.B, children: [{ type: 'text', text: '1' }] }
                ]
            }]);
        });

    });
})