const grupos = {
    1: 'Avestruz', 2: 'Águia', 3: 'Burro', 4: 'Borboleta', 5: 'Cachorro',
    6: 'Cabra', 7: 'Carneiro', 8: 'Camelo', 9: 'Cobra', 10: 'Coelho',
    11: 'Cavalo', 12: 'Elefante', 13: 'Galo', 14: 'Gato', 15: 'Jacaré',
    16: 'Leão', 17: 'Macaco', 18: 'Porco', 19: 'Pavão', 20: 'Peru',
    21: 'Touro', 22: 'Tigre', 23: 'Urso', 24: 'Veado', 25: 'Vaca'
  };
  
  function getGrupo(numero) {
    const dezena = parseInt(numero.slice(-2));
    return Math.ceil(dezena / 4) || 25;
  }
  
  function calcular() {
    const modo = document.getElementById("modoEntrada").value;
    const texto = document.getElementById("historico").value.trim();
    const entradas = texto.match(/\d{1,3}/g) || [];
  
    const freq = {}, lastSeen = {};
    for (let i = 1; i <= 25; i++) {
      freq[i] = 0;
      lastSeen[i] = null;
    }
  
    let peso = entradas.length;
    entradas.forEach((valor, idx) => {
      let grupo;
  
      if (modo === "numeros") {
        if (valor.length < 2) return; // ignora entradas muito pequenas
        grupo = getGrupo(valor);
      } else if (modo === "grupos") {
        grupo = parseInt(valor);
        if (grupo < 1 || grupo > 25) return;
      }
  
      freq[grupo] += peso;
      if (lastSeen[grupo] === null) lastSeen[grupo] = idx;
      peso--;
    });
  
    const pontuacoes = Object.keys(grupos).map(g => {
      const freqVal = freq[g];
      const ausencia = lastSeen[g] !== null ? entradas.length - lastSeen[g] : entradas.length;
      const score = freqVal * 1 + ausencia * 2;
      return { grupo: g, nome: grupos[g], freq: freqVal, ausencia, score };
    });
  
    const ordenado = pontuacoes.sort((a, b) => b.score - a.score);
    const top3 = ordenado.slice(0, 3);
    const menos5 = pontuacoes.sort((a, b) => a.freq - b.freq).slice(0, 5);
  
    let resultado = `🔮 <strong>Sugestões com base em estatísticas:</strong><br>`;
    top3.forEach((g, i) => {
      resultado += `#${i + 1} → Grupo ${g.grupo} (${g.nome}) - Score: ${g.score}<br>`;
    });
  
    resultado += `<br>📉 <strong>Grupos Menos Frequentes:</strong><br>`;
    menos5.forEach(g => {
      resultado += `Grupo ${g.grupo} (${g.nome}) → ${g.freq}x<br>`;
    });
  
    document.getElementById("resultado").innerHTML = resultado;
  }
  
