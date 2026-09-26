import fs from 'fs';
import path from 'path';

// Leitura do token
const envContent = fs.readFileSync('.env', 'utf-8');
const tokenMatch = envContent.match(/GITHUB_PERSONAL_KEY=([^\r\n]+)/);
if (!tokenMatch) {
  console.error("Token não encontrado no .env");
  process.exit(1);
}
const token = tokenMatch[1].trim();

const REPO_NAME = "aula07-projeto01-burguersync";
const REPO_DESC = "🍔 BurguerSync Ourinhos - Plataforma de Delivery e KDS em Tempo Real desenvolvida com Google Antigravity e Firebase Firestore";

const headers = {
  "Authorization": `Bearer ${token}`,
  "User-Agent": "BurguerSync-Deployer",
  "Accept": "application/vnd.github+json"
};

async function api(endpoint, options = {}) {
  const url = `https://api.github.com${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) }
  });
  return res;
}

// 1. Obter usuário autenticado
const userRes = await api("/user");
if (!userRes.ok) {
  console.error("Falha ao obter usuário:", userRes.status, await userRes.text());
  process.exit(1);
}
const user = await userRes.json();
const owner = user.login;
console.log(`👤 Usuário GitHub autenticado: ${owner}`);

// 2. Verificar ou Criar Repositório
let repoRes = await api(`/repos/${owner}/${REPO_NAME}`);
if (repoRes.status === 404) {
  console.log(`📦 Criando repositório público: ${REPO_NAME}...`);
  const createRes = await api("/user/repos", {
    method: "POST",
    body: JSON.stringify({
      name: REPO_NAME,
      description: REPO_DESC,
      private: false,
      auto_init: true
    })
  });
  if (!createRes.ok) {
    console.error("Erro ao criar repositório:", createRes.status, await createRes.text());
    process.exit(1);
  }
  console.log("✅ Repositório criado com sucesso!");
  // Aguarda 2 segundos para propagação do repositório inicializado
  await new Promise(r => setTimeout(r, 2000));
} else {
  console.log(`📦 Repositório ${REPO_NAME} já existe.`);
}

// 3. Coletar arquivos elegíveis (Ignorando .env, .tmp, node_modules, etc.)
const ignoredPatterns = ['.env', '.tmp', 'node_modules', '.git', 'package-lock.json'];

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (ignoredPatterns.includes(file)) continue;
    const fullPath = path.join(dir, file);
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

    if (ignoredPatterns.some(p => relPath.startsWith(p))) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(relPath);
    }
  }
  return fileList;
}

const filesToUpload = getAllFiles('.');
console.log(`\n📄 Encontrados ${filesToUpload.length} arquivos para publicação:`);

// 4. Upload de arquivos via GitHub Contents API
for (const relPath of filesToUpload) {
  const contentBuffer = fs.readFileSync(relPath);
  const base64Content = contentBuffer.toString('base64');

  // Checar se arquivo já existe para obter SHA
  let fileSha = undefined;
  const checkFile = await api(`/repos/${owner}/${REPO_NAME}/contents/${relPath}`);
  if (checkFile.ok) {
    const existing = await checkFile.json();
    fileSha = existing.sha;
  }

  const putBody = {
    message: `feat(core): sync ${relPath} via Google Antigravity`,
    content: base64Content,
    branch: "main"
  };
  if (fileSha) {
    putBody.sha = fileSha;
  }

  const uploadRes = await api(`/repos/${owner}/${REPO_NAME}/contents/${relPath}`, {
    method: "PUT",
    body: JSON.stringify(putBody)
  });

  if (uploadRes.ok) {
    console.log(`  ✓ Enviado: ${relPath}`);
  } else {
    console.warn(`  ✗ Falha ao enviar ${relPath}: ${uploadRes.status}`, await uploadRes.text());
  }
}

// 5. Habilitar GitHub Pages (se suportado)
try {
  const pagesRes = await api(`/repos/${owner}/${REPO_NAME}/pages`, {
    method: "POST",
    body: JSON.stringify({
      source: {
        branch: "main",
        path: "/"
      }
    })
  });
  if (pagesRes.ok) {
    console.log("🌐 GitHub Pages habilitado com sucesso!");
  }
} catch (e) {
  // Pages pode já estar ativo ou requerer permissão
}

console.log("\n=======================================================");
console.log(`🚀 Projeto publicado com sucesso no GitHub!`);
console.log(`🔗 Repositório: https://github.com/${owner}/${REPO_NAME}`);
console.log(`🌐 GitHub Pages: https://${owner}.github.io/${REPO_NAME}/`);
console.log("=======================================================\n");
