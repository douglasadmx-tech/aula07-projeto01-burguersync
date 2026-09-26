import fs from 'fs';
import path from 'path';

const outDir = path.resolve('.tmp/stitch');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const assets = [
  {
    name: 'logo.svg',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzYyNjViNzJlMzEwMmE5YTI5ZDkzMjlkNmM1EgsSBxCCs5ns4wkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTA2OTUxNDgwMzAzNjE1Njc2Nw&filename=&opi=89354086'
  },
  {
    name: 'cardapio_delivery.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzYyNmIxYmYyMDEwNzllN2U0ZWRiMGUzMDA5EgsSBxCCs5ns4wkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTA2OTUxNDgwMzAzNjE1Njc2Nw&filename=&opi=89354086'
  },
  {
    name: 'painel_cozinha.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzYyNmE0ODc4MWQwMjA3OWEzMjIzMTM2Njk1EgsSBxCCs5ns4wkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTA2OTUxNDgwMzAzNjE1Njc2Nw&filename=&opi=89354086'
  },
  {
    name: 'customizacao.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzYyODQyNWZjYjcwMmE5YjRkZTJjMDVjMTZiEgsSBxCCs5ns4wkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTA2OTUxNDgwMzAzNjE1Njc2Nw&filename=&opi=89354086'
  },
  {
    name: 'smash_burguer.png',
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1VbJx1xe3ZioKQ0fkUSYmpPxUS_x6F-EiYvHG1Kvu8l2SOyZDoIvMSBoOa7Wh_a3Q89LUOmV1fnVaDjWoVAjlBYFm_L9X5T0x9anZqtbGc3ifOfH7WY2D6g5kg8KExw9EKkjLWC1yMHFQhI0xHscXaqLxjKJPmLN-1rTrdLh-XNMMZ0vMSMXNvO_I8D2zMmBMLo3cfw_hfb6q4SjDp2ZmIDvflAN_lrkf3UeOJ6LFaevyzdBWmHkOqH89nU'
  }
];

for (const item of assets) {
  try {
    const res = await fetch(item.url);
    if (!res.ok) {
      console.error(`Falha ao baixar ${item.name}: ${res.status}`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const filePath = path.join(outDir, item.name);
    fs.writeFileSync(filePath, buffer);
    console.log(`Salvo: ${item.name} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Erro ao baixar ${item.name}:`, err);
  }
}
