import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Card, Button, Typography, Box } from '@mui/material';

//shadow import
import ValidityCard from './Shadow';
//radialbar import
import ChartRadialBar from './ChartRadialBar';
import { ColorSchema } from '../../theme/palette';
import { ChartColor } from '../../@types/cirrulumCard';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 344,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'start',
  flexDirection: 'column',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)',
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5),
  },
}));


// ----------------------------------------------------------------------

type Props = {
  card: {
    subscription: string;
    title: String;
    subtitle: String,
    validity: String,
    completed_lessons: number;
    total_lessons: number;
  };
  index: number;
  color: ColorSchema,
  chartColor: ChartColor
};

export default function LessonStatusCard({ card, color, chartColor }: Props) {
  const { subscription, title, subtitle, validity, completed_lessons, total_lessons } = card;
  const lessonData = { completed_lessons, total_lessons };
  const theme = useTheme();

  return (
    <RootStyle>
      <Typography variant="overline" color="#fff" my={1}>
        {subscription}
      </Typography>

      <Typography my={1} variant="h4" fontWeight={700} maxWidth={'16rem'}>
        {title}
      </Typography>

      {/* <Typography my={1} fontWeight={700} color="#fff">
        Purchased
      </Typography> */}

      {/* <ValidityCard
        key='error'
        title={`Valid through: ${validity}`}
        sx={{
          width: 'inlineBlock',
          px: 1, py: 0.5,
          mx: 0, my: 1,
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main,
        }}
      /> */}

      <Typography my={1} fontWeight={700} color="#fff">
      {`Valid through: ${validity}`}
      </Typography>

      <Box sx={{ width: '100%' }}>
        <ChartRadialBar lessonData={lessonData} color={chartColor} />
      </Box>

      {color !== "info" && <Button variant='contained' color={color} sx={{ width: '100%', my: 1 }}>
        Extend Validity
      </Button>}
      <Box display={'flex'} alignItems={'center'} marginLeft="auto" marginTop={2}>
        <Typography fontSize={theme.typography.subtitle2.fontSize} color={'#fff'} marginRight={1}>
          Go to Dashboard
        </Typography>
        {icon}
      </Box>
    </RootStyle >
  );
}
const icon = (
  <svg width="12" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.33334 11.8333C1.13863 11.8337 0.949931 11.7659 0.800004 11.6416C0.629582 11.5004 0.522381 11.2971 0.502057 11.0766C0.481733 10.8562 0.549955 10.6367 0.691671 10.4666L4.425 5.99997L0.825004 1.52497C0.685196 1.35281 0.61978 1.13202 0.643241 0.911489C0.666703 0.690954 0.777105 0.488869 0.950004 0.349974C1.12431 0.196608 1.35469 0.122912 1.58565 0.14664C1.8166 0.170368 2.02719 0.28937 2.16667 0.474974L6.19167 5.47497C6.44443 5.78248 6.44443 6.22581 6.19167 6.53331L2.025 11.5333C1.85545 11.7378 1.59853 11.8493 1.33334 11.8333Z" fill="#F4F6F8" />
  </svg>
)
