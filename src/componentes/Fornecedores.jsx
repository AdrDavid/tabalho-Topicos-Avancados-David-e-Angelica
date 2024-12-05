import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
export default function Fornecedor({ fornecedores, onDataUpdate }) {
  const [editarFornecedor, setEditarFornecedor] = useState(null);

  const createFornecedor = (e) => {
    e.preventDefault();
    const fornecedor = {
      name: e.target.nome.value,
      contato: e.target.contato.value,
    };

    axios.post('http://localhost:3000/fornecedores/create', fornecedor)
      .then(() => {
        onDataUpdate();
        e.target.reset();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/fornecedores/delete/${id}`)
      .then(() => onDataUpdate())
      .catch(error => console.error(error));
  };

  const handleEdit = (fornecedor) => {
    setEditarFornecedor(fornecedor);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.nome.value,
      contato: e.target.contato.value,
    };

    axios.put(`http://localhost:3000/fornecedores/edit/${editarFornecedor.id}`, data)
      .then(() => {
        onDataUpdate();
        setEditarFornecedor(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="supplier-manager">
      <h2>Fornecedores</h2>
      <br />
      <form onSubmit={createFornecedor}>
        <h3>Criar Fornecedor</h3>
        <input type="text" name="nome" placeholder="Nome" required />
        <input type="text" name="contato" placeholder="Contato" required />
        <button type="submit">Salvar</button>
      </form>

      {editarFornecedor ? (
        <form onSubmit={submitEdit}>
          <h3>Editar Fornecedor</h3>
          <input 
            type="text" 
            name="nome" 
            defaultValue={editarFornecedor.name} 
            required 
          />
          <input 
            type="text" 
            name="contato" 
            defaultValue={editarFornecedor.contato} 
            required 
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditingFornecedor(null)}>Cancelar</button>
        </form>
      ) : (
       
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Contato</th>
                  </tr>
                  
                </thead>
                <tbody>
            {fornecedores.map(fornecedor => (
                    <tr key={fornecedor.id}>
                    <td>{fornecedor.name}</td>
                    <td>{fornecedor.contato}</td>
                    <td className="acoes">
                    
                        <button onClick={() => handleEdit(fornecedor)}>Editar</button>
                        <button onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
                   
                    </td>
                  </tr>
            ))}
                </tbody>
              </table>
              
         
      )}
    </div>
  );
}

