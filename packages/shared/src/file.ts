import { copyFile, mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';

export async function hasFile(...filePath: string[]) {
    try {
        const stats = await stat(resolve(...filePath));
        return stats.isFile();
    } catch (error) {
        return false;
    }
}


export async function hasFolder(...filePath: string[]) {
    try {
        const stats = await stat(resolve(...filePath));
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

export async function copyFileToDir(filePath: string, targetPath: string) {
    try {
        await mkdir(targetPath).catch(() => void 0);
        const file = (await readFile(filePath)).toString();
        await writeFile(join(targetPath, basename(filePath)), file);
    } catch (error) {
        return false;
    }

}

export async function copyDir(from: string, to: string) {
    await mkdir(to).catch(() => void 0)
    const list = await readdir(from)
    for (const item of list) {
        const sourcePath = resolve(from, item)
        const targetPath = resolve(to, item)
        if (await hasFile(sourcePath)) {
            copyFile(sourcePath, targetPath)
        } else {
            copyDir(sourcePath, targetPath)
        }
    }
}

export async function cleanFolder(targetPath: string) {

    try {

        await mkdir(targetPath).catch(() => void 0);
        const files = await readdir(targetPath);

        for (const file of files) {
            const filePath = resolve(targetPath, file);
            await unlink(filePath);
        }

    } catch (error) {

        return false;
    }
}

export function getFileNameByPath(path: string) {
    return basename(path, extname(path));

}