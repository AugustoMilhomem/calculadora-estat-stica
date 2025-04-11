// script.js

const grupos = [
  "Avestruz", "Águia", "Burro", "Borboleta", "Cachorro", "Cabra", "Carneiro", "Camelo",
  "Cobra", "Coelho", "Cavalo", "Elefante", "Galo", "Gato", "Jacaré", "Leão", "Macaco",
  "Porco", "Pavão", "Peru", "Touro", "Tigre", "Urso", "Veado", "Vaca"
];

function analisarResultados() {
  const input = document.getElementById("inputResultados").value.trim();
  const numeros = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n >= 1 && n <= 25);

  const contagem = Array(25).fill(0);
  numeros.forEach(n => contagem[n - 1]++);

  const gruposOrdenados = contagem
    .map((qtd, idx) => ({ grupo: idx + 1, nome: grupos[idx], qtd }))
    .sort((a, b) => b.qtd - a.qtd);

  const top5 = gruposOrdenados.slice(0, 5);
  const menos5 = gruposOrdenados.filter(g => g.qtd > 0).slice(-5);
  const ausentes = gruposOrdenados.filter(g => g.qtd === 0);

  document.getElementById("frequentes").innerHTML = `🔝 <strong>Top 5 Grupos Mais Frequentes:</strong><br>` +
    top5.map(g => `Grupo ${g.grupo} (${g.nome}) → ${g.qtd}x`).join("<br>");

  document.getElementById("ausentes").innerHTML = `📉 <strong>Grupos Menos Frequentes:</strong><br>` +
    menos5.map(g => `Grupo ${g.grupo} (${g.nome}) → ${g.qtd}x`).join("<br>");

  document.getElementById("sugestoes").innerHTML = `💡 <strong>Sugestão:</strong> Fique de olho no grupo ${top5[0].grupo} (${top5[0].nome}), que está em alta!`;

  gerarSugestoesInteligentes(top5, menos5, ausentes);
}

function gerarSugestoesInteligentes(top5, menos5, ausentes) {
  const dezenas = top5.map(g => `${(g.grupo - 1) * 4 + 1}-${g.grupo * 4}`);
  const centenas = dezenas.map(dz => dz.split("-").map(n => `${n.padStart(2, '0')}0`));
  const milhares = centenas.map(c => c.map(n => `1${n}`));
  const terno = top5.slice(0, 3).map(g => `Grupo ${g.grupo} (${g.nome})`).join(" + ");

  document.getElementById("sugestoesGrupos").innerHTML = `<strong>Grupos em Alta:</strong><br>` + top5.map(g => `Grupo ${g.grupo} (${g.nome})`).join("<br>");

  document.getElementById("sugestoesDezenas").innerHTML = `<strong>Dezenas Prováveis:</strong><br>` + dezenas.join("<br>");

  document.getElementById("sugestoesCentenas").innerHTML = `<strong>Centenas Prováveis:</strong><br>` + centenas.flat().join(", ");

  document.getElementById("sugestoesMilhares").innerHTML = `<strong>Milhares Prováveis:</strong><br>` + milhares.flat().join(", ");

  document.getElementById("sugestoesTerno").innerHTML = `<strong>Terno de Grupo:</strong><br>${terno}`;
}

