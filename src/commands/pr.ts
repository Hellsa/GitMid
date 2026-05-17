import { getPRDiff } from "../services/github";
import { summarizePR } from "../services/openai";
import chalk from "chalk";
import ora from "ora";

export async function prCommand(prNumberString: string) {
    const prNumber = parseInt(prNumberString, 10);
    if (isNaN(prNumber)) {
        console.error(chalk.red("⛔ Por favor provee un número de PR válido. Ejemplo: gitmind pr 12"));
        return;
    }

    const spinner = ora(`🔍 Obteniendo datos del PR #${prNumber} usando la API oficial de GitHub...`).start();

    try {
        const diff = await getPRDiff(prNumber);

        spinner.text = "🧠 Analizando arquitectura y generando un Code Review...";
        const report = await summarizePR(diff);

        spinner.succeed(`Code Review interactivo para el Pull Request #${prNumber} completado:\n`);
        console.log(chalk.gray("========================================================="));
        console.log(report);
        console.log(chalk.gray("========================================================="));
        console.log(`\n${chalk.blue("💡 Copia este resumen e insértalo como un Review Oficial de GitHub.")}\n`);
    } catch (error: any) {
        spinner.fail("La auditoría de PR falló.");
        console.error(chalk.red(error.message));
    }
}
