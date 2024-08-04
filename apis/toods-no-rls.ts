'use client';

import { createSupabaseBrowserClient } from '@/lib/client/supabase';

// 모든 get함수에서 사용될 supabase 변수
// client단 supabase에서 미리 만들어 놓은 browserClient 함수를 사용한다.
const supabase = createSupabaseBrowserClient();

// todoList 가져오기
export const getTodos = async () => {
  const result = await supabase
    .from('todos_no_ris')
    .select('*')
    .is('deleted_at', null)
    .order('id', {
      ascending: false,
    });
  return result.data;
};

// todoList Id값으로 가져오기 ( 수정을 위한 조회, 선택된 데이터들만 삭제, 선택된 데이터 업데이트 정보에 활용 하겠지..?)
export const getTodosById = async (id: number) => {
  const result = await supabase
    .from('todos_no_ris')
    .select('*')
    .is('deleted_at', null)
    // id값만 선택해서 가져올 때
    .eq('id', id);
  return result.data;
};

// TodoListSearch함수로 필터링 하기
export const getTodosBySearch = async (contents: string) => {
  const result = await supabase
    .from('todos_no_ris')
    .select('*')
    .is('deleted_at', null)
    // where 절 조건 like과 동일한 기능
    .ilike('content', `%${contents}%`)
    .order('id', { ascending: false })
    .limit(500);
  return result.data;
};

// TodoList 생성하기 즉 Post 요청을 보내겠다!!!
// create 시킬 때는 무조건 인자 값으로 content를 넣어주자... contents는 안되더라
// 아 멍청했다. 1분뒤에 깨달았는데 Supabase todo_ris Table의 컬럼명에 contents가 없구나 content구나........
export const createTodos = async (content: string) => {
  const result = await supabase
    .from('todos_no_ris')
    .insert({ content })
    .select();
  return result.data;
};

// TodoList 업데이트 하기
export const updateTodos = async (id: number, content: string) => {
  const result = await supabase
    .from('todos_no_ris')
    // 원래 {key:value} 형태이므로 content: content라고 쓰지만 key와 value값이 같아서 content만 넣어도 됨
    // .updata({ content })
    .update({
      content,
      updated_at: new Date().toISOString() + 9,
      // key값은 updated_at : value는 시간을 가져오기 위한 Date 객체를 생성해서 ISO로 가져오기
      // 영국과 대한민국은 8시간이 차이난다.......... 근데 +9를 해주면 supabase 시간에 한국 시간에 맞춰 저장된다.
      // ISOString()으로 가져오게 되면 값 끝에 Z가 붙게 되는데 Z가 의미하는 것은 UTC+0 영국 천문대 기준 시간
    })
    .eq('id', id)
    // select구문을 eq구문보다 먼저 쓰면 안되는 이유 : update하려고 함 -> from 테이블 고르고 -> update -> 할 항목 고르고 -> id 까지 고른 후 업데이트가 완료되면 select로 변경된 데이터 가져와야 하니깐
    .select('*');
  return result.data;
};

// TodoList SoftDelete
export const softDeleteTodos = async (id: number) => {
  const result = await supabase
    .from('todos_no_ris')
    .update({
      deleted_at: new Date().toISOString() + 9,
      // 언제 deleted_at이 되었는지 이미 알 수 있지만
      // 요구사항에 따라서 updata_at도 같이 시간을 변경해줄 수 있다.
    })
    .eq('id', id)
    .select('*');
  return result.data;
};

// TodoList HardDelete
// 실제로는 hardDelete는 구현을 잘 하지 않으므로 생각하지말자...?
export const hardDeleteTodos = async (id: number) => {
  const result = await supabase
    .from('todos_no_ris')
    .delete()
    .eq('id', id)
    .select('*');
  return result.data;
};
