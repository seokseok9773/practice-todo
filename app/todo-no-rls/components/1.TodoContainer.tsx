'use client';

import React, { useEffect } from 'react';
import {
  createTodos,
  getTodos,
  getTodosById,
  getTodosBySearch,
  updateTodos,
  softDeleteTodos,
  hardDeleteTodos,
} from '@/apis/toods-no-rls';

export default function TodoContainer() {
  // Dev 환경에서 Inspector를 확인하면 2번 실행되지만
  // Production 환경에 useEffect는 한번만 실행된다.
  // 그러니깐 Dev Inspector에 2번 찍히는건 무시하자.
  useEffect(() => {
    hardDeleteTodos(12);
    // createTodos('NextAuthWithSupabase학습');
  }, []);

  const data = () => {
    const dataList = getTodos();
    console.log('dataList', dataList);
    return { dataList };
  };
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
