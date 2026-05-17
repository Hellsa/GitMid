import axios from "axios";
import { getRepoInfo } from "./git";

export async function getPRDiff(prNumber: number) {
    const { owner, repo } = await getRepoInfo();
    const token = process.env.GITHUB_TOKEN;
    const headers: any = { Accept: "application/vnd.github.v3.diff" };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, { headers });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                throw new Error(`El Pull Request #${prNumber} no existe en ${owner}/${repo} o requiere un GITHUB_TOKEN (repositorio privado).`);
            }
            throw new Error(`Excepción API GitHub [${error.response.status}]: ${error.response.data?.message || error.message}`);
        }
        throw error;
    }
}
