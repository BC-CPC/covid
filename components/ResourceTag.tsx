import * as React from 'react'
import { Typography, Select, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    resourceFilterBox: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(4),
        alignItems: 'center'
    },
    resourceTagBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    resourceTag: {
        margin: theme.spacing(0, 0.5),
        fontWeight: 400,
        fontSize: '22px'
    },
    resourceTagSelect: {
        margin: theme.spacing(0, 0.5),
        fontWeight: 400,
        fontSize: '22px'
    }
}))

type Props = {
    resourceType: string,
    onChange: (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
        child: React.ReactNode
    ) => void
}

const ResourceTag: React.FunctionComponent<Props> = ({resourceType, onChange}) => {
    const classes = useStyles();

    return (
        <div className={classes.resourceFilterBox}>
            <div className={classes.resourceTagBox}>
                <Typography className={classes.resourceTag} variant="h6">
                    I am looking for resources for 
                </Typography>
    
                <Select displayEmpty value={resourceType} className={classes.resourceTagSelect} onChange={onChange}>
                    <MenuItem value="" disabled>
                        Select
                    </MenuItem>
    
                    <MenuItem value={"0"}>Test</MenuItem>
                    <MenuItem value={"1"}>Test2</MenuItem>
                    <MenuItem value={"2"}>Test3</MenuItem>
                    <MenuItem value={"3"}>Test4</MenuItem>
                </Select>
            </div>
        </div>
    )
}

export default ResourceTag