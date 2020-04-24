import { Resource } from "../interfaces";
import { makeStyles, Typography } from "@material-ui/core";
import { LibraryBooks, Web, Description, Build, Class, OndemandVideo, VideoCall, Mic } from "@material-ui/icons";
import { ReactChild } from "react";

const resourceTypeIcons: Record<string, (args: any) => ReactChild> = {
    'Guide': (args) => (
        <LibraryBooks {...args} />
    ),
    'Article': (args) => (
        <LibraryBooks {...args} />
    ),
    'Fact Sheet': (args) => (
        <LibraryBooks {...args} />
    ),
    'Other Publication': (args) => (
        <Description {...args} />
    ),
    'Peer-reviewed Publication': (args) => (
        <Description {...args} />
    ),
    'Tools': (args) => (
        <Build {...args} />
    ),
    'Online Training Modules': (args) => (
        <Class {...args} />
    ),
    'Video': (args) => (
        <OndemandVideo {...args} />
    ),
    'Webinar': (args) => (
        <VideoCall {...args} />
    ),
    'Podcast': (args) => (
        <Mic {...args} />
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: theme.spacing(2)
    },
    description: {
        flexDirection: 'column'
    },
    icon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(0, 2),
        minWidth: '30px',
        fontSize: '30px'
    },
    name: {
        fontSize: '18px',
    },
    caption: {
        fontWeight: 500
    }
}));

type ResourceProps = {
    resource: Resource
};

const ResourceComponent: React.FunctionComponent<ResourceProps> = ({resource}) => {
    const classes = useStyles();
    var caption = "";
    var iconFunction = undefined;
    
    if (resource.type) {
        iconFunction = resourceTypeIcons[resource.type];
    }

    if (!iconFunction) {
        iconFunction = (args: any) => (
            <Web {...args} />
        )
    }

    if (resource.type) {
       caption += resource.type + ". ";
    }

    caption += resource.publisher + " in " + resource.origin + ".";

    return (
        <div className={classes.root}>
            <div className={classes.icon}>
                {
                    iconFunction({fontSize: 'inherit', alt: resource.type})
                }
            </div>

            <div className={classes.description}>
                <Typography className={classes.name}>
                    <a href={resource.link}>
                        {resource.name}
                    </a>
                </Typography>

                <Typography className={classes.caption} variant="caption">
                    {caption}
                </Typography>
            </div>
        </div>
    )
};

export default ResourceComponent;