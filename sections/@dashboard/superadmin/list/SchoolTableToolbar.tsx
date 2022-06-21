import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
// components
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

type Props = {
  // optionsRole: string[];
  boardOptions: string[];
  filterName: string;
  filterBoard: string;
  onFilterName: (value: string) => void;
  onFilterBoard: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SchoolTableToolbar({
  filterName,
  filterBoard,
  onFilterName,
  onFilterBoard,
  boardOptions,
}: Props) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ py: 2.5, px: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Class"
        value={filterBoard}
        onChange={onFilterBoard}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: "capitalize",
        }}
      >
        {boardOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "uppercse",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search school ..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
