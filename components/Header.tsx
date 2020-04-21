import * as React from 'react'
import { AppBar, Toolbar, Typography, styled, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 400,
        fontSize: '32px',
    },
    logo: {
        width: '20rem'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        margin: theme.spacing(1)
    }
}))

const Header: React.FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.container}>
                        <img className={classes.logo} src="/logo.svg" />
                        <Typography className={classes.title} variant="h6">
                            &nbsp; / COVID-19 Resource Center
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
