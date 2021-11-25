import React, { useContext, useState } from 'react';
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
import RoleForm from 'common/RoleForm';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'utils/constants';
import { User } from 'utils/types';
import useQueryEx from 'hooks/useQueryEx';
import useMutationEx from 'hooks/useMutationEx';
import {
  GQL_USERS,
  GQL_ADMIN_DELETE_USER,
  GQL_ADMIN_UPDATE_USER,
} from 'utils/gql';

interface UserListRowProps {
  user: User;
  onDelete: (id: string) => void;
}

const UserListRow = ({ user, onDelete }: UserListRowProps) => {
  const { util } = useContext(UtilContext);

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

  const [updateUser] = useMutationEx(GQL_ADMIN_UPDATE_USER, {
    onCompleted: () => {
      util.flashMessage('ユーザータイプを変更しました');
    },
  });
  const handleChangeUserRole = (roleId) => {
    updateUser({ variables: { id: user.id, roleId } });
  };

  return (
    <TableRow data-test-user={user.id}>
      <TableCell component="th" scope="row">
        {user.id}
      </TableCell>
      <TableCell align="left">{user.name}</TableCell>
      <TableCell align="left">
        <RoleForm defaultValue={user.role.id} onChange={handleChangeUserRole} />
      </TableCell>
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
          <MenuItem onClick={handleDelete(user.id)} data-test-button="delete">
            削除
          </MenuItem>
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

  const { data, refetch } = useQueryEx(GQL_USERS);
  const users: User[] = data.users || [];
  const [deleteUser] = useMutationEx(GQL_ADMIN_DELETE_USER, {
    onCompleted: () => {
      util.flashMessage('ユーザーを削除しました');
      refetch();
    },
  });

  const handleDeleteUser = async (id) => {
    const is_agree = await util.confirmDialog();
    if (is_agree) deleteUser({ variables: { id } });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ユーザー名</TableCell>
            <TableCell>ユーザータイプ</TableCell>
            <TableCell>タスク数</TableCell>
            <TableCell>登録日時</TableCell>
            <TableCell>メニュー</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
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
