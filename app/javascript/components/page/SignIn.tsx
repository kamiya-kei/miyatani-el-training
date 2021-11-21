import React, { useContext, useEffect } from 'react';
import { UserContext } from 'utils/contexts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import BaseLayout from 'BaseLayout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'module/axios_with_csrf';

const MANUAL_ERROR_MESSAGE = {
  type: 'manual',
  message: 'ユーザー名またはパスワードが間違っています',
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user.isLogin) return;
    // 既にログイン済みの場合はトップへ飛ばす
    navigate('/');
  }, [user]);

  const handleAction = (data) => {
    console.log(data);
    axios
      .post('/graphql', {
        query: `
          mutation {
            signIn(
              input: {
                name: "${data.name}"
                password: "${data.password}"
              }
            ) {
              user {
                id
                name
              }
            }
          }
        `,
      })
      .then((res) => {
        const user = res.data.data.signIn.user;
        if (!user) {
          setError('name', MANUAL_ERROR_MESSAGE);
          setError('password', MANUAL_ERROR_MESSAGE);
          return;
        }
        setUser({ user, isLogin: true });
        navigate('/');
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  };
  React.useEffect(() => console.log(errors), [errors]);

  return (
    <BaseLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleAction)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="ユーザー名"
              name="name"
              autoComplete="username"
              autoFocus
              {...register('name', { required: '必須項目です' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: '必須項目です' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/users/sign_up" variant="body2">
                  アカウントをお持ちでない方はこちら
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default SignIn;
