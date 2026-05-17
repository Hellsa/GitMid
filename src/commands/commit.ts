import { getDiff } from "../services/git";
import { generateCommit } from "../services/openai";
import chalk from "chalk";
import ora from "ora";

export async function commitCommand() {
    const spinner = ora("🔍 Evaluando los cambios en git para el commit...").start();

    try {
        const diff = await getDiff();

        if (!diff) {
            spinner.fail("No se encontraron cambios en fase 'staged'. Usa `git add` primero.");
            return;
        }

        spinner.text = "🧠 Analizando código y generando mensaje inteligente con IA...";
        const message = await generateCommit(diff);

        spinner.succeed("Mensaje de commit generado exitosamente.\n");
        console.log(chalk.green("✨ Commit Sugerido:"));
        console.log(chalk.bold.cyan(message));
        console.log(`\n${chalk.gray("Puedes usar este mensaje copiándolo, o ejecutando: ")}\n${chalk.blue(`git commit -m "${message.replace(/"/g, '\\"')}"`)}\n`);
    } catch (error: any) {
        spinner.fail("Ocurrió un error inesperado al intentar generar el commit.");
        console.error(chalk.red(error.message));
    }
}
