import * as React from 'react';
import { useState } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

export const App = () => {
  const [add, setAdd] = useState(0);

  return (
    <Stack sx={{ width: '100vw', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="text">
            <a href={"index.html"}>
              <Typography sx={{ fontSize: '2rem', color: '#e9e900' }}>T-ToDo</Typography>
            </a>
          </Button>
          <ButtonGroup disabled variant="outlined" aria-label="outlined button group">
            <Button>
              <UndoIcon></UndoIcon>
            </Button>
            <Button>
              <RedoIcon></RedoIcon>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1 }}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
      </Box>

      <Grid sx={{ height: '50px' }}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
      </Grid>
    </Stack>
  );
} 