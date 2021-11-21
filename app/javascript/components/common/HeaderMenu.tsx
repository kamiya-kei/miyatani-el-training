import React, { useContext, useState } from 'react';
import { UserContext } from 'utils/contexts';
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
import axios from 'module/axios_with_csrf';
import ConfirmDialog, { ConfirmDialogHandler } from 'common/ConfirmDialog';

const HeaderMenu = () => {
  const { setUser, isLogin } = useContext(UserContext);

  const confirmDialogRef = React.useRef({} as ConfirmDialogHandler);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    axios
      .post('/graphql', {
        query: `
          mutation {
            signOut(input: {}) {
              user {
                id
              }
            }
          }
        `,
      })
      .then((res) => {
        const user = res.data.data.signOut.user;
        setUser(user);
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  };

  const handleDeleteUser = async () => {
    if (!confirmDialogRef.current) return;
    const is_agree = await confirmDialogRef.current.confirm();
    if (!is_agree) {
      return;
    }

    axios
      .post('/graphql', {
        query: `
          mutation {
            deleteUser(input: {}) {
              user {
                id
              }
            }
          }
        `,
      })
      .then((res) => {
        const user = res.data.data.deleteUser.user;
        setUser(user);
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
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
      <ConfirmDialog ref={confirmDialogRef} />
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
      </Menu>
    </>
  );
};

export default HeaderMenu;
