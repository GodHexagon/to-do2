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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Slider from '@mui/material/Slider';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const App = () => {
  const [add, setAdd] = useState(0);
  
  // Settingsを開くイベント
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        (
          (event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift'
        )
      )
      {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  // settingsの中身
  const settings = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <RedoIcon /> : <RedoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <RedoIcon /> : <RedoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // スクロールバーの中身
  const sideScrollBar = () => (
    <Slider></Slider>
  )



  return (
    <Stack sx={{ width: '100vw', height: '100vh' }}>
      <AppBar position="static" color="secondary" sx={{ justifyContent: 'space-between' }}>
        <Toolbar>
          <Button variant="text" href="../index.html" sx={{ marginRight: '20px' }}>
              <Typography sx={{ fontSize: '2rem', color: '#e9e900' }}>T-ToDo</Typography>
          </Button>
          <ButtonGroup disabled variant="contained" aria-label="outlined button group">
            <Button>
              <UndoIcon></UndoIcon>
            </Button>
            <Button>
              <RedoIcon></RedoIcon>
            </Button>
          </ButtonGroup>

          <Box sx={{ flex: '1' }}></Box>

          <Button variant="text" onClick={toggleDrawer('right', true)}>
            <SettingsIcon></SettingsIcon>
          </Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {settings('right')}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1 }}>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
        <Button variant="contained" onClick={() => setAdd(() => add + 1)}>Contained*{add}</Button>
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