import { List, ListItem, ListItemButtonProps, ListItemIcon, styled, Theme } from "@mui/material";
import { FC, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { colors } from "../../../../config/theme/colors";
import Security from "../../../ui/icon/security";
import useSidebarContext from "../../sidebar/hooks/use-sidebar-context.hook";
import { SidebarContext } from "../../sidebar/context/sidebar.context";
import { ProviderRouteEnum } from "../../../../modules/provider/routes/enums/route.enum";
import Donation from "../../../ui/icon/donation";
import Users from "../../../ui/icon/users";
import Teacher from "../../../ui/icon/teacher";
import UserAdd from "../../../ui/icon/user-add";
import Notebook from "../../../ui/icon/notebook";

const ItemText = styled('span')(
  () => `
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`,
);

const Item = styled('a')(
  ({ theme, color }: ListItemButtonProps & { color: string; theme?: Theme }) => `
    width: 100%;
    color: ${color};
    display: flex;
    align-items: center;
    border-radius: 6px;
    margin: 8px 24px;
    height: 36px;
    justify-content: initial;
    fill: ${color};
    stroke: ${color};
    text-decoration: none;
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

interface SidebarItemProps {
  label: string;
  active: boolean;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}

const SidebarItem = ({ label, active, icon, href, onClick }: SidebarItemProps) => {
  const ItemButton = active ? ActiveItem : Item;

  return (
    <ListItem disablePadding>
      <ItemButton
        href={href}
        color={colors.background.BG_1}
        background={colors.secondary[20]}
        onClick={onClick}
      >
        <ListItemIcon sx={{ justifyContent: 'center'}}>
          {icon}
        </ListItemIcon>
        <ItemText>
          {label}
        </ItemText>
      </ItemButton>
    </ListItem>
  );
};

interface Props {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const SidebarContent = ({ activeLink, setActiveLink }: Props): ReactElement => {
  const { toggle } = useContext(SidebarContext);

  const scrollToSection = (to: string) => document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' });

  const handleClick = (section: string) => {
    scrollToSection(section);
    setActiveLink(section);
    toggle();
  };

  return (
    <List>
      <SidebarItem
        label="Services"
        active={activeLink === 'services'}
        icon={<Security/>}
        onClick={() => handleClick('services')}
      />
      <SidebarItem
        label="How we work"
        active={activeLink === 'how_it_works'}
        icon={<Users/>}
        onClick={() => handleClick('how_it_works')}
      />
      <SidebarItem
        label="Benefits"
        active={activeLink === 'why_therappy'}
        icon={<Donation/>}
        onClick={() => handleClick('why_therappy')}
      />
      <SidebarItem
        label="Our Therapists"
        active={activeLink === 'our_professionals'}
        icon={<Teacher/>}
        onClick={() => handleClick('our_professionals')}
      />
      <SidebarItem
        label="Therapist Login"
        href={ProviderRouteEnum.SIGN_IN}
        active={false}
        icon={<UserAdd/>}
      />
      <SidebarItem
        label="Contacts"
        active={false}
        icon={<Notebook/>}
        onClick={() => handleClick('')}
      />
    </List>
  );
};

export default SidebarContent;
