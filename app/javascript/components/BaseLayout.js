import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';

const BaseLayout = (props) => {
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="none">タスク管理システム</MuiLink>
          </Typography>
          <Button component={Link} to="/tasks/new" color="inherit">タスク作成</Button>
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        {props.children}
      </Container>
    </>
  );
}

export default BaseLayout;
