import React, { useContext, useEffect } from 'react';
import { UtilContext } from 'utils/contexts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AdminLayout from 'AdminLayout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useQuery, useMutation } from '@apollo/client';
import { GQL_USER, GQL_ADMIN_UPDATE_USER } from 'utils/gql';

const AdminUserUpdate = () => {
  const { util } = useContext(UtilContext);
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const { loading, error, data } = useQuery(GQL_USER, {
    variables: { id: params.id },
  });
  const [updateUser] = useMutation(GQL_ADMIN_UPDATE_USER);

  const handleAction = (data) => {
    const inputs = Object.fromEntries(
      Object.entries(data).filter(([, val]) => val)
    ); // 入力していない値を取り除く
    updateUser({ variables: { id: params.id, ...inputs } })
      .then(() => {
        navigate('/admin', {
          state: { message: 'ユーザー情報を更新しました' },
        });
      })
      .catch(() => {
        setError('name', {
          type: 'manual',
          message: 'このユーザー名は既に使われております',
        });
      });
  };

  useEffect(() => util.setBackdrop(loading), [loading]);
  useEffect(() => {
    if (!error) return;
    console.error(error);
    alert(
      '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
    );
  }, [error]);

  return (
    <AdminLayout>
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
          <Typography component="h1" variant="h5">
            ユーザー情報更新
          </Typography>
          {data && (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleAction)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="ユーザー名"
                    name="name"
                    autoComplete="username"
                    defaultValue={data.user.name}
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password', {
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
                    helperText={
                      errors.password?.message ||
                      'パスワードは更新する場合のみ入力してください'
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password_confirmation"
                    label="パスワード(再入力)"
                    type="password"
                    id="password_confirmation"
                    {...register('passwordConfirmation', {
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
                更新
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminUserUpdate;
