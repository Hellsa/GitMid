"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitCommand = commitCommand;
const git_1 = require("../services/git");
const openai_1 = require("../services/openai");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
async function commitCommand() {
    const spinner = (0, ora_1.default)("🔍 Evaluando los cambios en git para el commit...").start();
    try {
        const diff = await (0, git_1.getDiff)();
        if (!diff) {
            spinner.fail("No se encontraron cambios en fase 'staged'. Usa `git add` primero.");
            return;
        }
        spinner.text = "🧠 Analizando código y generando mensaje inteligente con IA...";
        const message = await (0, openai_1.generateCommit)(diff);
        spinner.succeed("Mensaje de commit generado exitosamente.\n");
        console.log(chalk_1.default.green("✨ Commit Sugerido:"));
        console.log(chalk_1.default.bold.cyan(message));
        console.log(`\n${chalk_1.default.gray("Puedes usar este mensaje copiándolo, o ejecutando: ")}\n${chalk_1.default.blue(`git commit -m "${message.replace(/"/g, '\\"')}"`)}\n`);
    }
    catch (error) {
        spinner.fail("Ocurrió un error inesperado al intentar generar el commit.");
        console.error(chalk_1.default.red(error.message));
    }
}
