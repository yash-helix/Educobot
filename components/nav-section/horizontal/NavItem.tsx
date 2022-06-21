import { ReactElement, forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';
// config
//import { ICON } from '../../../config';
// type
import { NavItemProps } from '../type';
//
import Iconify from '../../Iconify';
import { ListItemStyle } from './style';
import { isExternalLink } from '..';

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef<HTMLButtonElement & HTMLAnchorElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, chil } = item;

    if (chil) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} chil={chil} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
        <NavItemContent icon={icon} title={title} chil={chil} />
      </ListItemStyle>
    ) : (
      <NextLink href={path} passHref>
        <ListItemStyle activeRoot={active}>
          <NavItemContent icon={icon} title={title} chil={chil} />
        </ListItemStyle>
      </NextLink>
    );
  }
);

NavItemRoot.displayName = "NavItemRoot";

// ----------------------------------------------------------------------

export const NavItemSub = forwardRef<HTMLButtonElement & HTMLAnchorElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, chil } = item;

    if (chil) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} chil={chil} subItem />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component={Link}
      >
        <NavItemContent icon={icon} title={title} chil={chil} subItem />
      </ListItemStyle>
    ) : (
      <NextLink href={path} passHref>
        <ListItemStyle disableRipple activeSub={active} subItem>
          <NavItemContent icon={icon} title={title} chil={chil} subItem />
        </ListItemStyle>
      </NextLink>
    );
  }
);

NavItemSub.displayName = "NavItemSub";
// ----------------------------------------------------------------------

type NavItemContentProps = {
  title: string;
  icon?: ReactElement;
  chil?: { title: string; path: string }[];
  subItem?: boolean;
};

function NavItemContent({ icon, title, chil, subItem }: NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: 20,//ICON.NAVBAR_ITEM_HORIZONTAL,
            height: 20,//ICON.NAVBAR_ITEM_HORIZONTAL,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {chil && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: 20,//ICON.NAVBAR_ITEM_HORIZONTAL,
            height: 20,// ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}

NavItemContent.displayName = "NavItemContent";