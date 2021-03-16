import { FunctionComponent, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Input,TextField, InputLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import moment from "moment";
import { getPostUrlMessage, getPostUrlValue, postUrlToServer, setPostUrlValue } from "./PostUrlReducer";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height:200
    },
    inline: {
        display: 'inline'
    },
    input:{
        borderColor:'grey'
    }
}));


const PostUrl: FunctionComponent = () => {
    const classes = useStyles();
    const postUrlValue = useSelector(getPostUrlValue);
    const postUrlMessage = useSelector(getPostUrlMessage)
    const dispatch = useDispatch();
    
    return (
        <div className={classes.root}>
            <InputLabel>Post new url</InputLabel>
            <TextField
                value={postUrlValue}
                onChange={(ev) => {
                    dispatch(setPostUrlValue(ev.target.value));
                }}
                className={`${classes.inline} ${classes.input}`}
            />
            <Button
                onClick={()=>{
                    dispatch(postUrlToServer);
                    
                }}
            >Post</Button>
            <Typography className={classes.inline}>{postUrlMessage}</Typography>
        </div>
    )
}

export default PostUrl;