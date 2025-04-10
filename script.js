const grupos = {
    1:  [0,1,2,3],   2:  [4,5,6,7],   3:  [8,9,10,11],  4:  [12,13,14,15],
    5:  [16,17,18,19], 6:  [20,21,22,23], 7:  [24,25,26,27], 8:  [28,29,30,31],
    9:  [32,33,34,35], 10: [36,37,38,39], 11: [40,41,42,43], 12: [44,45,46,47],
    13: [48,49,50,51], 14: [52,53,54,55], 15: [56,57,58,59], 16: [60,61,62,63],
    17: [64,65,66,67], 18: [68,69,70,71], 19: [72,73,74,75], 20: [76,77,78,79],
    21: [80,81,82,83], 22: [84,85,86,87], 23: [88,89,90,91], 24: [92,93,94,95],
    25: [96,97,98,99]
  };
  
  const animais = {
    1: "Avestruz", 2: "Águia", 3: "Burro", 4: "Borboleta", 5: "Cachorro",
    6: "Cabra", 7: "Carneiro", 8: "Camelo", 9: "Cobra", 10: "Coelho",
    11: "Cavalo", 12: "Elefante", 13: "Galo", 14: "Gato", 15: "Jacaré",
    16: "Leão", 17: "Macaco", 18: "Porco", 19: "Pavão", 20: "Peru",
    21: "Touro", 22: "Tigre", 23: "Urso", 24: "Veado", 25: "Vaca"
  };
  
  function getGrupo(dezena) {
    for (let grupo in grupos) {
      if (grupos[grupo].includes(dezena)) {
        return parseInt(grupo);
      }
    }
    return null;
  }
  
  function analisarResultados() {
    const entrada = document.getElementById("historico").value;
    const numeros = entrada.split(/[\s,;\n]+/).map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    const contagemGrupos = {};
  
    // Inicializa todos os grupos com 0
    for (let i = 1; i <= 25; i++) {
      contagemGrupos[i] = 0;
    }
  
    for (let num of numeros) {
      const dezena = num % 100;
      const grupo = getGrupo(dezena);
      if (grupo) {
        contagemGrupos[grupo]++;
      }
    }
  
    const ordenado = Object.entries(contagemGrupos).sort((a, b) => b[1] - a[1]);
  
    const top5 = ordenado.slice(0, 5);
    const menos5 = ordenado.slice(-5);

  
    let resultado = `<h3>🔝 Top 5 Grupos Mais Frequentes:</h3><ul>`;
    for (let [grupo, freq] of top5) {
      resultado += `<li>Grupo ${grupo} (${animais[grupo]}) → ${freq}x</li>`;
    }
    resultado += `</ul>`;
  
    resultado += `<h3>📉 Grupos Menos Frequentes:</h3><ul>`;
    for (let [grupo, freq] of menos5) {
      resultado += `<li>Grupo ${grupo} (${animais[grupo]}) → ${freq}x</li>`;
    }
    resultado += `</ul>`;
  
    resultado += `<p><strong>Sugestão:</strong> Fique de olho no grupo <strong>${top5[0][0]} (${animais[top5[0][0]]})</strong>, que está em alta!</p>`;
  
    document.getElementById("resultado").innerHTML = resultado;
  }
  