import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Produtos from './componentes/Produtos';
import Fornecedor from './componentes/Fornecedores';
import Categoria from './componentes/Categoria';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:3000/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:3000/categorias')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="app-container">
      <h1>Gestão de Produtos</h1>
      <div className="container">
        <Produtos 
          produtos={produtos} 
          fornecedores={fornecedores} 
          categorias={categorias} 
          onDataUpdate={fetchData} 
        />
        <Fornecedor
          fornecedores={fornecedores} 
          onDataUpdate={fetchData} 
        />
        <Categoria 
          categorias={categorias} 
          onDataUpdate={fetchData} 
        />
      </div>
    </div>
  );
}

export default App;