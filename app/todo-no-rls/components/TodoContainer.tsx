'use client';

import React, { useEffect, useState } from 'react';
import { useTodosController } from '@/app/hooks/useTodosController';
import TodoList from '@/components/ui/TodoList';

export default function TodoContainer() {
  const { loading, todos } = useTodosController();

  console.log('loading', loading);
  console.log('todos', todos);
  return (
    <div>
      <TodoList
        sharedUserFullName="test user"
        ownerUserId="123123"
        loading={loading}
        todoListData={todos}
      />
    </div>
  );
}
