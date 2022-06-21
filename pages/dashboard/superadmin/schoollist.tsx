import { paramCase } from "change-case";
import { useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
  Stack,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useTabs from "../../../hooks/useTabs";
import useSettings from "../../../hooks/useSettings";
import useTable, { getComparator, emptyRows } from "../../../hooks/useTable";
// @types
import { UserManager } from "../../../@types/user";

import { schooldata } from "../../../_mock/data";
// layouts
import Layout from "../../../layouts";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import Label from "../../../components/Label";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../../components/table";
// sections
import {
  SchoolTableToolbar,
  SchoolTableRow,
} from "../../../sections/@dashboard/superadmin/list";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all", "active", "banned"];

const ROLE_OPTIONS = [
  "all",
  "ux designer",
  "full stack designer",
  "backend developer",
  "project manager",
  "leader",
  "ui designer",
  "ui/ux designer",
  "front end developer",
  "full stack developer",
];

// const boardArr = data.map((record) => {
//   return record.class;
// });

// console.log("Class Array", [...new Set(boardArr)]);

const boardArr = ["all", "state board", "cbse", "icse", "cisce", "nios"];

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "board", label: "Board", align: "left" },
  { id: "onboarded", label: "Onboarded on", align: "left" },
  { id: "licenceValidity", label: "License valid till", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

SchoolList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SchoolList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [tableData, setTableData] = useState(schooldata);

  const [filterName, setFilterName] = useState("");

  const [filterBoard, setfilterBoard] = useState("all");

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterBoard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfilterBoard(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.superAdmin.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterBoard,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterBoard) ||
    (!dataFiltered.length && !!filterStatus);

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length;

  const TABS = [
    {
      value: "all",
      label: "All",
      color: "default",
      count: tableData.length,
    },
    {
      value: "Active",
      label: "Active",
      color: "success",
      count: getLengthByStatus("Active"),
    },
    {
      value: "Nearing validity",
      label: "Nearing validity",
      color: "warning",
      count: getLengthByStatus("Nearing validity"),
    },
    {
      value: "Past validity",
      label: "Past validity",
      color: "error",
      count: getLengthByStatus("Past validity"),
    },
    {
      value: "Inactive",
      label: "Inactive",
      color: "default",
      count: getLengthByStatus("Inactive"),
    },
  ] as const;

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        {/* <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "List" },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.user.new} passHref>
              <Button
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New User
              </Button>
            </NextLink>
          }
        /> */}
        <Typography
          variant={"h4"}
          sx={{ color: "text.primary", fontWeight: 700, mb: 4 }}
        >
          Schools
        </Typography>
        {console.log(filterStatus)}
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: "background.neutral" }}
          >
            {TABS.map((tab, index) => (
              <Tab
                disableRipple
                key={index}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div>
                    <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
                value={tab.value}
              />
            ))}
          </Tabs>

          {/* <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            // onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: "background.neutral" }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div>
                    <Label color={tab.color}>
                      {tab.count}
                      </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs> */}

          <Divider />

          <SchoolTableToolbar
            filterName={filterName}
            filterBoard={filterBoard}
            onFilterName={handleFilterName}
            onFilterBoard={handleFilterBoard}
            // optionsRole={ROLE_OPTIONS}
            boardOptions={boardArr}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteRows(selected)}
                      >
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? "small" : "medium"}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <SchoolTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

type row = {
  id: string;
  name: string;
  board: string;
  onboarded: string;
  licenceValidity: string;
  status: string;
};

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterBoard,
}: {
  tableData: row[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterBoard: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.status === filterStatus
    );
  }

  if (filterBoard !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.board === filterBoard
    );
  }

  return tableData;
}
