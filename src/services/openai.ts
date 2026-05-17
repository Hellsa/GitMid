import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.OPENAI_BASE_URL?.replace(/\/+$/, "") || "https://api.openai.com/v1";
const API_URL = `${BASE_URL}/chat/completions`;
const AI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function getHeaders() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("⛔ La variable de entorno OPENAI_API_KEY no está configurada.");
    }
    return {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    };
}

async function callOpenAI(messages: any[]) {
    try {
        const response = await axios.post(
            API_URL,
            { model: AI_MODEL, messages },
            { headers: getHeaders() }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            if (status === 429) {
                throw new Error("Error 429: Has excedido tu cuota de OpenAI (fondos insuficientes o límite de peticiones alcanzado). Revisa la facturación en platform.openai.com.");
            } else if (status === 401) {
                throw new Error("Error 401: Tu API Key de OpenAI es inválida o no está autorizada.");
            }
            throw new Error(`OpenAI API Error ${status}: ${error.response.data?.error?.message || error.message}`);
        }
        throw new Error(`OpenAI Connection Error: ${error.message}`);
    }
}

export async function generateCommit(diff: string) {
    return await callOpenAI([
        {
            role: "system",
            content: "You are an expert developer. Output only the commit message according to Conventional Commits standards without any markdown blocks or extra explanations."
        },
        {
            role: "user",
            content: `Escribe un mensaje de commit conciso en inglés describiendo este diff:\n${diff}`,
        },
    ]);
}

export async function explainCode(code: string) {
    return await callOpenAI([
        {
            role: "system",
            content: "Eres un ingeniero senior e instructor de programación."
        },
        {
            role: "user",
            content: `Por favor explica este código paso a paso y de manera clara, en español. Sé profesional y directo:\n\n${code}`,
        },
    ]);
}

export async function generateChangelogDesc(commits: readonly any[]) {
    const commitList = commits.map(c => `- ${c.hash.substring(0, 7)}: ${c.message}`).join("\n");
    return await callOpenAI([
        {
            role: "system",
            content: "You are an expert technical writer. Output ONLY raw markdown (no markdown block backticks around the output like ```markdown) representing the changelog. Group them elegantly."
        },
        {
            role: "user",
            content: `Genera un "Changelog" o notas de versión bien estructuradas en español (y usa emojis apropiados) dado este historial:\n${commitList}`,
        },
    ]);
}
