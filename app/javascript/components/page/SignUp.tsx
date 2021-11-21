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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'module/axios_with_csrf';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const { setUser, isLogin } = useContext(UserContext);

  useEffect(() => {
    if (isLogin) navigate('/'); // 既にログイン済みの場合はトップへ飛ばす
  }, [isLogin]);

  const handleAction = (data) => {
    axios
      .post('/graphql', {
        query: `
        mutation {
          createUser(
            input: {
              name: "${data.name}"
              password: "${data.password}"
              passwordConfirmation: "${data.passwordConfirmation}"
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
        const user = res.data.data.createUser.user;
        setUser(user);
        navigate('/');
      })
      .catch((error) => {
        console.error(error.response);
        const errors = error.response.data?.errors;
        if (!errors) {
          alert(
            '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
          );
        }
        setError('name', {
          type: 'manual',
          message: 'このユーザー名は既に使われております',
        });
      });
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleAction)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="ユーザー名"
                  name="name"
                  autoComplete="username"
                  {...register('name', { required: '必須項目です' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: '必須項目です',
                    minLength: {
                      value: 6,
                      message: 'パスワードは6〜128文字で入力してください',
                    },
                    maxLength: {
                      value: 128,
                      message: 'パスワードは6〜128文字で入力してください',
                    },
                    pattern: {
                      value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]+$/i,
                      message:
                        'アルファベットと数字が必ずどちらも含んでいる必要があります',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="パスワード(再入力)"
                  type="password"
                  id="password_confirmation"
                  {...register('passwordConfirmation', {
                    required: '必須項目です',
                    validate: {
                      positive: (v) =>
                        v == getValues().password ||
                        'パスワードと一致していません',
                    },
                    deps: ['password'],
                  })}
                  error={!!errors.passwordConfirmation}
                  helperText={errors.passwordConfirmation?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/users/sign_in" variant="body2">
                  すでにアカウントをお持ちの方はこちら
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default SignUp;
