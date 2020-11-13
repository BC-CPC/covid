import { Button, createStyles, Dialog, DialogActions, DialogTitle, makeStyles, Theme, Typography, useMediaQuery, useTheme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";

const useSidebarStyles = makeStyles((theme) => ({
    surveyFullScreen: {
        width: '100%',
        height: '100%'
    },
    surveyPortion: {
        width: '75vw',
        maxWidth: theme.breakpoints.width('xl'),
        height: '75vh'
    }
}))

const SurveySidebar: React.FunctionComponent = ({}) => {
    const classes = useSidebarStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const onButtonPress = () => setOpen(true);
    const onClose = () => setOpen(false);

    const surveyClass = fullScreen ? classes.surveyFullScreen : classes.surveyPortion

    return (
        <div>
            <SurveyButton vertical={fullScreen} onClick={onButtonPress} />
            <Dialog fullScreen={fullScreen}
                    open={open}
                    maxWidth={"xl"}
                    onClose={onClose}>
                {!fullScreen && <DialogTitle>Survey</DialogTitle> }
                <iframe className={surveyClass} src="https://ubc.ca1.qualtrics.com/jfe/form/SV_1ZVh5ncrsNxeACN"></iframe>

                <DialogActions>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SurveySidebar

const useSurveyButtonStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '50%',
        maxWidth: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: `
            0px 3px 1px -2px rgba(0,0,0,0.2),
            0px 2px 2px 0px rgba(0,0,0,0.14),
            0px 1px 5px 0px rgba(0,0,0,0.12)
        `
    },
    rootVertical: {
        width: '3rem'
    },
    text: {
        textAlign: 'center',
        margin: '0.5rem',
        color: 'white'
    },
    textVertical: {
        whiteSpace: 'nowrap',
        writingMode: 'vertical-lr'
    }
}));

type SurveyButtonProps = {
    vertical: boolean,
    onClick: () => void
};

const SurveyButton: React.FunctionComponent<SurveyButtonProps> = ({vertical, onClick}) => {
    const classes = useSurveyButtonStyles();
    const rootClasses = [classes.root];
    const textClasses = [classes.text];

    if (vertical) {
        rootClasses.push(classes.rootVertical);
        textClasses.push(classes.textVertical);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={onClick}>
            <Typography className={textClasses.join(' ')} variant="button">
                Feedback
                
                {vertical ? 
                    ' '
                    :
                    <br /> }

                Survey
            </Typography>
        </div>
    )
};