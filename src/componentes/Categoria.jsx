import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
export default function Categoria({ categorias, onDataUpdate }) {
  const [editarCategoria, setEditarCategoria] = useState(null);

  const createCategoria = (e) => {
    e.preventDefault();
    const categoria = {
      name: e.target.nome.value,
    };

    axios.post('http://localhost:3000/categorias/create', categoria)
      .then(() => {
        onDataUpdate();
        e.target.reset();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/categorias/delete/${id}`)
      .then(() => onDataUpdate())
      .catch(error => console.error(error));
  };

  const handleEdit = (categoria) => {
    setEditarCategoria(categoria);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.nome.value,
    };

    axios.put(`http://localhost:3000/categorias/edit/${editarCategoria.id}`, data)
      .then(() => {
        onDataUpdate();
        setEditarCategoria(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="category-manager">
      <h2>Categorias</h2>
      <br />
      <form onSubmit={createCategoria}>
        <h3>Criar Categoria</h3>
        <input type="text" name="nome" placeholder="Nome" required />
        <button type="submit">Salvar</button>
      </form>

      {editarCategoria ? (
        <form onSubmit={submitEdit}>
          <h3>Editar Categoria</h3>
          <input 
            type="text" 
            name="nome" 
            defaultValue={editarCategoria.name} 
            required 
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditarCategoria(null)}>Cancelar</button>
        </form>
      ) : (
       
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                  </tr>
                  
                </thead>
                <tbody>
          {categorias.map(categoria => (
                  <tr key={categoria.id}>

                    <td>{categoria.name}</td>    
                    <td className="acoes">
                    <button onClick={() => handleEdit(categoria)}>Editar</button>
                    <button onClick={() => handleDelete(categoria.id)}>Excluir</button>
                    </td>
                  </tr>
            ))}
                </tbody>
              </table>
             
         
      )}
    </div>
  );
}

