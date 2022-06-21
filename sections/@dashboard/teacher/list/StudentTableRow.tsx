import { useState } from "react";
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
  id?: string;
  fullName?: string;
  email?:string;
  status?: number;
  incomplete?: number;        
  points?: number;
  rollNo?:number;
};

type Props = {
  row: row;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function StudentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { fullName, email, status, incomplete, points, rollNo } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {fullName}
          </Typography>
          <Typography variant="subtitle2" noWrap color={"text.secondary"}>
            {email}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{rollNo}</TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            (status === 1 && "success") ||
            (status === 2 && "warning") ||
            (status === 3 && "default") ||
            (status === 4 && "error") ||
            "default"
          }
          sx={{ textTransform: "capitalize", fontWeight:550, fontSize:"14px" ,fontFamily:"Public Sans" }}
        >
          {
            (status === 1 && "Done") ||
            (status === 2 && "Doing") ||
            (status === 3 && "Not Started") ||
            (status === 4 && "Incomplete")
          }
        </Label>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {incomplete}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {points}
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
