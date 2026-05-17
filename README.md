<div align="center">
  <h1>🧠 GitMind 🚀</h1>
  <p><strong>El Developer Toolkit de IA definitivo para GitHub</strong></p>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <br /> <br />
  <p><i>Genera commits automáticos, resume changelogs y entiende código en segundos directo desde tu terminal.</i></p>
</div>

---

## ✨ Características (MVP Extendido)

- 🤖 **`gitmind commit`**: Lee tus cambios preparados (`git add`) y redacta el mensaje de commit perfecto usando Conventional Commits.
- 🔬 **`gitmind explain`**: ¿No sabes qué hace un archivo? GitMind lee el código y te lo explica paso a paso, como tu ingeniero senior favorito.
- 📝 **`gitmind changelog`**: Obtén un hermoso "Changelog" (Notas de versión) en formato Markdown revisando mágicamente tus últimos 15 commits.
- 🐙 **`gitmind pr <numero>`**: Usa la **API Oficial de GitHub** para obtener el diferencial de un Pull Request completo, generando un resumen automático e identificando bugs escondidos.

---

## ⚡ Instalación y Configuración

Primero asegúrate de tener Node.js instalado.

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/gitmind.git

# 2. Entra al directorio
cd gitmind

# 3. Instala las dependencias
npm install

# 4. Construye el proyecto y enlaza la CLI a tu sistema
npm run build

# Nota: En Linux o macOS, si falla por permisos (EACCES), usa `sudo npm link`
npm link
```

### 🔑 Configura tu OpenAI API Key

Para que GitMind cobre vida, requiere acceso a OpenAI:

1. Renombra el archivo `.env.example` a `.env` en la ruta de instalación, o crea uno con:
```env
OPENAI_API_KEY=tu_api_key_de_openai_aqui
```
2. ¡Listo! Puedes obtener tu llave desde [OpenAI Platform](https://platform.openai.com/api-keys).

---

## 🚀 Uso Rápido

> [!TIP]
> **GIF Demostrativo:** *¡Imagina aquí un gif épico mostrando GitMind en acción, creado con Screen Studio!* (Añádelo cuando grabes la interfaz)

Una vez enlazado (`npm link`), la CLI estará disponible globalmente en tus repositorios locales usando el comando `gitmind`.

### 1. Generar Autocommit

Prepara tus archivos y pide la magia:
```bash
git add .
gitmind commit
```

*Salida de Ejemplo:*  
`✨ Commit Sugerido: feat(auth): add jwt login middleware`

### 2. Explicar Código (Explain)

Apunta GitMind a un archivo complicado en tu código:
```bash
gitmind explain src/auth/login.ts
```

### 3. Crear Changelog

Antes de tu "Release", pide a GitMind que resuma la historia de tu rama actual:
```bash
gitmind changelog
```

---

## 🛠 Features FUTURAS (Roadmap)
- **v2**: Resúmenes de Pull Requests (PRs), Auto Code-Review e integración con GitHub Actions.
- **v3**: Soporte para modelos IA locales (Llama) y extensiones de VSCode.

## 🤝 Open Source y Contribución

Cualquier contribución, estrellita en GitHub (`⭐`), o upvote en *Hacker News / Reddit* es agradecido de corazón.

---
**Solicitud construida orgullosamente para el programa GitHub Developer Program** ❤️
