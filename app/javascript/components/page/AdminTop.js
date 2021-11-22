import React from 'react';
import BaseLayout from 'BaseLayout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'utils/constants';
import { useQuery } from '@apollo/client';
import { GQL_USERS } from 'utils/gql';

const AdminTop = () => {
  const { loading, error, data } = useQuery(GQL_USERS);
  if (loading || error) return <></>;

  return (
    <BaseLayout>
      <div style={{ margin: '20px 0' }}>
        <h3>管理画面 ユーザー一覧</h3>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>タスク数</TableCell>
                <TableCell>登録日時</TableCell>
                <TableCell>メニュー</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="right">{user.taskCount}</TableCell>
                  <TableCell>
                    {dayjs(user.createdAt).format(DATETIME_FORMAT)}
                  </TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseLayout>
  );
};

export default AdminTop;
