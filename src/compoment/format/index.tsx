import React, { Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { History, LocationState } from 'history'
import { Grid, TextField, Button, LinearProgress } from '@material-ui/core'
import theme from '../../theme'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { formatAction } from '../../redux/nginx'

interface FormatPros {
    onFormat(data: string, callback: () => void): void,
    history: History<LocationState>,
    content: string,
    loading: boolean,
    error: string,
}

interface FormatState {
    content: string;
    loading: boolean;
    error: string,
    showFormat: string,
}

class FormatComponent extends Component<FormatPros, FormatState>{

    state = {
        content: "",
        loading: false,
        error: "",
        showFormat: 'none',
    }

    onTriggerFormat = () => {
        this.props.onFormat(this.state.content, () => {
            console.log('callback')
        })
    }

    onNginxContentChange = (event: any) => {
        this.setState({ content: event.target.value })
    }


    render() {
        // console.log(this.props.loading)
        const { loading, content } = this.props
        if (content) {
            this.state.showFormat = ''
        }


        return (
            <div style={{ padding: 2, textAlign: 'center', color: theme.palette.text.secondary }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={8}>
                        <form >
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Input Your Nginx Conf"
                                multiline
                                rowsMax="100"
                                margin="normal"
                                rows={50}
                                variant="outlined"
                                value={this.state.content}
                                fullWidth
                                onChange={this.onNginxContentChange}
                            />
                            <div style={{ paddingTop: 15 }} >
                                <Button variant="outlined" color="inherit" onClick={this.onTriggerFormat}>
                                    FORMAT
                                </Button>
                            </div>
                            <div style={{ paddingTop: 15 }}>
                                {loading ? <LinearProgress /> : null}
                            </div>
                        </form>
                        <div style={{ display: this.state.showFormat }}>
                            <TextField
                                disabled
                                id="outlined-multiline-flexible"
                                label="Nginx Conf Format"
                                multiline
                                rowsMax="100"
                                margin="normal"
                                variant="outlined"
                                value={content}
                                fullWidth
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    content: state.formatAction.content,
    loading: state.formatAction.loading,
    error: state.formatAction.error,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        onFormat: formatAction,
    },
    dispatch
)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormatComponent))