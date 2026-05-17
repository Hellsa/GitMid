"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainCommand = explainCommand;
const git_1 = require("../services/git");
const openai_1 = require("../services/openai");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
async function explainCommand(filePath) {
    const spinner = (0, ora_1.default)(`🔍 Leyendo el archivo ${chalk_1.default.cyan(filePath)}...`).start();
    try {
        const content = await (0, git_1.getFileContent)(filePath);
        if (!content) {
            spinner.fail(`El archivo '${filePath}' no existe o no se tiene permiso de lectura.`);
            return;
        }
        spinner.text = "🧠 Pidiendo a la IA que explique este código de manera comprensible...";
        const explanation = await (0, openai_1.explainCode)(content);
        spinner.succeed("Explicación lista:\n");
        console.log(chalk_1.default.yellow("=================================================================="));
        console.log(explanation);
        console.log(chalk_1.default.yellow("=================================================================="));
    }
    catch (error) {
        spinner.fail("Ocurrió un error inesperado al intentar explicar el archivo.");
        console.error(chalk_1.default.red(error.message));
    }
}
