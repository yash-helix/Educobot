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
} from "../../../sections/@dashboard/teacher/list";
import axios from "axios";

// ----------------------------------------------------------------------

const url:any=  process.env.devUrl;

const classArr = ["all", "6th", "7th", "8th", "9th", "10th"];

const divisionArr = ["all", "A", "B", "C", "D", "E"];
// ----------------------------------------------------------------------

ProgressStudentList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProgressStudentList(props) {

  const [tableData, setTableData] = useState(props.students);
  
    const TABLE_HEAD = [
        { id: "sdFName", label: "Student", align: "left" },
        { id: "sdRollNo", label: "Roll no", align: "left" },
        { id: "edStatus", label: `Lesson ${props.lessonNo} status`, align: "left" },
        { id: "Incomplete", label: "Incomplete Lessons", align: "left" },
        { id: "TotalCoins", label: "Points", align: "left" },
      ];


  const getStudents = async()=>{
    try{
      let formData = new FormData();
      formData.append("schoolID", "7beec1a9-3a77-467a-8a12-7b1296746b9d");
      formData.append("year", "2022-23");
      formData.append("sdClass", "5");
      formData.append("sdDiv", "A");

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
    // getStudents();
    const SetData = () => {
      let arr = props.students.map(student => {
        if (student?.edStatus == 'L') return { ...student, edStatus: "L" }
        else if(student?.edStatus == 'C') return { student, edStatus: "C" }
        else if(student?.edStatus == 'I') return { student, edStatus: "I" }
        else return { student, edStatus: "X" }
      });
      setTableData(arr);
    }
    SetData();
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

  const { push } = useRouter();

  const [filterName, setFilterName] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");
  const [filterStatus ,setFilterStatus] = useState("all");
  // const [filterCourse, setFilterCourse] = useState("all");
  
  const { currentTab: filterCourse, onChangeTab: onChangeFilterCourse } = useTabs("all");

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

  // const handleFilterCourse = (tab)=>{
  //   console.log(tab)
  //   setFilterCourse(tab.value);
  // }

  const handleDeleteRow = (sdRollNo: string) => {
    const deleteRow = tableData.filter((row) => row.sdRollNo !== sdRollNo);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.sdRollNo));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (sdRollNo: string) => {
    push(PATH_DASHBOARD.student.edit(paramCase(sdRollNo)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterClass,
    filterDivision,
    filterStatus,
    filterCourse,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterClass) ||
    (!dataFiltered.length && !!filterDivision) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterCourse);

  const getLengthByStatus = (edStatus: string) =>{
    return tableData.filter((obj) => obj.edStatus == edStatus).length;
  }

  const TABS = [
    {
      value: "all",
      label: "All",
      color: "default",
      count: tableData.length,
    },
    {
      value: "X",
      label: "Not Started",
      color: "default",
      count: getLengthByStatus('X'),
    },
    {
      value: "L",
      label: "Doing",
      color: "warning",
      count: getLengthByStatus('L'),
    },
    {
      value: "C",
      label: "Done",
      color: "success",
      count: getLengthByStatus('C'),
    },
    {
      value: "I",
      label: "Incomplete",
      color: "error",
      count: getLengthByStatus('I'),
    },
  ] as const;
  

  return (
    <Page title="User: List" >
        <Card sx={{marginTop:"40px"}}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterCourse}
            onChange={onChangeFilterCourse}
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
                      tableData.map((row) => row.sdRollNo)
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
                      tableData.map((row) => row.sdRollNo)
                    )
                  }
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const obj ={
                        ...row.student,
                        ...row
                      }
                      return <StudentTableRow
                        key={row.sdRollNo}
                        row={obj}
                        selected={selected.includes(`${row.sdRollNo}`)}
                        onSelectRow={() => onSelectRow(`${row.sdRollNo}`)}
                        onDeleteRow={() => handleDeleteRow(`${row.sdRollNo}`)}
                        onEditRow={() => handleEditRow(row.sdFName)}
                        page={"ViewProgress"}
                      />
                    })}

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
    </Page>
  );
}

// ----------------------------------------------------------------------

type row = {
    sdFName?: string;
    email?:string;
    edStatus?: string;
    incomplete?: number;
    points?: number;
    sdRollNo?:number;
    student?: any
};

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterClass,
  filterDivision,
  filterCourse,
}: {
  tableData: row[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterClass: string;
  filterDivision: string;
  filterCourse: string;
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
        item?.student?.sdFName?.toLowerCase()?.indexOf(filterName?.toLowerCase()) !== -1
    );
  } 

  if (filterStatus !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.edStatus === filterStatus
    );
  }

  if (filterClass !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.class === filterClass
    );
  }

  if (filterDivision !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.division === filterDivision
    );
  }

  if (filterCourse !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => {
        return item.edStatus === filterCourse
      }
    );
  }

  return tableData;
}
