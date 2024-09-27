'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { usePocketBase } from '@/lib/Pocketbase';
import { useAuth } from '@/context/Auth';
import { AuthProps } from '@/types/Auth';

interface FormData {
  user: string;
  password: string;
}

const LoginPage = () => {
  const pb = usePocketBase(); 
  const { login } = useAuth();
  
  const [data, setData] = useState<FormData>({
    user: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formMutation = useMutation({
    mutationFn: async () => {
      if (!pb) throw new Error('PocketBase não está disponível');
      return await pb
        .collection('users')
        .authWithPassword(data.user, data.password);
    },
    onSuccess: (authData) => {
      login(authData as unknown as AuthProps);
    },
    onError: () => {
      setErrorMessage('Usuário ou senha incorretos.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Entrar no sistema
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700"
            >
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="user"
              className="mt-1 p-2 bg-[#fff] w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Digite seu usuário"
              value={data.user}
              onChange={(e) => setData({ ...data, user: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border bg-[#fff] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Digite sua senha"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-base font-medium py-3 mt-4 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
              disabled={!data.password || !data.user || formMutation.isPending}
            >
              {formMutation.isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
