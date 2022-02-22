/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Divider as MuiDivider } from '@mui/material';

const Divider = ({ children, textAlign, colorText, colorDivider, ...props }) => (
  <Grid container alignItems="center" spacing={3} {...props}>
    <Grid item xs={textAlign === 'left' ? 2 : true}>
      <MuiDivider color={colorDivider} />
    </Grid>
    <Grid item color={colorText}>
      {children}
    </Grid>
    <Grid item xs={textAlign === 'right' ? 2 : true}>
      <MuiDivider color={colorDivider} />
    </Grid>
  </Grid>
);

export default Divider;
