import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
export default function Produtos({ produtos, fornecedores, categorias, onDataUpdate }) {
  const [editarProduto, setEditarProduto] = useState(null);

  const createProdutos = (e) => {
    e.preventDefault();
    const produto = {
      name: e.target.nome.value,
      valor: parseFloat(e.target.valor.value),
      fornecedorId: parseInt(e.target.fornecedor.value),
      categoriaId: parseInt(e.target.categoria.value),
    };

    axios.post('http://localhost:3000/produtos/create', produto)
      .then(() => {
        onDataUpdate();
        e.target.reset();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/produtos/delete/${id}`)
      .then(() => onDataUpdate())
      .catch(error => console.error(error));
  };

  const handleEdit = (produto) => {
    setEditarProduto(produto);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.nome.value,
      valor: parseFloat(e.target.valor.value),
      fornecedorId: parseInt(e.target.fornecedor.value),
      categoriaId: parseInt(e.target.categoria.value),
    };

    axios.put(`http://localhost:3000/produtos/edit/${editarProduto.id}`, data)
      .then(() => {
        onDataUpdate();
        setEditarProduto(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="product-manager">
      <h2>Produtos</h2>
      <br />
      <form onSubmit={createProdutos}>
        <h3>Criar Produto</h3>
        <input type="text" name="nome" placeholder="Nome" required />
        <input type="number" name="valor" placeholder="Valor" step="0.01" required />
        <select name="fornecedor" required>
          <option value="">Selecione um Fornecedor</option>
          {fornecedores.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <select name="categoria" required>
          <option value="">Selecione uma Categoria</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Salvar</button>
      </form>

      {editarProduto ? (
        <form onSubmit={submitEdit}>
          <h3>Editar Produto</h3>
          <input 
            type="text" 
            name="nome" 
            defaultValue={editarProduto.name} 
            required 
          />
          <input 
            type="number" 
            name="valor" 
            defaultValue={editarProduto.valor} 
            step="0.01" 
            required 
          />
          <select name="fornecedor" defaultValue={editarProduto.fornecedorId} required>
            {fornecedores.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <select name="categoria" defaultValue={editarProduto.categoriaId} required>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditingProduto(null)}>Cancelar</button>
        </form>
      ) : (
        
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Fornecedor</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>
           {produtos.map(produto => (
                  <tr key={produto.id}>
                    <td>{produto.name}</td>
                    <td>R$ {produto.valor}</td>
                    <td>{produto.fornecedor.name}</td>
                    <td>{produto.categoria.name}</td>
                    <td className="acoes">
                    <button onClick={() => handleEdit(produto)}>Editar</button>
                    <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                    </td>
                  </tr>
                  
                  
                   
            ))}
                </tbody>
              </table>
               
              
         
      )}
    </div>
  );
}

