export function measureRunTime() {
    let startTime: number;
    let endTime: number;
    return {
        start() {
            startTime = performance.now();
        },
        end() {
            endTime = performance.now();
            const elapsedTime = endTime - startTime;
            return elapsedTime.toFixed(2);
        }
    }
}