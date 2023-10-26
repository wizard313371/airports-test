import React, { ReactNode } from 'react';
import { Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
