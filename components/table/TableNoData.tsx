// @mui
import { TableRow, TableCell } from "@mui/material";
//
import EmptyContent from "../EmptyContent";
import NotFound from "../../assets/illustration_500";

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
};

export default function TableNoData({ isNotFound }: Props) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9}>
            {/* <EmptyContent
              title="No Data"
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            /> */}
            <NotFound
              sx={{
                p: 3,
                width: 400,
                height: 350,
                margin: "auto",
              }}
            />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
