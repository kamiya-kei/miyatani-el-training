import React, { useContext, useEffect } from 'react';
import { UtilContext } from 'utils/contexts';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import HeaderMenu from 'common/HeaderMenu';

const BaseLayout = (props: { children: React.ReactNode }) => {
  const { util } = useContext(UtilContext);
  const { state } = useLocation();

  useEffect(() => {
    if (state) util.flashMessage(state.message);
  }, [state]);

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="none">
              タスク管理システム
            </MuiLink>
          </Typography>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default BaseLayout;
