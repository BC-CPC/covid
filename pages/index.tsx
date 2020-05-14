import { Typography, makeStyles, Divider, withStyles, Theme, createStyles, Container } from '@material-ui/core';
import React from 'react';
import ResourceTag from '../components/ResourceTag';
import Header from '../components/Header';
import { Styles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { Resource, CriteriaType, Criteria, criteriaDataTable, CriteriaData } from '../interfaces';
import ResourceResults from '../components/ResourceResults';

const styles = (theme: Theme) => createStyles(({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    test: {
        display: 'flex',
        flexDirection: 'column'
    },
    captionBox: {
        display: 'flex',
        margin: theme.spacing(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    caption: {
        maxWidth: '30rem',
        fontSize: '16px',
        margin: theme.spacing(1, 0, 1, 6)
    },
    sourceTag: {
        fontSize: '12px',
        fontWeight: 300,
        textAlign: 'center',
        margin: theme.spacing(1)
    },
    covidImage: {
        maxHeight: '250px',
        objectFit: 'contain'
    }
}));

type IndexState = {
    criteria: Criteria
}

interface IndexProps extends WithStyles<typeof styles> {
}

class Index extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props);

        this.state = {
            criteria: {
                audience: '',
                topic: '',
                origin: '',
                resourceType: ''
            }
        };
    }

    async componentDidMount() {
        const request = await fetch('https://bc-cpc-covid.azurewebsites.net/criteria');
        const jsonResult = await request.json();

        Object.keys(jsonResult).forEach((key) => {
            criteriaDataTable[key as CriteriaType] = jsonResult[key] as CriteriaData;
        });
        
        this.forceUpdate();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Header />

                <div className={classes.captionBox}>
                    <div className={classes.test}>
                        <img className={classes.covidImage} src="/covid/coronavirus.png" alt="Coronavirus" />
                        <Typography className={classes.sourceTag} variant="caption">
                            Public Health Image Library (#23312) <br />
                            Centers for Disease Control and Prevention
                        </Typography>
                    </div>
                    <Typography className={classes.caption} variant="caption">
                        The team at BC-CPC has gathered links to education, recorded webinars, publications and other practice support tools that have been developed or adapted for the time of COVID-19.
                        They are intended for formal Health Care Providers caring for people affected by life-limiting illness.
                        The resources have not been reviewed in detail and are not created or endorsed by BC-CPC. <br /> <br />

                        This page will be updated on an ongoing basis.
                        To suggest resources to be added or to report inactive links, contact <a href="mailto:kyue@bc-cpc.ca">Kathleen Yue</a>. <br /> <br />

                        For a schedule of upcoming live webinars related to palliative care in the time of COVID-19, take a look at our <a href="https://bc-cpc.ca/cpc/events/">Events</a> calendar.
                    </Typography>
                </div>

                <Divider variant="middle" />

                <Container>
                    <ResourceResults onCriteriaChange={this.onSearchCriteriaChange.bind(this)}
                                     criteria={this.state.criteria} />
                </Container>

                <style global jsx>{`
                    body {
                        margin: 0px;
                        background-color: #f5f5f5;
                    }
                `}</style>
            </div>
        )
    }

    onSearchCriteriaChange(criteriaType: CriteriaType, event: React.ChangeEvent<{value: unknown}>) {
        const criteriaUpdate = this.state.criteria;

        criteriaUpdate[criteriaType] = event.target.value as string;

        this.setState({
            criteria: criteriaUpdate
        })
    }
}

export default withStyles(styles)(Index)
