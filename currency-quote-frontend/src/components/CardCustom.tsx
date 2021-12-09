import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  children: any;
  buttonActions?: () => JSX.Element
}

export function CardCustom({ title, subtitle, children, buttonActions }: Props) {

  const boxProps: SxProps = {
    width: "auto",
    height: "auto",
  }

  if (!buttonActions) {
    buttonActions = () => <></>
  }

  return (
    <Box sx={boxProps}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subtitle}
          </Typography>
          {children}
        </CardContent>
        {buttonActions()}
      </Card>
    </Box>
  );
}