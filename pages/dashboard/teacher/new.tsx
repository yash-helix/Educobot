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

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

New.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function New() {
  const { themeStretch } = useSettings();

  const { push } = useRouter();

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <h1>New</h1>
      </Container>
    </Page>
  );
}
