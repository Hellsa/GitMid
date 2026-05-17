"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommit = generateCommit;
exports.explainCode = explainCode;
exports.generateChangelogDesc = generateChangelogDesc;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = "https://api.openai.com/v1/chat/completions";
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
async function generateCommit(diff) {
    const response = await axios_1.default.post(API_URL, {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are an expert developer. Output only the commit message according to Conventional Commits standards without any markdown blocks or extra explanations."
            },
            {
                role: "user",
                content: `Escribe un mensaje de commit conciso en inglés describiendo este diff:\n${diff}`,
            },
        ],
    }, { headers: getHeaders() });
    return response.data.choices[0].message.content.trim();
}
async function explainCode(code) {
    const response = await axios_1.default.post(API_URL, {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Eres un ingeniero senior e instructor de programación."
            },
            {
                role: "user",
                content: `Por favor explica este código paso a paso y de manera clara, en español. Sé profesional y directo:\n\n${code}`,
            },
        ],
    }, { headers: getHeaders() });
    return response.data.choices[0].message.content.trim();
}
async function generateChangelogDesc(commits) {
    const commitList = commits.map(c => `- ${c.hash.substring(0, 7)}: ${c.message}`).join("\n");
    const response = await axios_1.default.post(API_URL, {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are an expert technical writer. Output ONLY raw markdown (no markdown block backticks around the output like ```markdown) representing the changelog. Group them elegantly."
            },
            {
                role: "user",
                content: `Genera un "Changelog" o notas de versión bien estructuradas en español (y usa emojis apropiados) dado este historial:\n${commitList}`,
            },
        ],
    }, { headers: getHeaders() });
    return response.data.choices[0].message.content.trim();
}
