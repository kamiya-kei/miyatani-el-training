import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AdminLayout from 'AdminLayout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import useMutationEx from 'hooks/useMutationEx';
import { GQL_ADMIN_CREATE_USERS } from 'utils/gql';

const AdminUserCreate = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const [createUser] = useMutationEx(GQL_ADMIN_CREATE_USERS, {
    onCompleted: () => {
      navigate('/admin', {
        state: { message: '新規ユーザーを作成しました' },
      });
    },
    onError: () => {
      setError('name', {
        type: 'manual',
        message: 'このユーザー名は既に使われております',
      });
    },
  });

  const handleAction = (data) => {
    console.log({ ...data });
    createUser({ variables: { ...data } });
  };

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
            新規ユーザー作成
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
              作成
            </Button>
          </Box>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminUserCreate;
