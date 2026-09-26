const projectId = "burguesync123";
const apiKey = "AIzaSyCgYjWUf5FAkB9kbqmBuTz6xt-DDXfG0fE";

const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pedidos?key=${apiKey}`;

try {
  const res = await fetch(url);
  const data = await res.json();
  console.log("Status Firestore REST:", res.status);
  console.log("Resposta Firestore:", JSON.stringify(data));
} catch (err) {
  console.error("Erro ao testar Firebase:", err);
}
