import merge from "lodash/merge";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
// components
import ReactApexChart, { BaseOptionChart } from "../../../components/chart";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important" as "relative",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

interface SyllabusRadialBarProps {
  // legendAlign: any;
  card: {
    title: String;
    chartData: any;
    labels: any;
    total: any;
  };
}

// ----------------------------------------------------------------------

export default function SyllabusCard({ card }: SyllabusRadialBarProps) {
  const theme = useTheme();
  const CHART_DATA = [
    (card.chartData[0] * 100) / card.total,
    (card.chartData[1] * 100) / card.total,
  ];
  const chartOptions = merge(BaseOptionChart(), {
    labels: card.labels,
    legend: {
      floating: true,
      horizontalAlign: "center",
      fontWeight: 500,
      fontSize: String(14),
      itemMargin: { horizontal: 12 },
    },
    colors: [theme.palette.success.dark, theme.palette.warning.main],
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.success.main },
            { offset: 100, color: theme.palette.success.dark },
          ],
          [
            { offset: 0, color: theme.palette.warning.main },
            { offset: 100, color: theme.palette.warning.dark },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "66%" },
        dataLabels: {
          value: {
            offsetY: 16,
            color: theme.palette.text.secondary,
            fontSize: theme.typography.h3.fontSize as string,
            fontWeight: theme.typography.h3.fontWeight,
            lineHeight: theme.typography.h3.lineHeight,
          },
          total: {
            formatter: () => `: )`,
            label: (card.chartData[0] * 100) / card.chartData[1] + "%",
            offsetY: 8,
            color: theme.palette.text.primary,
            fontSize: theme.typography.h3.fontSize as string,
            fontWeight: theme.typography.h3.fontWeight,
            lineHeight: theme.typography.h3.lineHeight,
          },
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Syllabus Completed"
        subheader="You have completed more than expected since March 2021. Awesome:)"
        titleTypographyProps={{ variant: "h5", my: 1 }}
        subheaderTypographyProps={{ variant: "subtitle1" }}
      />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="radialBar"
          series={CHART_DATA}
          options={chartOptions}
          height={310}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
