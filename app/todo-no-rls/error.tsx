'use client';

import React from 'react';
import { HashLoader, DotLoader } from 'react-spinners';
import styled from 'styled-components';
// ,mimport { DotLoader } from 'react-spinners';

const StyledHashLoader = styled(HashLoader)`
  color: black;
  display: flex;
  flex-direction: row;
`;

export default function Error() {
  return (
    <div className="flex flex-col items-center" mt-12>
      <div>
        {/* <StyledHashLoader size={100} speedMultiplier={1} /> */}
        <DotLoader />
      </div>
      <div className="font-bold my-2">loading...</div>
    </div>
  );
}
