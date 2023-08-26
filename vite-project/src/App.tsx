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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface CardData {
  key: number,// 追加した回数だけ値が大きくなる（現在無制限のため対策必要）
  title: string,
  taskData: TaskData[],
  deleted: boolean
}
interface TaskData {
  key: number,
  taskName: string,
  completed: boolean
}
 
// タスクリストの中身
const TaskList = (prop: {
  taskData: TaskData[],
  onChange: (newData: TaskData[]) => void 
}) => {
  let data = prop.taskData;
  
  const [newTaskKey, setNewTaskKey] = useState(0);
  const createTaskData = () => {
    const newTaskData: TaskData = {key: newTaskKey, taskName: "", completed: false};
    setNewTaskKey(newTaskKey + 1);
    return newTaskData;
  };
  const onAddTask = () => {
    data = [ ...data, createTaskData() ];
    prop.onChange(data);
  };

  const changeTaskData = (taskData: TaskData) => {
    const index: number = data.indexOf(taskData);
    data.splice(index, 1, taskData);
    prop.onChange(data);
  }

  const deleteTask = (key: number) => {
    const dataToDelete = data.find((data) => data.key === key)
    if(dataToDelete === undefined){
      return;
    }
    const index: number = data.indexOf(dataToDelete);
    data.splice(index, 1);
    prop.onChange(data);
  }

  return (
    <List dense>
      {data.map((data) => {
        return(
          <Task 
            data={data} 
            key={data.key} 
            onChange={(data) => changeTaskData(data)}
            onDelete={deleteTask}
          />
        );
      })}
      <ListItem key={-1} disablePadding>
        <ListItemButton
          onClick={onAddTask}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

// タスクの中身
const Task = (prop: {
  data: TaskData,
  onChange: (data: TaskData) => void
  onDelete: (key: number) => void
}) => {
  const data = prop.data;
  const labelId = `checkbox-list-secondary-label-${data.key}`;

  const onTaskNameChange = (text: string) => {
    data.taskName = text;
    prop.onChange(data);
  }

  const deleteTask = (key: number) => () => {
    prop.onDelete(key);
  }

  return (
    <ListItem
      key={data.key}
      sx={{
        '& .MuiListItemSecondaryAction-root': {
          left: '16px',
          right: 'auto'
        },
        '& .MuiListItemButton-root': {
          paddingLeft: '48px',
          paddingRight: '16px'
        }
      }}
      secondaryAction={
        <Checkbox
          edge="start"
          inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <TextField
          fullWidth 
          multiline
          id="task-name" 
          variant="filled"
          size="small" 
          maxRows={3}
          value={data.taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              paddingTop: '4px',
            },
          }} 
        />
        <IconButton
          onClick={deleteTask(data.key)}
        >
          <BackspaceIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}

export const App = () => {
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

  // カードを追加するイベント
  const [newKey, setNewKey] = useState(0);
  const createCardData = () => {
    const newCardData: CardData = {key: newKey, title: '', taskData: [], deleted: false};
    setNewKey(newKey + 1);
    return newCardData;
  };
  const [cardData, setCardData] = React.useState<CardData[]> ([]);
  const addCard = () => {
    setCardData([ ...cardData, createCardData() ]);
  };
  
  // カードを削除するイベント
  const hanDeleteCard = (cardToDelete: CardData) => () => {
    setAnchorCardMenu(null);
    setCardData((chips) => chips.filter((chip) => chip.key !== cardToDelete.key));
  };

  // カードオプションプルダウンのイベント
  const [anchorCardMenu, setAnchorCardMenu] = React.useState<null | HTMLElement>(null);
  const [selectedCardDeta, setSelectedCardData] = React.useState<CardData>();
  const open = Boolean(anchorCardMenu);
  const hanOpenCardMenu = (card: CardData) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCardData(card);
    setAnchorCardMenu(event.currentTarget);
  };
  const hanCloseCardMenu = () => {
    setAnchorCardMenu(null);
  };

  // タイトル入力イベントハンドラー
  const onCardTitleChange = (data: CardData, newText: string) => {
    const index:number = cardData.indexOf(data);
    data.title = newText;
    cardData.splice(index, 1, data);
    setCardData([...cardData]);
  }

  // タスクデータ更新イベント
  const onTaskDataChange = (data: CardData, newData: TaskData[]) => {
    const index:number = cardData.indexOf(data);
    data.taskData = newData;
    cardData.splice(index, 1, data);
    setCardData([...cardData]);
  }
  
  // カードのチェックボックスのイベントハンドラー
  /*
  const [bottomCheckbox, setBottomCheckbox] = useState(false);
  const onBottomCheckboxChange = () => {
    setBottomCheckbox(!bottomCheckbox);
  }
  */

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

          <IconButton id='open-settings' onClick={toggleDrawer('right', 0)} sx={{ zIndex: '1300' }}>
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

      <Box paddingX="0vw" overflow="hidden" sx={{ flex: 1 }}>
        <Box width="0" height="100%" maxWidth="100000px" position="relative">
          <Grid height="100%" container direction="column" justifyContent="start">
            {cardData.map((data) => {
              return (
                <Grid width="25vw" maxHeight="100%" padding="10px" key={data.key}>
                  <Card sx={{ height: '100%' }}>
                    <Stack sx={{ height: '100%' }}>
                      <CardContent>
                        <form>
                          <TextField 
                            fullWidth 
                            multiline
                            id="card-title" 
                            variant="standard" 
                            maxRows={3} 
                            value={
                              data.title
                            }
                            onChange={
                              (e) => onCardTitleChange(data, e.target.value)
                            }
                          />
                        </form>
                      </CardContent>
                      <CardContent sx={{ overflow: 'scroll' }}>
                        <TaskList taskData={data.taskData} onChange={(newData) => onTaskDataChange(data, newData)} />
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'end' }}>
                        <Checkbox
                        />
                        <>
                          <IconButton
                            id="open-card-menu"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={hanOpenCardMenu(data)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </>
                      </CardActions>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}

            <Menu
              id="card-menu"
              anchorEl={anchorCardMenu}
              open={open}
              onClose={hanCloseCardMenu}
              MenuListProps={{
                'aria-labelledby': 'card-menu',
              }}
            >
              <MenuItem onClick={selectedCardDeta === undefined? undefined: hanDeleteCard(selectedCardDeta)}>Delete</MenuItem>
            </Menu>

            <Grid width="25vw" maxHeight="100%">
              <Card variant="outlined" sx={{ margin: '10px' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Fab color="primary" aria-label="add" onClick={addCard}>
                    <AddIcon />
                  </Fab>
                </CardContent>
              </Card>
            </Grid>
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