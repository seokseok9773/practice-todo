import {
  getTodos,
  createTodos,
  updateTodos,
  softDeleteTodos,
  getTodosBySearch,
  getTodosById,
} from '@/apis/toods-no-rls';
import React, { useState, useEffect } from 'react';
import { Database } from '@/types/supabase';

// 방법 1
// type Todo = {
//   content: string | null;
//   created_at: string;
//   deleted_at: string | null;
//   id: number;
//   updated_at: string | null;
// };

// 방법 2
// typeGenerating으로 생성된 테이블 타입을 import 하여 넣어주는 것
type ToDoDto = Database['public']['Tables']['todos_no_ris']['Row'];

export const useTodosController = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // 방법 1 :
  // const [todos, setTodos] = useState<Todo[]>([]);
  // 방법 2 : 가져온 Database의 todo는 하나의 원소에 대한 타입이므로 List화 시키려면 []를 붙여주자
  const [todos, setTodos] = useState<ToDoDto[]>([]);
  // return todo를 불러오는 동안의 loading표시를 하기 위함

  const onGetTodos = async () => {
    // API가 실행되는 동안에 Loading 화면을 보여주기 위해
    // setLoading을 true로 했다가
    // finally에서 API가 정상적으로 작동했다면 false로 바꿔주면 된다.
    setLoading(true);
    try {
      const response = await getTodos();
      // setTodos에 response를 바로 넣으려고 하면 typescript는 오류를 뱉는다.
      // 이유는 가져오려는 setTodos의 타입과 useState의 배열이 타입이 일치 하지 않기 때문이다.
      // 가져오는 setTodos는 content 등 내용이 많은데 , Hooks 폴더의 ts 파일에는 빈 배열로만 설정 되어 있기 때문이다.
      // 그래서 type을 만들어서 넣어주면 끝난다.
      if (response) setTodos(response);
    } catch (error) {
      throw new Error('데이터를 불러오는 중 오류 발생');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 처음에 컴포넌트가 렌더링되었을 때 useEffect가 실행되어 API를 실행시키고 Data를 가져온다.
  useEffect(() => {
    onGetTodos();
  }, []);

  // 비어 있는 todoList 생성
  // 1. 비어있는 todo를 만들게 되면 데이터를 다시 가지고 와야하므로 onGetTodo를 다시 호출해야한다.
  // 2. 한쌍으로 로직이 구성되어야 한다.
  const onCreateEmptyTodos = async () => {
    await createTodos('');
    await onGetTodos();
  };

  // todoList 업데이트
  // 1. 업데이트를 했다면 todoList 항목들을 다시 가지고 와야하므로 onGetTodos()를 사용
  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };

  // todoList 삭제
  const onDeleteTodos = async (id: number) => {
    await softDeleteTodos(id);
    await onGetTodos();
  };

  // todoList 검색 ByContent
  const onSearchTodosByContent = async (contents: string) => {
    // contents에 아무런 검색값이 없을 때 대응방법.
    // contents의 값이 존재 할 때만 이 로직이 실행되도록 만들기
    if (contents) {
      // 1. 검색의 경우 결과값이 존재
      const response = await getTodosBySearch(contents);
      if (response) setTodos(response);
    } else {
      await onGetTodos();
    }
  };

  // todoList 검색 ById
  const onSearchTodosById = async (id: number) => {
    await getTodosById(id);
    await onGetTodos();
  };

  return {
    loading,
    todos, // 상태값
    onCreateEmptyTodos, // TodoList 생성
    onUpdateTodos, // TodoList 업데이트
    onDeleteTodos, // TodoList 삭제
    onSearchTodosByContent, // TodoList 내용으로 검색
    onSearchTodosById, // TodoList Id로 조회
  };
};
