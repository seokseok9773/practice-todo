'use client';

import React, { useEffect, useState } from 'react';
import { useTodosController } from '@/app/hooks/useTodosController';

export default function TodoContainer() {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodosByContent,
    onSearchTodosById,
    onUpdateTodos,
  } = useTodosController();

  console.log('loading', loading);
  console.log('todos', todos);
  return <div>안녕하세요</div>;
}
