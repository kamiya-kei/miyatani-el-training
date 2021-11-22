import React, { useContext } from 'react';
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
import { useQuery } from '@apollo/client';
import { GQL_USERS } from 'utils/gql';

const UserList = () => {
  const { loading, error, data } = useQuery(GQL_USERS);

  const { util } = useContext(UtilContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDeleteUser = async () => {
    handleClose();
    const is_agree = await util.confirmDialog();
    if (!is_agree) return;

    // TODO: 削除
  };

  if (loading || error) return <></>;

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
          {data.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="right">{user.tasksCount}</TableCell>
              <TableCell>
                {dayjs(user.createdAt).format(DATETIME_FORMAT)}
              </TableCell>
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
                  <MenuItem
                    component={Link}
                    to={`/admin/users/${user.id}/edit`}
                  >
                    編集
                  </MenuItem>
                  <MenuItem onClick={handleDeleteUser}>削除</MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/admin/users/${user.id}/tasks`}
                  >
                    タスク一覧
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
