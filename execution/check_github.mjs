import fs from 'fs';
import path from 'path';

// Leitura do arquivo .env
const envPath = path.resolve('.env');
let token = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/GITHUB_PERSONAL_KEY=([^\r\n]+)/);
  if (match) {
    token = match[1].trim();
  }
}

if (!token) {
  console.error("Token do GitHub não encontrado no .env");
  process.exit(1);
}

try {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "User-Agent": "BurguerSync-Script",
      "Accept": "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    console.error(`Erro ao consultar usuário GitHub: ${response.status} ${response.statusText}`);
    const errText = await response.text();
    console.error(errText);
    process.exit(1);
  }

  const user = await response.json();
  console.log(JSON.stringify({ login: user.login, name: user.name, html_url: user.html_url }));
} catch (err) {
  console.error("Erro na requisição:", err);
  process.exit(1);
}
