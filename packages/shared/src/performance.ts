export function measureRunTime(fn:()=>void) {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    return {
        end(endFn:(elapsedTime:string) => void) {
            endFn(elapsedTime.toFixed(2));
        }
    }
}
