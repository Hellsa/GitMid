#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commit_1 = require("./commands/commit");
const explain_1 = require("./commands/explain");
const changelog_1 = require("./commands/changelog");
const program = new commander_1.Command();
program
    .name("gitmind")
    .description("GitMind: Toolkit de IA para Desarrolladores de GitHub")
    .version("1.0.0");
program.command("commit")
    .description("Genera un mensaje de commit inteligente leyendo tus cambios")
    .action(commit_1.commitCommand);
program.command("explain")
    .description("Explica el código de un archivo de manera automática")
    .argument("<archivo>", "Ruta del archivo que quieres explicar")
    .action(explain_1.explainCommand);
program.command("changelog")
    .description("Genera un hermoso Changelog desde los últimos commits")
    .action(changelog_1.changelogCommand);
program.parse();
