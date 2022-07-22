import { paramCase } from "change-case";
import { useEffect, useState } from "react";
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

import data from "../../../_mock/data";
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
  StudentTableToolbar,
  StudentTableRow,
} from "../../../sections/@dashboard/saasstudent/list";
import axios from "axios";

// ----------------------------------------------------------------------

const url:any = process.env.devUrl;

// const classArr = data.map((record) => {
//   return record.class;
// });

// console.log("Class Array", [...new Set(classArr)]);

const classArr = ["all", "5", "6", "7", "8", "9"];

const divisionArr = ["all", "A", "B", "C", "D"];

const TABLE_HEAD = [
  { id: "sdFName", label: "Name", align: "left" },
  { id: "courseLvlLesson", label: "Course,Level,Lesson", align: "left" },
  { id: "points", label: "Points", align: "left" },
  { id: "pendingLessons", label: "Pending Lessons", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

StudentList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function StudentList() {

  const getStudents = async()=>{
    try{
      let formData = new FormData();
      formData.append("schoolID", localStorage.getItem("schoolID"));
      // formData.append("year", "2022-23");

      await axios.post(`${url.EduCobotBaseUrl}/${url.getStudents}`, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      .then(res=>{
        if (res.data.STATUS == "SUCCESS") {
          // adding dummy feilds, which later will be getting from API
          let arr = res.data.DATA.map((ele: any, index:number) => {
            let course = index%2==0?"IC":"PP";
            return {
              ...ele,
              id:index,
              level: 6,
              lesson: 4,
              points: 300,
              pendingLessons: 4,
              course: course,
            }
          })

          setTableData(arr);
        }
      })
      .catch(err=>{
        console.log(err)
      })

    }
    catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    getStudents();
  }, []);


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

  const [tableData, setTableData] = useState([{
    id: "1",
    sdFName: "ABCD",
    course: "IC",
    level: 6,
    lesson: 4,
    points: 300,
    pendingLessons: 4,
    sdClass: "6th",
    sdDiv: "A",
},]);

  const [filterName, setFilterName] = useState("");

  const [filterClass, setFilterClass] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterClass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterClass(event.target.value);
  };

  const handleFilterDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDivision(event.target.value);
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
    push(PATH_DASHBOARD.student.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterClass,
    filterDivision,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterClass) ||
    (!dataFiltered.length && !!filterDivision) ||
    (!dataFiltered.length && !!filterStatus);

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.course === status).length;

  const TABS = [
    {
      value: "all",
      label: "All",
      color: "default",
      count: tableData.length,
    },
    {
      value: "IC",
      label: "Introduction to Coding(IC)",
      color: "default",
      count: getLengthByStatus("IC"),
    },
    {
      value: "PP",
      label: "Python Programming(PP)",
      color: "default",
      count: getLengthByStatus("PP"),
    },
    {
      value: "DS",
      label: "Data Science(DS)",
      color: "default",
      count: getLengthByStatus("DS"),
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
        >Students
        </Typography>

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
          <Divider />

          <StudentTableToolbar
            filterName={filterName}
            filterClass={filterClass}
            filerDivision={filterDivision}
            onFilterName={handleFilterName}
            onFilterClass={handleFilterClass}
            onFilterDivision={handleFilterDivision}
            // optionsRole={ROLE_OPTIONS}
            classOptions={classArr}
            divisionOptions={divisionArr}
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
                      <StudentTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.sdFName)}
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
  sdFName: string;
  course: string;
  level: number;
  lesson: number;
  points: number;
  pendingLessons: number;
  sdClass: string;
  sdDiv: string;
};

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterClass,
  filterDivision,
}: {
  tableData: row[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterClass: string;
  filterDivision: string;
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
        item.sdFName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.course === filterStatus
    );
  }

  if (filterClass !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.sdClass === filterClass
    );
  }

  if (filterDivision !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.sdDiv === filterDivision
    );
  }

  return tableData;
}
