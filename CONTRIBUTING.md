# Contribuir a GitMind 🤝

¡Gracias por tu interés en involucrarte con GitMind! Este es un proyecto de código abierto y agradecemos cualquier tipo de colaboración: reportes de *bugs*, nuevas funciones, mejoras a la documentación o incluso un simple saludo.

## ¿De qué trata este proyecto? (Resumen) 🌟
GitMind nació durante la postulación al programa *GitHub Developer Program*. Su propósito principal es eliminar la fricción técnica al interactuar con repositorios Git en tu máquina local. Actúa como un puente entre tu terminal y motores de **Inteligencia Artificial (IA)** (como GitHub Modelos, OpenAI y Groq).

Cualquiera puede usar GitMind para autogenerar *Conventional Commits* prístinos basándose en su `git diff`, generar hermosas notas de versión o explicar archivos complejos, uniendo la experiencia del programador directamente a la línea de comandos de manera impecable y transparente.

## ¿Cómo empezar a colaborar? 🛠️

1. **Haz un Fork del repositorio**: Crea una copia directa a tu perfil de GitHub.
2. **Crea una rama (*Branch*)**: Nómbrala según la mejora (`feat/mi-nueva-funcion`, `fix/arreglo-de-error`).
3. **Compila localmente**: 
   Asegúrate de ejecutar `npm install` y luego `npm run build` o usar tu propia herramienta `gitmind` para hacer commit de tus progresiones.
4. **Envía tu Pull Request (PR)**: Elabora una solicitud clara hacia nuestra rama `main` explicando tus increíbles cambios.

> [!TIP]
> Dado que este proyecto utiliza GitMind propiamente, te invitamos a usar `gitmind commit` cuando nos envíes cambios. ¡Nada nos haría más felices que ver la herramienta usándose a sí misma!

## Estilo de Código 🎨
- Usamos **TypeScript** estricto (`tsconfig.json`).
- Preferimos mensajes directos o colores mediante `chalk` y `ora` para CLI atractivas.
- Mantén la modularidad en la carpeta `src`.

## Reporte de Errores (Issues) 🐛
A la hora de abrir un Issue, por favor comparte:
- La versión de Node.js donde probaste la CLI.
- La consola/terminal en la que obtuviste el error (Ej. ZSH, Bash, PowerShell).
- Los pasos necesarios para recrear el *bug*.

---
*Al contribuir en GitMind, aceptas tácitamente que tus adiciones estarán avaladas bajo la nuestra [Licencia MIT](LICENSE) vigente.*
