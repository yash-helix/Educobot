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

  const { sdFName, edStatus, Incomplete, TotalCoins,sdRollNo } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  

  const getStatus = (edStatus)=>{
    if(edStatus === 'C'){
      return "Done"
    }
    else if(edStatus === 'I'){
      return "Incomplete"
    }
    else if(edStatus === 'X'){
      return "Not Started"
    }
    else if(edStatus === 'L'){
      return"Doing" 
    }
  }

  const getStatusColor = (edStatus)=>{
    if(edStatus === 'C'){
      return "success"
    }
    else if(edStatus === 'I'){
      return"error"
    }
    else if(edStatus === 'X'){
      return"default"
    }
    else if(edStatus === 'L'){
      return"warning"
    }
  }

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

      <TableCell align="left">{ sdRollNo}</TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={getStatusColor(edStatus)}
          sx={{ textTransform: "capitalize", fontWeight:550, fontSize:"14px" ,fontFamily:"Public Sans" }}
        >
          {getStatus(edStatus)}
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
