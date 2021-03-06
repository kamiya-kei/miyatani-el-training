import React, { useContext, useEffect } from 'react';
import { UserContext } from 'utils/contexts';
import { UtilContext } from 'utils/contexts';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import HeaderMenu from 'common/HeaderMenu';

interface AdminLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const AdminLayout = (props: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { user, isLogin, loadingUser } = useContext(UserContext);
  const { util } = useContext(UtilContext);

  useEffect(() => {
    if (loadingUser) return;
    if (!isLogin) return navigate('/users/sign_in'); // ログインしてない場合はログインページへ飛ばす
    if (user.role.text !== 'admin') {
      alert('このページは管理者専用のページです');
      navigate('/');
    }
  }, [isLogin, loadingUser]);

  useEffect(() => {
    if (state) util.flashMessage(state.message);
  }, [state]);

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <MuiLink
              component={Link}
              to="/admin"
              color="inherit"
              underline="none"
            >
              タスク管理システム 管理画面
            </MuiLink>
          </Typography>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      <Container
        disableGutters
        maxWidth={props.maxWidth || 'md'}
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default AdminLayout;
