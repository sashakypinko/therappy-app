import { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  styled,
  Theme,
} from '@mui/material';
import Logout from '../../../ui/icon/logout';
import { logout } from '../../../../store/actions/auth';
import { SidebarContext } from '../context/sidebar.context';
import { useConfirmation } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../../config/theme/colors';
import { getImagePath } from '../../../../helpers/image.helper';
import { selectAuth } from '../../../../store/selectors';
import { ImageSizesEnum } from "../../../../enums/image-sizes.enum";
import { shortString } from "../../../../helpers/string.helper";

const Item = styled(ListItemButton)(
  ({ theme, color }: ListItemButtonProps & { color: string; theme?: Theme }) => `
    color: ${color};
    display: flex;
    border-radius: 6px;
    margin: 8px 24px;
    height: 36px;
    justify-content: initial;
    fill: ${color};
    stroke: ${color};
    
    &:hover {
        background: ${theme?.palette.text.secondary};
    }
`,
);

const ActiveItem = styled(Item)(
  ({ background }: ListItemButtonProps & { background?: string }) => `
    color: #006fcc;
    fill: #006fcc;
    stroke: #006fcc;
    background: ${background};
`,
);

const ItemText = styled('span')(
  () => `
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`,
);

const UserInfo = styled(Box)(
  () => `
    display: flex;
    position: absolute;
    bottom: 0;
`,
);

const UserAvatar = styled('img')(
  () => `
    width: 40px;
    height: 40px;
    border-radius: 40px;
    object-fit: cover;
    margin-bottom: 8px;
`,
);

const UserName = styled('p')(
  ({ color }) => `
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: ${color};
    margin: 0;
    text-wrap: wrap;
`,
);

const UserEmail = styled('p')(
  ({ theme }) => `
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    color: ${theme.palette.text.disabled};
    margin-bottom: 8px;
`,
);

const LogoutIcon = styled(Logout)(
  () => `
  stroke: ${colors.secondary[10]};
`,
);

const getCurrentRoutePath = () => {
  const currentURL = window.location.href;
  const domain = window.location.origin;
  const urlWithoutDomain = currentURL.replace(domain, '');

  if (!urlWithoutDomain.length) {
    return '';
  }
  return urlWithoutDomain.split('?')[0];
};

interface Props {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const SidebarContent = ({ isMobile = false, onLinkClick }: Props): ReactElement => {
  const [activeLink, setActiveLink] = useState<string>('');
  const { links } = useContext(SidebarContext);
  const { authUser } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Confirmation, showConfirmation } = useConfirmation();
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    setActiveLink(getCurrentRoutePath());
  }, []);

  const handleLinkClick = (link: string) => {
    navigate(link);
    setActiveLink(link);
    onLinkClick && onLinkClick();
  };

  const handleLogout = () => {
    showConfirmation({
      text: 'Confirm logout',
      description: 'Are you sure you want to log out?',
      onConfirm: () => {
        dispatch(logout());
      },
    });
  };

  return (
    <>
      {Confirmation}
      <List>
        {links.map(({ label, link, Icon }) => {
          const ItemButton = link.split('?')[0] === activeLink ? ActiveItem : Item;

          return (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <ItemButton
                sx={
                  !sidebar.opened
                    ? {
                        margin: '14px',
                        padding: '8px',
                      }
                    : {}
                }
                color={isMobile ? colors.secondary[90] : colors.background.BG_1}
                background={isMobile ? colors.secondary[20] : colors.secondary[10]}
                onClick={() => handleLinkClick(link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebar.opened ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                {sidebar.opened && <ItemText>{label}</ItemText>}
              </ItemButton>
            </ListItem>
          );
        })}
      </List>
      {authUser && (
        <UserInfo sx={{ margin: '32px 12px', flexWrap: 'wrap' }}>
          <UserAvatar src={getImagePath(authUser.image_id || 0, ImageSizesEnum.THUMBNAIL)} />
          {sidebar.opened && (
            <>
              <Box sx={{ ml: 1, display: 'grid' }}>
                <UserName color={isMobile ? colors.secondary[60] : colors.background.BG_1}>
                  {shortString(authUser.first_name, 18)} {shortString(authUser.last_name, 18)}
                </UserName>
                <UserEmail>{authUser.email}</UserEmail>
              </Box>
              {!isMobile && (
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              )}
            </>
          )}
        </UserInfo>
      )}
    </>
  );
};

export default SidebarContent;
