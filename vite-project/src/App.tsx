import * as React from 'react';
import { useState } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import DownTriangleIcon from '@mui/icons-material/ArrowDropDownOutlined';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface CardData {
  key: number;// 追加した回数だけ値が大きくなる
}

export const App = () => {
  const [add, setAdd] = useState(0);
  
  // Settingsを開くイベント
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, mode: number) => //mode = -1:false, 0:Not, 1:true
    (event: React.KeyboardEvent | React.MouseEvent) => 
  {
    if (
      event &&
      event.type === 'keydown' &&
      (
        (event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift'
      )
    ){ return; }

    if(mode === -1) {
      setState({ ...state, [anchor]: false });
    } else if(mode === 1) {
      setState({ ...state, [anchor]: true });
    } else {
      setState({ ...state, [anchor]: !state[anchor] });
    }
  };

  // settingsの中身
  const settings = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, -1)}
      onKeyDown={toggleDrawer(anchor, -1)}
    >
      <List>
        <ListItem sx={{ height: '50px' }}></ListItem>
      </List>
      <Divider />
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

  // エリア追加
  const [cardData, setCardData] = React.useState<readonly CardData[]> ([]);
  const [numberNewKey, setNumberNewKey] = useState(0);

  const addCard = () => {
    setCardData([ ...cardData, {key: numberNewKey} ]);
    setNumberNewKey(numberNewKey + 1);
  };

  // カードの中身
  const card = () => (
    <Box width="33vw" height="100%"></Box>
  )

  // スクロールバーの中身
  const sideScrollBar = () => (
    <Slider></Slider>
  )



  return (
    <Stack sx={{ width: '100vw', height: '100vh' }}>
      <AppBar position="static" color="secondary" sx={{ justifyContent: 'center' }}>
        <Toolbar>
          <Button variant="text" href="../index.html" sx={{ marginRight: '20px' }}>
            <Typography sx={{ fontSize: '2rem', color: '#e9e900' }}>T-ToDo</Typography>
          </Button>
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button>
              <UndoIcon></UndoIcon>
            </Button>
            <Button>
              <RedoIcon></RedoIcon>
            </Button>
          </ButtonGroup>

          <Box sx={{ flex: '1' }}></Box>

          <IconButton onClick={toggleDrawer('right', 0)} sx={{ zIndex: '1300' }}>
            <SettingsIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', -1)}
            onOpen={toggleDrawer('right', 1)}
          >
            {settings('right')}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>

      <Box paddingX="0.5vw" overflow="hidden" sx={{ flex: 1 }}>
        <Box height="100%" maxWidth="100000px" position="relative">
          <Grid height="100%" container direction="column" justifyContent="start">
            {cardData.map((data) => {
              return (
                <Grid width="33vw" maxHeight="100%" key={data.key}>
                  <Card sx={{ margin: '10px' }}>
                    <CardContent>
                      {data.key}
                      <TextField fullWidth label="fullWidth" id="fullWidth" variant="standard" />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'end' }}>
                      <IconButton>
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton>
                        <DownTriangleIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Stack paddingX="50px" direction="row" spacing={6} justifyContent="center" alignItems="center" sx={{ height: '70px' }}>
        <Box display="flex" alignItems="center" sx={{ flex: '1' }}>
          {sideScrollBar()}
        </Box>
        <Fab color="primary" aria-label="add" onClick={addCard}>
          <AddIcon />
        </Fab>
      </Stack>
    </Stack>
  );
} 