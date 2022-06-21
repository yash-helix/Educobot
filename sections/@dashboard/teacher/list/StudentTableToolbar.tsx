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
