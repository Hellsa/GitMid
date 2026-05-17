import { getFileContent } from "../services/git";
import { explainCode } from "../services/openai";
import chalk from "chalk";
import ora from "ora";

export async function explainCommand(filePath: string) {
    const spinner = ora(`🔍 Leyendo el archivo ${chalk.cyan(filePath)}...`).start();

    try {
        const content = await getFileContent(filePath);

        if (!content) {
            spinner.fail(`El archivo '${filePath}' no existe o no se tiene permiso de lectura.`);
            return;
        }

        spinner.text = "🧠 Pidiendo a la IA que explique este código de manera comprensible...";
        const explanation = await explainCode(content);

        spinner.succeed("Explicación lista:\n");
        console.log(chalk.yellow("=================================================================="));
        console.log(explanation);
        console.log(chalk.yellow("=================================================================="));
    } catch (error: any) {
        spinner.fail("Ocurrió un error inesperado al intentar explicar el archivo.");
        console.error(chalk.red(error.message));
    }
}
