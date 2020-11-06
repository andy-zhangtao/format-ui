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
            <div >
                <BottomNavigation value={this.state.value} onChange={this.onChange}>
                    <BottomNavigationAction target="_blank" href="mailto:ztao8607@gmail.com" value="ztao8607@gmail.com" label="ztao8607@gmail.com" icon={<MailOutlineIcon />} />
                    <BottomNavigationAction target="_blank" href="https://github.com/andy-zhangtao/format-ui" value="GitHub" label="GitHub" icon={<GitHubIcon />} />
                    <BottomNavigationAction value="Travis" label="Travis" icon={<img src="https://camo.githubusercontent.com/3985736bfd5b8ef06d2f949ecf675214784c8d2bbc145eacc6763d73459ec4ee/68747470733a2f2f7472617669732d63692e636f6d2f616e64792d7a68616e6774616f2f666f726d61742d75692e7376673f6272616e63683d6d61696e" alt="Build Status" data-canonical-src="https://travis-ci.com/andy-zhangtao/format-ui.svg?branch=main" />} />
                    <BottomNavigationAction value={process.env.NODE_ENV} label={process.env.NODE_ENV} icon={process.env.REACT_APP_BUILD} />
                </BottomNavigation>
            </div>


        )
    }
}

export default FootBarComponent