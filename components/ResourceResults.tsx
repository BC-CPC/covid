import { Resource, Criteria, CriteriaDataTable, CriteriaType, criteriaDataTable } from "../interfaces";
import { makeStyles, Paper, Typography, Container, Grid, Select, MenuItem, Button, Divider, FormHelperText, FormControl, WithStyles, Theme, createStyles, withStyles, CircularProgress } from "@material-ui/core";
import React, { MouseEventHandler } from "react";
import ResourceComponent from "./Resource";

interface ResultsProps extends WithStyles<typeof mainStyles> {
    criteria: Criteria,
    onCriteriaChange: (
        criteriaType: CriteriaType,
        event: React.ChangeEvent<{value: unknown}>
    ) => void
}

type ResultsState = {
    resultsStatus: SearchResultStatus,
    results: Resource[]
}

const mainStyles = (theme: Theme) => createStyles(({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(4),
        animation: 'fadeIn ease 0.5s',
        minHeight: '30rem',
        maxWidth: '120rem',
        display: 'flex',
        flexDirection: 'column'
    },
    searchTitle: {
        margin: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2)
    }
}));

class ResourceResults extends React.Component<ResultsProps, ResultsState> {
    constructor(props: ResultsProps) {
        super(props);

        this.state = {
            resultsStatus: 'loading',
            results: []
        };
    }

    componentDidMount() {
        this.search();
    }

    async search() {
        this.setState({
            resultsStatus: 'loading'
        });

        try {
            const request = await fetch('https://bc-cpc-covid.azurewebsites.net/search', {
                method: 'POST',
                body: JSON.stringify({
                    query: this.props.criteria
                })
            });
            const responseJson = await request.json();

            this.setState({
                resultsStatus: 'complete',
                results: responseJson as Resource[]
            });
        } catch (err) {
            this.setState({
                resultsStatus: 'error'
            })
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={3}>
                <Typography align={"left"} className={classes.searchTitle} variant="h6">
                    Search By
                </Typography>
                    
                <SearchCriteria criteria={this.props.criteria} onCriteriaChange={this.props.onCriteriaChange} onSearch={this.search.bind(this)} />

                <Divider className={classes.divider} variant="middle" />

                <Typography align={"left"} className={classes.searchTitle} variant="h6">
                    Results
                </Typography>

                <SearchResults results={this.state.results} status={this.state.resultsStatus} />

                <style jsx global>{`
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                `}</style>
            </Paper>
        )
    }
}

export default withStyles(mainStyles)(ResourceResults)

type SearchCriteriaProps = {
    criteria: Criteria,
    onCriteriaChange: (
        criteriaType: CriteriaType,
        event: React.ChangeEvent<{value: unknown}>
    ) => void,
    onSearch: () => void
}

const useCriteriaStyles = makeStyles((theme) => ({
    criteriaRow: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    criteriaForm: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    criteriaSelect: {
        fontSize: '18px',
        fontWeight: 500,
    },
    goButton: {
        flexGrow: 1,
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        maxHeight: 40
    },
}))

const SearchCriteria: React.FunctionComponent<SearchCriteriaProps> = ({criteria, onCriteriaChange, onSearch}) => {
    const classes = useCriteriaStyles();

    return (
        <div className={classes.criteriaRow}>
            {
                Object.entries(criteria).map(([key, value]) => {
                    const type = key as CriteriaType
                    const criteriaData = criteriaDataTable[type]

                    return (
                        <FormControl key={key} className={classes.criteriaForm}>
                            <Select className={classes.criteriaSelect} displayEmpty
                                    value={value}
                                    onChange={(event) => onCriteriaChange(type, event)}>
                                <MenuItem value="">
                                    {criteriaData.name}
                                </MenuItem>

                                {
                                    criteriaData.options.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{criteriaData.name}</FormHelperText>
                        </FormControl>
                    )
                })
            }
            
            <div className={classes.goButton}>
                <Button variant="contained" color="primary" onClick={onSearch}>Go</Button>
            </div>
        </div>
    )
}

type SearchResultStatus = 'complete' | 'loading' | 'error'

type SearchResultsProps = {
    results: Resource[],
    status: SearchResultStatus
}

const useSearchResultsStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1)
    },
    middleRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spaced: {
        margin: theme.spacing(1)
    }
}));

const SearchResults: React.FunctionComponent<SearchResultsProps> = ({results, status}) => {
    const classes = useSearchResultsStyles();

    const createCenteredContent = (message: string, progress?: boolean) => (
        <div className={classes.middleRoot}>
            { progress && 
                <CircularProgress className={classes.spaced} />
            }

            <Typography variant="h6">
                {message}
            </Typography>
        </div>
    )

    if (status === 'loading') {
        return createCenteredContent('Loading results...', true)
    }

    if (status === 'error') {
        return createCenteredContent('Sorry, an error occured! Please try again later.');
    }

    if (results.length === 0) {
        return createCenteredContent('No results found.')
    }

    return (
        <div className={classes.root}>
            {
                results.map((resource, index) => (
                    <Container key={index}>
                        <ResourceComponent resource={resource} />

                        {((index !== 0 || (results.length !== 1)) && index < results.length - 1) && (
                            <Divider />
                        )}
                    </Container>
                ))
            }
        </div>
    )
}