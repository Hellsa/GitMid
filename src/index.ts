#!/usr/bin/env node

import { Command } from "commander";
import { commitCommand } from "./commands/commit";
import { explainCommand } from "./commands/explain";
import { changelogCommand } from "./commands/changelog";

const program = new Command();

program
    .name("gitmind")
    .description("GitMind: Toolkit de IA para Desarrolladores de GitHub")
    .version("1.0.0");

program.command("commit")
    .description("Genera un mensaje de commit inteligente leyendo tus cambios")
    .action(commitCommand);

program.command("explain")
    .description("Explica el código de un archivo de manera automática")
    .argument("<archivo>", "Ruta del archivo que quieres explicar")
    .action(explainCommand);

program.command("changelog")
    .description("Genera un hermoso Changelog desde los últimos commits")
    .action(changelogCommand);

program.parse();
