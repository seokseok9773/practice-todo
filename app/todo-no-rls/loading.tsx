import React from 'react';
import { sleep } from '@/lib/client/utiils';

export default async function loading() {
  await sleep(1500);
  return <div>loading</div>;
}
