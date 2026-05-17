import simpleGit from "simple-git";
import * as fs from "fs";

const git = simpleGit();

export async function getDiff() {
    return await git.diff(["--staged"]);
}

export async function getRecentCommits(count: number = 15) {
    const logResponse = await git.log([`-n`, `${count}`]);
    return logResponse.all;
}

export async function getFileContent(filePath: string) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, "utf-8");
    }
    return null;
}
