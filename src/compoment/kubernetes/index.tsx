import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
    Grid,
    Button,
} from "@material-ui/core";
import {UI2Conf} from './ui2conf'
import {Conf2UI} from './conf2ui'

// function Alert(props: AlertProps) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: 2,
            color: theme.palette.text.secondary,
            marginLeft: '3rem'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        grid: {
            flexGrow: 1,
            marginTop: '2rem',
        },
        gridContent: {
            marginLeft: '2rem',
            marginBottom: '2rem',
            marginRight: '2rem'
        },
        margin: {
            margin: theme.spacing(1),
            fontSize: '13px',
            fontFamily: 'Helvetica,Arial',
            lineHeight: '1.2rem',
        },
        input: {}
    }),
);

export default function KubeComponent() {
    const classes = useStyles();
    const [hiddenUI, setHiddenUI] = React.useState(false);
    const [hiddenConf, setHiddenConf] = React.useState(true);
    const showUI2Conf = () => {
        setHiddenUI(false)
        setHiddenConf(true)
    }

    const showConf2UI = () => {
        setHiddenUI(true)
        setHiddenConf(false)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item>
                    <div>
                        <Button variant="outlined" color="default" size={"small"} onClick={showUI2Conf}>
                            配置生成YAML
                        </Button>
                    </div>
                </Grid>
                <Grid item>
                    <div>
                        <Button variant="outlined" color="default" size={"small"} onClick={showConf2UI}>
                            YAML生成配置
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div hidden={hiddenUI}>
                        <UI2Conf/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div hidden={hiddenConf}>
                        <Conf2UI/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}