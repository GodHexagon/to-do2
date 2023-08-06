import * as React from 'react';
import { useState } from "react";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Grid } from '@mui/material';

export const App = () => {
  const [add, setAdd] = useState(0);

  return (
    <Grid container sx={{ height: '100vh', width: '100vw'}}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
      </Grid>
    </Grid>
  );
} 