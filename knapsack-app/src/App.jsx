import { useState } from "react";
import { Button, TextField, Card } from "@mui/material";

const knapsack = (capacity, items) => {
  const n = items.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (items[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let w = capacity;
  let selectedItems = [];
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }

  return { maxValue: dp[n][capacity], selectedItems };
};

function App() {
  const [capacity, setCapacity] = useState(10);
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);

  const addItem = () => {
    const weight = parseInt(prompt("Peso do item:"), 10);
    const value = parseInt(prompt("Valor do item:"), 10);
    if (!isNaN(weight) && !isNaN(value)) {
      setItems([...items, { weight, value }]);
    }
  };

  const solveKnapsack = () => {
    const solution = knapsack(capacity, items);
    setResult(solution);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Problema da Mochila</h2>
      <TextField
        label="Capacidade da Mochila"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={addItem} style={{ marginTop: "10px" }}>
        Adicionar Item
      </Button>
      <Button variant="contained" color="secondary" onClick={solveKnapsack} style={{ marginTop: "10px" }}>
        Calcular Melhor Combinação
      </Button>
      {items.length > 0 && (
        <Card style={{ marginTop: "20px", padding: "10px" }}>
          <h3>Itens:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>Peso: {item.weight}, Valor: {item.value}</li>
            ))}
          </ul>
        </Card>
      )}
      {result && (
        <Card style={{ marginTop: "20px", padding: "10px" }}>
          <h3>Resultado:</h3>
          <p>Valor máximo: {result.maxValue}</p>
          <h4>Itens Selecionados:</h4>
          <ul>
            {result.selectedItems.map((item, index) => (
              <li key={index}>Peso: {item.weight}, Valor: {item.value}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default App;
