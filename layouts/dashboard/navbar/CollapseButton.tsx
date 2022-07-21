// @mui
import { Box } from '@mui/material';
// components
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

type Props = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

export default function CollapseButton({ onToggleCollapse, collapseClick }: Props) {
  return (
    <IconButtonAnimate onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          // ...(collapseClick && {
          //   transform: 'rotate(180deg)',
          // }),
        }}
      >
        {icon}
      </Box>
    </IconButtonAnimate>
  );
}

// ----------------------------------------------------------------------

const icon = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M11.94 14C11.4209 14 11 14.4209 11 14.94V15.06C11 15.5791 11.4209 16 11.94 16H28.06C28.5791 16 29 15.5791 29 15.06V14.94C29 14.4209 28.5791 14 28.06 14H11.94ZM12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21ZM15.94 19C15.4209 19 15 19.4209 15 19.94V20.06C15 20.5791 15.4209 21 15.94 21H28.06C28.5791 21 29 20.5791 29 20.06V19.94C29 19.4209 28.5791 19 28.06 19H15.94ZM11 24.94C11 24.4209 11.4209 24 11.94 24H28.06C28.5791 24 29 24.4209 29 24.94V25.06C29 25.5791 28.5791 26 28.06 26H11.94C11.4209 26 11 25.5791 11 25.06V24.94Z" fill="#637381"/>
</svg>
)


// const icon = (
//   <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
//     <g fill="none" fillRule="evenodd">
//       <path d="M0 0h24v24H0z" />
//       <g fill="currentColor" fillRule="nonzero">
//         <path
//           d="M14.3283 11.4343 18.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z"
//           opacity=".48"
//         />
//         <path d="M8.3283 11.4343 12.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z" />
//       </g>
//     </g>
//   </svg>
// );
