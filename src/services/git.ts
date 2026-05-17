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

export async function getRepoInfo() {
    const remotes = await git.getRemotes(true);
    const origin = remotes.find((r: any) => r.name === "origin");
    if (!origin) throw new Error("No se encontró un origen 'origin' remoto en git.");

    const match = origin.refs.fetch.match(/github\.com[:\/]([^\/]+)\/([^\/\.]+)/);
    if (!match) throw new Error("No se pudo detectar un repositorio de GitHub válido en tu git remote.");

    return { owner: match[1], repo: match[2] };
}
