import React, { useContext, useState } from 'react';
import { UserContext, UtilContext } from 'utils/contexts';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useMutationEx from 'hooks/useMutationEx';
import { GQL_SIGN_OUT, GQL_DELETE_USER } from 'utils/gql';

const HeaderMenu = () => {
  const { util } = useContext(UtilContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, setUser, isLogin } = useContext(UserContext);
  const [signOut] = useMutationEx(GQL_SIGN_OUT, {
    onCompleted: () => {
      setUser(null);
    },
  });
  const [deleteUser] = useMutationEx(GQL_DELETE_USER, {
    onCompleted: () => {
      setUser(null);
    },
    onError: () => {
      util.flashMessage(
        'ユーザーを削除できませんでした。管理ユーザーは最低1人は必要です',
        'error'
      );
    },
  });

  const handleSignOut = () => signOut();
  const handleDeleteUser = async () => {
    const is_agree = await util.confirmDialog();
    if (is_agree) deleteUser();
  };

  if (!isLogin) {
    return (
      <>
        <Button component={Link} to="/users/sign_in" color="inherit">
          ログイン
        </Button>
        <Button component={Link} to="/users/sign_up" color="inherit">
          新規登録
        </Button>
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Button component={Link} to="/tasks/new" color="inherit">
          タスク作成
        </Button>

        <Tooltip title="アカウントメニュー">
          <IconButton onClick={handleClick} color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <NoAccountsIcon fontSize="small" />
          </ListItemIcon>
          アカウント削除
        </MenuItem>
        {user?.role.text == 'admin' && (
          <div>
            <Divider />
            <MenuItem component={Link} to="/admin">
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              管理ページ
            </MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};

export default HeaderMenu;
