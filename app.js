const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const commands = fs.readFileSync('commands.txt', 'utf-8').split('\n').map(line => line.trim());

  
let address = 0;
let index = 0;

while (index < commands.length) {
  const currentCommand = commands[index];

  if (currentCommand.startsWith('20')) {
    const value = parseInt(currentCommand.slice(2));
    if (!isNaN(value)) {
      address += value;
    } else {
      console.error(`Erro: Valor inválido encontrado na posição ${index} - "${currentCommand}"`);
    }
  } else if (currentCommand.startsWith('5')) {
    const commandType = parseInt(currentCommand.slice(0, 2));
    const value = parseInt(currentCommand.slice(2));

    if (commandType === 51) {
      index++;
    } else if (commandType === 52) {
      index += 2;
    } else if (commandType === 510) {
      index += value;
    }
  }

  index++;
}

if (isNaN(address)) {
  console.error(`Erro: O valor final de "address" é NaN.`);
  address = 0; // Defina para 0 se for NaN
}

  res.json({ address });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
