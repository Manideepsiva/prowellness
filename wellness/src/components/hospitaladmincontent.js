import React from 'react';
import { CContainer } from '@coreui/react';
import { Outlet } from 'react-router-dom';

const Hospitalcontent = () => {
  return (
    <CContainer className="px-4" lg>
    
      <Outlet />
    </CContainer>
  );
};

export default Hospitalcontent;
