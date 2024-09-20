import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-end" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    padding: '12px',
    fontSize: '12px',
    borderRadius: 8,
  },
}));

interface Props extends TooltipProps {
  title: string | ReactNode;
  children: ReactElement<any, any>;
}

const CustomTooltip = ({ title, children }: Props): ReactElement => {
  return <StyledTooltip title={title}>{children}</StyledTooltip>;
};

export default CustomTooltip;
