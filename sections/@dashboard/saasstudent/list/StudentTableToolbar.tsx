import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
// components
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

type Props = {
  // optionsRole: string[];
  classOptions: string[];
  divisionOptions: string[];
  filterName: string;
  filterClass: string;
  filerDivision: string;
  onFilterName: (value: string) => void;
  onFilterClass: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterDivision: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StudentTableToolbar({
  filterName,
  filterClass,
  filerDivision,
  onFilterName,
  onFilterClass,
  onFilterDivision,
  classOptions,
  divisionOptions,
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
        value={filterClass}
        onChange={onFilterClass}
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
        {classOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Division"
        value={filerDivision}
        onChange={onFilterDivision}
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
        {divisionOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
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
        placeholder="Search Student..."
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
