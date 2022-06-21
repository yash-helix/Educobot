import merge from 'lodash/merge';
// @mui
import { Palette, useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '../../utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '../../components/chart';
import { ColorSchema } from '../../theme/palette';

// ----------------------------------------------------------------------
type Color = "warning" | "error" | "success"
interface ChartRadialBarProps {
  color: Color,
  lessonData: any
}
export default function ChartRadialBar(props: ChartRadialBarProps) {
  const theme = useTheme();
  const CHART_DATA = [props.lessonData.completed_lessons];
  let type = props.color
  const Colors = {
    error: [
      { offset: 0, color: theme.palette.error.main },
      { offset: 100, color: theme.palette.error.dark },
    ],
    warning: [
      { offset: 0, color: theme.palette.warning.light },
      { offset: 100, color: theme.palette.warning.main },
    ],
    success: [
      { offset: 0, color: theme.palette.success.main },
      { offset: 100, color: theme.palette.success.dark },
    ]
  }
  const chartOptions = merge(BaseOptionChart(), {
    labels: [`Completed Lessons - ${props.lessonData.completed_lessons}`, 'Total Lessons - ' + props.lessonData.total_lessons],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [Colors[type]],
      },
    },
    legend: {
      position: 'bottom', horizontalAlign: 'left', fontSize: String(14), fontWeight: 600,
      itemMargin: { right: 12, vertical: 8 },
      labels: {
        colors: '#fff'
      },
    },
    colors: [
      theme.palette.chart.red[0],
      theme.palette.chart.yellow[0],
      theme.palette.primary.main,
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.green[0],
    ],
    plotOptions: {
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: '#fff',
        },
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16, color: "#fff", },
          total: {
            formatter: () => fNumber(props.lessonData.total_lessons - props.lessonData.completed_lessons),
            label: 'Lessons to do',
            color: "#fff",
            fontSize: theme.typography.subtitle1.fontSize as string,
            fontWeight: theme.typography.subtitle1.fontWeight,
            lineHeight: theme.typography.subtitle1.lineHeight,
          },
        },
      },
    },
  });

  return (
    <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={400} />
  );
}
