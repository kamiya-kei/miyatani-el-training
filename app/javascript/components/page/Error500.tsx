import React from 'react';
import BaseLayout from 'BaseLayout';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Error500 = () => {
  return (
    <BaseLayout>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          500 Internal Server Error
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          申し訳ございません。 <br />
          リクエストされたページは表示できませんでした。
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" component={Link} to="/">
            トップページへ
          </Button>
        </Typography>
      </Container>
    </BaseLayout>
  );
};

export default Error500;
