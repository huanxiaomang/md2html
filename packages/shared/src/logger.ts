import pkg from 'chalk';
const { bgBlue, bgRed, dim, bgBlueBright } = pkg;

function createServerLogger() {
    return {
        info: (msg: string) => {
            console.info(bgBlue.bold(' WS '), msg);
        },
        error: (msg: string) => {
            console.info(bgRed.bold(' ERROR '), msg);
        },
        infoTime: (msg: string) => {
            const requestTime = new Date();
            const formattedTime = `${requestTime.toLocaleDateString()} ${requestTime.toLocaleTimeString()}`;

            console.info(bgBlue.bold(' WS '), dim(formattedTime), msg);
        },
        mth: (msg: string) => {
            console.info(bgBlueBright.bold(' Md2HTML '), msg);
            console.log();

        },
    }
}

export const logger = createServerLogger();