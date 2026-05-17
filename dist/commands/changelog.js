"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changelogCommand = changelogCommand;
const git_1 = require("../services/git");
const openai_1 = require("../services/openai");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
async function changelogCommand() {
    const spinner = (0, ora_1.default)("🔍 Obteniendo los últimos commits de la rama actual...").start();
    try {
        const commits = await (0, git_1.getRecentCommits)(15);
        if (!commits || commits.length === 0) {
            spinner.fail("No se encontraron commits recientes en este repositorio.");
            return;
        }
        spinner.text = "🧠 Organizando y construyendo notas de versión avanzadas con IA...";
        const changelog = await (0, openai_1.generateChangelogDesc)(commits);
        spinner.succeed("¡Changelog espectacular generado exitosamente!\n");
        console.log(chalk_1.default.magenta("📝 CHANGELOG.md\n"));
        console.log(changelog);
        console.log("\n" + chalk_1.default.gray("💡 Úsalo para crear tu próximo Release o actualizar tu CHANGELOG.md."));
    }
    catch (error) {
        spinner.fail("Ocurrió un error al construir la historia del changelog.");
        console.error(chalk_1.default.red(error.message));
    }
}
