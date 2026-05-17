import { getRecentCommits } from "../services/git";
import { generateChangelogDesc } from "../services/openai";
import chalk from "chalk";
import ora from "ora";

export async function changelogCommand() {
    const spinner = ora("🔍 Obteniendo los últimos commits de la rama actual...").start();

    try {
        const commits = await getRecentCommits(15);

        if (!commits || commits.length === 0) {
            spinner.fail("No se encontraron commits recientes en este repositorio.");
            return;
        }

        spinner.text = "🧠 Organizando y construyendo notas de versión avanzadas con IA...";
        const changelog = await generateChangelogDesc(commits);

        spinner.succeed("¡Changelog espectacular generado exitosamente!\n");
        console.log(chalk.magenta("📝 CHANGELOG.md\n"));
        console.log(changelog);
        console.log("\n" + chalk.gray("💡 Úsalo para crear tu próximo Release o actualizar tu CHANGELOG.md."));
    } catch (error: any) {
        spinner.fail("Ocurrió un error al construir la historia del changelog.");
        console.error(chalk.red(error.message));
    }
}
