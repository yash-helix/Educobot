import { useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
// @types
// import { UserManager } from "../../../../@types/user";
// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import { TableMoreMenu } from "../../../../components/table";

// ----------------------------------------------------------------------
type row = {
  sdFName?: string;
  edStatus?: string;
  Incomplete?: number;        
  TotalCoins?: number;
  sdRollNo?:number;
  Complete?:number
};

type Props = {
  row: row;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  page?: string,
};

export default function StudentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  page,
}: Props) {
  const theme = useTheme();

  const { sdFName, edStatus, Incomplete, TotalCoins, sdRollNo } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const [status, setStatus] = useState({color:"default", text:""});

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  

  const getStatus = ()=>{
    if(edStatus === 'C'){
      setStatus({color:"success", text:"Done"})
    }
    else if(edStatus === 'L'){
      if(page=='ViewReport') setStatus({color:"error", text:"Incomplete"})
      else setStatus({color:"warning", text:"Doing"})
    }
    else if(edStatus === 'X'){
      if(page=='ViewReport') setStatus({color:"error", text:"Incomplete"})
      else setStatus({color:"default", text:"Not Started"})
    }
  }

  useEffect(() => {
    getStatus();
  },[]);

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {sdFName}
          </Typography>
          {/* <Typography variant="subtitle2" noWrap color={"text.secondary"}>
            {email}
          </Typography> */}
        </Stack>
      </TableCell>

      <TableCell align="left">{sdRollNo}</TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={status.color}
          sx={{ textTransform: "capitalize", fontWeight:550, fontSize:"14px" ,fontFamily:"Public Sans" }}
        >
          {status.text}
        </Label>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {Incomplete}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {TotalCoins}
      </TableCell>

      {/* <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}
