import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Sessão expirada. Faça login novamente.');
          navigate('/login');
        } else {
          toast.error('Não foi possível carregar a lista de usuários.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      toast.success('Sessão encerrada.');
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 md:p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 md:text-2xl">Usuários Cadastrados</h2>
          <button 
            onClick={handleLogout}
            className="rounded cursor-pointer bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4 py-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col space-y-2 border-b bg-white px-4 pb-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 md:px-6 md:pb-0 md:h-12">
                <div className="h-4 w-12 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200 md:w-1/3"></div>
                <div className="h-4 w-full rounded bg-gray-200 md:w-1/4"></div>
                <div className="hidden h-4 w-1/4 rounded bg-gray-200 md:block"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Tabela para Desktop (Oculta em telas pequenas) */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Nome</th>
                    <th className="px-6 py-3">E-mail</th>
                    <th className="px-6 py-3">Data de Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-xs">{user.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                  
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        Nenhum utilizador encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="block space-y-4 md:hidden">
              {users.map((user) => (
                <div key={user.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500">#{user.id}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
              
              {users.length === 0 && (
                <p className="py-4 text-center text-sm text-gray-500">
                  Nenhum usuário encontrado.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}