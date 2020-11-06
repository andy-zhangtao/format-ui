import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GitHubIcon from '@material-ui/icons/GitHub';

class FootBarComponent extends Component {

    state = {
        value: "",
    }
    onChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        this.setState({ value: newValue })
    }
    render() {
        return (
            <BottomNavigation value={this.state.value} onChange={this.onChange}>
                <BottomNavigationAction target="_blank" href="mailto:ztao8607@gmail.com" value="ztao8607@gmail.com" label="ztao8607@gmail.com" icon={<MailOutlineIcon />} />
                <BottomNavigationAction target="_blank" href="https://github.com/andy-zhangtao/format-ui" value="GitHub" label="GitHub" icon={<GitHubIcon />} />
            </BottomNavigation>

        )
    }
}

export default FootBarComponent