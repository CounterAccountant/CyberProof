import { FunctionComponent, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Input, TextField, InputLabel, makeStyles, Theme, Typography, Link } from "@material-ui/core";
import moment from "moment";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getGetUrlValue, getGetUrlMessage, getBrowseTo, setGetUrlValue, GetUrlToServer } from "./GetUrlReducer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 200
    },
    inline: {
        display: 'inline'
    },
    input: {
        borderColor: 'grey'
    }
}));


const GetUrl: FunctionComponent = () => {
    const classes = useStyles();
    const GetUrlValue = useSelector(getGetUrlValue);
    const GetUrlMessage = useSelector(getGetUrlMessage);
    const browseTo = useSelector(getBrowseTo);
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <InputLabel>Get url</InputLabel>
            <TextField
                value={GetUrlValue}
                onChange={(ev) => {
                    dispatch(setGetUrlValue(ev.target.value));
                }}
                className={`${classes.inline} ${classes.input}`}
            />
            <Button
                onClick={() => {
                    dispatch(GetUrlToServer);

                }}
            >Get</Button>
            <Typography className={classes.inline}>{GetUrlMessage}</Typography>
            {
                browseTo !== null &&
                <a href={browseTo as string} target="_blank">Browse</a>
            }
        </div>
    )
}

export default GetUrl;