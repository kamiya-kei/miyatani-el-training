import React, { useContext, useState, useEffect } from 'react';
import { UtilContext } from 'utils/contexts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'utils/constants';
import { User } from 'utils/types';
import { useQuery, useMutation } from '@apollo/client';
import { GQL_USERS, GQL_ADMIN_DELETE_USER } from 'utils/gql';

interface UserListRowProps {
  user: User;
  onDelete: (id: string) => void;
}

const UserListRow = ({ user, onDelete }: UserListRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDelete = (id) => () => {
    handleClose();
    onDelete(id);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.id}
      </TableCell>
      <TableCell align="left">{user.name}</TableCell>
      <TableCell align="right">{user.tasksCount}</TableCell>
      <TableCell>{dayjs(user.createdAt).format(DATETIME_FORMAT)}</TableCell>
      <TableCell>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem component={Link} to={`/admin/users/${user.id}/edit`}>
            編集
          </MenuItem>
          <MenuItem onClick={handleDelete(user.id)}>削除</MenuItem>
          <MenuItem component={Link} to={`/admin/users/${user.id}/tasks`}>
            タスク一覧
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

const UserList = () => {
  const { util } = useContext(UtilContext);

  const { loading, error, data, refetch } = useQuery(GQL_USERS);
  const [deleteUser] = useMutation(GQL_ADMIN_DELETE_USER);

  const handleDeleteUser = async (id) => {
    const is_agree = await util.confirmDialog();
    if (!is_agree) return;

    util.setBackdrop(true);
    deleteUser({ variables: { id } })
      .then(() => {
        util.flashMessage('ユーザーが削除されました');
        refetch();
      })
      .finally(() => util.setBackdrop(false));
  };

  useEffect(() => util.setBackdrop(loading), [loading]);
  if (error) {
    alert(
      '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
    );
  }

  return (
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
          {data?.users.map((user: User) => (
            <UserListRow
              key={user.id}
              user={user}
              onDelete={handleDeleteUser}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
