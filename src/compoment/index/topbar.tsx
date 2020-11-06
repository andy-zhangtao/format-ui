import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LinearProgress } from '@material-ui/core';
import FormatClass from '../format';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        flexGrow: {
            flexGrow: 1
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100%)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -(drawerWidth / 4),
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);

const PersistentDrawerLeft = (props: any) => {
    const classes = useStyles();
    // const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const { route } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <div className="content">
            </div>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.flexGrow} />
                </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <main className={classes.content}>
                    <Suspense fallback={<LinearProgress />}>
                        {renderRoutes(route.routes)}
                    </Suspense>
                </main>
                <FormatClass />
            </main>
        </div>
    );
}

PersistentDrawerLeft.propTypes = {
    route: PropTypes.object
};
export default PersistentDrawerLeft