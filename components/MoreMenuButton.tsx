import { IconButton, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import Iconify from "./Iconify";
import MenuPopover from "./MenuPopover";

export default function MoreMenuButton() {
    const [open, setOpen] = useState<HTMLElement | null>(null);
  
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
  
    const ICON = {
      mr: 2,
      width: 20,
      height: 20,
    };
  
    return (
      <>
        <IconButton size="large" onClick={handleOpen}>
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
  
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          arrow="right-top"
          sx={{
            mt: -0.5,
            width: 160,
            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          }}
        >
          <MenuItem>
            <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
            Download
          </MenuItem>
  
          <MenuItem>
            <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
            Print
          </MenuItem>
  
          <MenuItem>
            <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
            Share
          </MenuItem>
  
          <Divider sx={{ borderStyle: 'dashed' }} />
  
          <MenuItem sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            Delete
          </MenuItem>
        </MenuPopover>
      </>
    );
  }