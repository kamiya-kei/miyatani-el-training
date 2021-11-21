import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BaseLayout from 'BaseLayout';
import TaskCard from 'common/TaskCard';
import Priority from 'common/Priority';
import DoneChip from 'common/DoneChip';

const UnSignedTop = () => {
  return (
    <BaseLayout>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <TaskCard sx={{ width: '500px' }}>
          <CardHeader
            title={
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Priority priority="2" />
                  タスク管理をはじめる
                </div>
                <div>
                  <DoneChip done={{ id: -1, text: '未着手' }} />
                </div>
              </Box>
            }
            subheader={
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>作成日時:--</div>
                <div>期限:--</div>
              </Box>
            }
          />
          <CardContent>アカウントを作成してタスク管理をはじめる</CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              <Button
                component={Link}
                to="users/sign_in"
                variant="contained"
                size="small"
                color="primary"
              >
                ログイン
              </Button>
              <Button
                component={Link}
                to="users/sign_up"
                variant="contained"
                size="small"
                color="secondary"
              >
                新規登録
              </Button>
            </Stack>
          </CardActions>
        </TaskCard>
      </div>
    </BaseLayout>
  );
};

export default UnSignedTop;
