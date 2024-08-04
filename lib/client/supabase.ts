import { createBrowserClient } from '@supabase/ssr';
// 브라우저의 클라이언트 :: 클라이언트(브라우저의 클라이언트 즉: NEXT JS) 웹 페이지 안에서 SUPABASE에게 AJAX요청을 보낸다.
import type { Database } from '@/types/supabase';
// @는 Root 경로를 의미한다.

export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // 오류가 날 수 있는 이유는 .env파일에서 process.env를 설정해주지 않으면 오류가 발생할 수 있다.
    // !는 확실히 있는 변수이므로 또는 변수가 존재하므로 TypeScript에게 확실하게 알려주는 방식
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
