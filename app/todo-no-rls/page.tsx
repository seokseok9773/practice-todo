'use client';

import React, { useEffect } from 'react';
import TodoContainer from './components/TodoContainer';
import TodoList from '@/components/ui/TodoList';

export default function page() {
  return (
    <div>
      <TodoContainer />
    </div>
  );
}
