import React, {Component} from 'react'
import {Grid, Typography} from '@material-ui/core'


class HeaderCompoent extends Component {

    state = {
        title: "",
    }

    componentDidMount() {
        let path = window.location.pathname.toLowerCase()

        switch (path) {
            case '/kube':
                this.setState({
                    title: "KUBERNETES FORMAT"
                })
                break;
            case '/nginx':
                this.setState({
                    title: "NGINX FORMAT"
                })
                break;
        }
    }


    render() {
        return (
            <div style={{padding: 2, textAlign: 'center'}}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={1}>
                        <a href="/Kube">
                            <img alt="" src={process.env.PUBLIC_URL + 'kubernetes_logo.png'} style={{height: '45px'}}/>
                        </a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href="/Nginx">
                            <img alt="" src={process.env.PUBLIC_URL + 'favicon.png'} style={{height: '45px'}}/>
                        </a>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h2" component="h2" gutterBottom
                                    style={{marginTop: '10px', color: "white"}}>
                            {this.state.title}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default HeaderCompoent