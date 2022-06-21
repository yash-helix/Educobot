import { useState } from "react";
import { sentenceCase } from "change-case";
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
} from "@mui/material";
// @types
// import { UserManager } from "../../../../@types/user";
// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import { TableMoreMenu } from "../../../../components/table";

// ----------------------------------------------------------------------
type row = {
  id: string;
  name: string;
  board: string;
  onboarded: string;
  licenceValidity: string;
  status: string;
};

type Props = {
  row: row;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function SchoolTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { name, board, onboarded, licenceValidity, status } = row;

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
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.disabled", cursor: "pointer" }}
            noWrap
          >
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "uppercase" }}>
        {board}
      </TableCell>

      <TableCell align="left">{onboarded}</TableCell>

      <TableCell align="left">{licenceValidity}</TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            (status === "Past validity" && "error") ||
            (status === "Nearing validity" && "warning") ||
            (status === "Inactive" && "default") ||
            "success"
          }
          sx={{ textTransform: "capitalize" }}
        >
          {status ? sentenceCase(status) : ""}
        </Label>
      </TableCell>

      <TableCell align="right">
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
      </TableCell>
    </TableRow>
  );
}
