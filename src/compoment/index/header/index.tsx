import { Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'

class HeaderCompoent extends Component {
    render() {
        return (
            <div style={{ padding: 2, textAlign: 'center' }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={1}>
                        <img alt="" src={process.env.PUBLIC_URL + 'favicon.png'} style={{ height: '45px' }} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h1" component="h2" gutterBottom style={{ marginTop: '10px', color: "white" }}>
                            NGINX FORMAT
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default HeaderCompoent