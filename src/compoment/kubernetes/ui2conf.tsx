import React from 'react';
import yaml from "js-yaml";
import {
    Button,
    FormControl,
    Grid,
    InputAdornment, InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TextField, Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export function UI2Conf() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [kind] = React.useState('');
    const [oper, setOper] = React.useState((<div></div>));
    const [hidden, setHidden] = React.useState(true);
    const [kube] = React.useState({
        apiVersion: "apps/v1",
        kind: "",
        metadata: {
            labels: {
                app: "",
            },
            name: "",
            namespace: "default"
        },
        spec: {
            progressDeadlineSeconds: 600,
            replicas: 0,
            revisionHistoryLimit: 10,
            selector: {
                matchLabels: {
                    app: "",
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: "",
                    }
                },
                spec: {
                    containers: [{
                        image: "",
                        imagePullPolicy: "Always",
                        name: "",
                        resources: {
                            limits: {
                                cpu: '500m',
                                memory: '1Gi',
                            },
                            requests: {
                                cpu: '250m',
                                memory: '128Mi',
                            }
                        },
                        ports: [{
                            containerPort: 80,
                            protocol: 'TCP',
                        }],
                        command: ['tail'],
                        args: ['-f', '/etc/hosts'],
                    }],
                },
            }
        }
    });

    const [yamlData, setYamlData] = React.useState('');


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // console.log(event.target.name)

        switch (event.target.name) {
            case 'labels':
                kube.metadata.labels.app = event.target.value
                kube.spec.selector.matchLabels.app = event.target.value
                kube.spec.template.metadata.labels.app = event.target.value
                break
            case 'name':
                kube.metadata.name = event.target.value
                break
            case 'namespace':
                kube.metadata.namespace = event.target.value
                break
            case 'replicas':
                kube.spec.replicas = Number(event.target.value)
                break
            case 'image':
                kube.spec.template.spec.containers[0].image = event.target.value
                break
            case 'conName':
                kube.spec.template.spec.containers[0].name = event.target.value
                break
            case 'cpu-req':
                kube.spec.template.spec.containers[0].resources.requests.cpu = String(event.target.value) + 'm'
                break
            case 'cpu-limit':
                kube.spec.template.spec.containers[0].resources.limits.cpu = String(event.target.value) + 'm'
                break
            case 'memory-req':
                kube.spec.template.spec.containers[0].resources.requests.memory = String(event.target.value) + 'Gi'
                break
            case 'memory-limit':
                kube.spec.template.spec.containers[0].resources.limits.memory = String(event.target.value) + 'Gi'
                break
            case 'port':
                kube.spec.template.spec.containers[0].ports[0].containerPort = Number(event.target.value)
                break
            case 'cmd':
                kube.spec.template.spec.containers[0].command[0] = event.target.value.trim()
                break
            case 'args':
                // let argsTrim = .replace('  ', ' ')
                // console.log(argsTrim)
                let argList = event.target.value.split(' ')

                kube.spec.template.spec.containers[0].args = []

                argList.forEach((a) => {
                    if (a !== '') {
                        kube.spec.template.spec.containers[0].args.push(a.trim())
                    }
                })

                break
        }

        let result = yaml.dump(kube, {
            indent: 4,
        })
        setYamlData(result)
        setHidden(false)
        setOper((<div>
            <Button variant="contained" color="primary" size={"small"} onClick={copy}>
                COPY
            </Button>
        </div>))
    }

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {

        // console.log(event.target)
        switch (event.target.name) {
            case 'kind':
                kube.kind = event.target.value as string
                break;
            case 'pull':
                kube.spec.template.spec.containers[0].imagePullPolicy = event.target.value as string
                break
        }


        let result = yaml.dump(kube, {
            indent: 4,
        })
        setYamlData(result)
        setHidden(false)
        setOper((<div>
            <Button variant="contained" color="primary" size={"small"} onClick={copy}>
                COPY
            </Button>
        </div>))
    };

    const copy = () => {
        let result = yaml.dump(kube, {
            indent: 2,
        })
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = result;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div >
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    拷贝成功!
                </Alert>
            </Snackbar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                className={classes.grid}
            >
                <Grid item xs={6} sm={6}>
                    <Paper>
                        <div className={classes.gridContent}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">应用类型</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={kind}
                                            onChange={handleChange}
                                            name={"kind"}
                                        >
                                            <MenuItem value={"Deployment"}>Deployment</MenuItem>
                                            <MenuItem value={"StatefulSet"}>StatefulSet</MenuItem>
                                            <MenuItem value={"DaemonSet"}>DaemonSet</MenuItem>
                                            <MenuItem value={"Job"}>Job</MenuItem>
                                            <MenuItem value={"CronJob"}>CronJob</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField id="outlined-basic" label="标签" size="small" variant="outlined"
                                               name={"labels"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <TextField id="outlined-basic" label="名称" size="small" variant="outlined"
                                               name={"name"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <TextField id="outlined-basic" label="命名空间" size="small" variant="outlined"
                                               name={"namespace"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <TextField id="outlined-basic" label="副本数量" type="number" size="small"
                                               variant="outlined"
                                               defaultValue={0}
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               name={"replicas"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={8} sm={8}>
                                    <TextField id="outlined-basic" fullWidth label="镜像名称" size="small"
                                               variant="outlined"
                                               name={"image"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">镜像更新策略</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={"Always"}
                                        onChange={handleChange}
                                        name={"pull"}
                                    >
                                        <MenuItem value={"Always"}>每次更新</MenuItem>
                                        <MenuItem value={"IfNotPresent"}>不存在时更新</MenuItem>
                                        <MenuItem value={"Never"}>永远不更新</MenuItem>
                                    </Select>
                                </FormControl>
                                <Grid item xs={6} sm={6}>
                                    <TextField id="outlined-basic" fullWidth label="容器名称" size="small"
                                               variant="outlined"
                                               name={"conName"}
                                               onChange={handleInputChange}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField id="outlined-basic" label="暴露端口" type="number" size="small"
                                               variant="outlined"
                                               defaultValue={80}
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               name={"port"}
                                               onChange={handleInputChange}/>
                                </Grid>


                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="CPU请求资源"
                                        id="standard-start-adornment"
                                        defaultValue={500}
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        type="number"
                                        name={"cpu-req"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">m</InputAdornment>,
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="CPU最大资源"
                                        id="standard-start-adornment"
                                        defaultValue={500}
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        type="number"
                                        name={"cpu-limit"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">m</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="内存请求资源"
                                        id="standard-start-adornment"
                                        defaultValue={1}
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        type="number"
                                        name={"memory-req"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">Gi</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="内存最大资源"
                                        id="standard-start-adornment"
                                        defaultValue={1}
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        type="number"
                                        name={"memory-limit"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">Gi</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="执行命令"
                                        defaultValue={"tail"}
                                        id="standard-start-adornment"
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        name={"cmd"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        label="命令参数"
                                        defaultValue={"-f /etc/hosts"}
                                        id="standard-start-adornment"
                                        onChange={handleInputChange}
                                        className={classes.margin}
                                        size={"small"}
                                        name={"args"}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Paper hidden={hidden}>
                        <div className={classes.gridContent}>
                            <Grid container>
                                <Grid item xs={8} sm={8}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        <InputBase
                                            id={"result"}
                                            className={classes.margin}
                                            value={yamlData}
                                            multiline
                                            readOnly
                                            fullWidth
                                            inputProps={{'aria-label': 'naked'}}
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <div className={classes.margin}>
                                        {oper}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}