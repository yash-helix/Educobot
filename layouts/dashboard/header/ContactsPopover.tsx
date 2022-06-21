import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';

import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const { user, logout } = useAuth();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };
  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      < MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }
        }
      >
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
        <MenuItem sx={{ m: 1 }}>
          Setting
        </MenuItem>
      </MenuPopover >
    </>
  );
}
