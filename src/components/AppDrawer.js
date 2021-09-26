import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LabelIcon from '@mui/icons-material/Label';
import AppsIcon from '@mui/icons-material/Apps';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Icon } from '@iconify/react';
import chefHat from '@iconify/icons-mdi/chef-hat';
import './styles/AppDrawer.css';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const filterByTag = (e) => {
        const filter = {
            type: 'tag',
            value:
                e.target.innerText === 'all recipes'
                    ? null
                    : e.target.innerText,
        };
        props.setFilter(filter);
        setOpen(false);
    };

    const filterByDifficulty = (e) => {
        console.log(e.target.value);
        const filter = {
            type: 'difficulty',
            value: e.target.value,
        };
        props.setFilter(filter);
        setOpen(false);
    };

    const { allTags, recipeFormOpen, filteredTag } = props;
    const getTitle = () => {
        if (recipeFormOpen) return 'Add Recipe';
        if (filteredTag) return `#${filteredTag}`;
        return 'My Saved Recipes';
    };

    return (
        <Box className="AppDrawer" sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {getTitle()}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button key="all recipes" onClick={filterByTag}>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="all recipes" />
                    </ListItem>
                </List>
                <Divider />
                <ListSubheader component="div" id="filter-by-difficulty">
                    Filter by Difficulty
                </ListSubheader>
                <ButtonGroup
                    className="difficulty-level-buttons justify-content-between"
                    size="large"
                    variant="text"
                    aria-label="outlined primary button group"
                >
                    <Button
                        className="d-flex w-100 justify-content-center mx-auto px-0"
                        key="difficulty-1"
                        onClick={filterByDifficulty}
                        style={{ borderColor: '#C6C6C6' }}
                        value={1}
                        id="difficulty-1"
                    >
                        <label htmlFor="difficulty-1">
                            <Icon icon={chefHat} color="gold" />
                        </label>
                    </Button>
                    <Button
                        style={{ borderColor: '#C6C6C6' }}
                        className="d-flex w-100 justify-content-center mx-auto px-0"
                        key="difficulty-2"
                        value={2}
                        onClick={filterByDifficulty}
                        id="difficulty-2"
                    >
                        <label htmlFor="difficulty-2">
                            <Icon icon={chefHat} color="gold" />
                            <Icon icon={chefHat} color="gold" />
                        </label>
                    </Button>
                    <Button
                        className="d-flex w-100 justify-content-center mx-auto px-0"
                        value={3}
                        key="difficulty-3"
                        style={{ borderColor: '#C6C6C6' }}
                        onClick={filterByDifficulty}
                        id="difficulty-3"
                    >
                        <label htmlFor="difficulty-3">
                            <Icon icon={chefHat} color="gold" />
                            <Icon icon={chefHat} color="gold" />
                            <Icon icon={chefHat} color="gold" />
                        </label>
                    </Button>
                </ButtonGroup>

                <Divider />
                <List>
                    {allTags.map((text, index) => (
                        <ListItem button key={text} onClick={filterByTag}>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
