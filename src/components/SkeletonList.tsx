import React, { useEffect, useState } from "react";
// import { Skeleton } from "@material-ui/lab";
import {
  ListItem,
  Typography,
  Grid,
  ListItemAvatar,
  Paper,
  Badge,
  makeStyles,
} from "@material-ui/core";
import { ThumbUpAltOutlined as LikeIcon, CommentRounded as CommentIcon } from "@material-ui/icons";
import { transactionDetailMachine } from "../machines/transactionDetailMachine";
import { useMachine } from "@xstate/react";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "95%",
  },
  paper: {
    padding: theme.spacing(0),
    margin: "auto",
    width: "100%",
  },
  avatar: {
    width: theme.spacing(2),
  },
  socialStats: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  countIcons: {
    color: theme.palette.grey[400],
  },
  countText: {
    color: theme.palette.grey[400],
    marginTop: 2,
    height: theme.spacing(2),
    width: theme.spacing(2),
  },
}));
const transactionId = "eosWcYRrzdKm";

const ListSkeleton = () => {
  const classes = useStyles();
  const [idChecked, setIdChecked] = useState<string>();
  const [current, send] = useMachine(transactionDetailMachine);

  useEffect(() => {
    send("FETCH", { transactionId });
  }, [send, transactionId]);

  return (
    <div className={classes.root} data-test="list-skeleton">
      <br />
      <ListItem
        alignItems="flex-start"
        // onClick={() => showTransactionDetail(transaction.id)}
      >
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={2}>
            <Grid item>
              <ListItemAvatar>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                ></Badge>
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <input type="checkbox" defaultChecked={false} onChange={() => setIdChecked("test")} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {"testung"}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    className={classes.socialStats}
                  >
                    <Grid item>
                      <LikeIcon className={classes.countIcons} />
                    </Grid>
                    <Grid item>
                      <Typography data-test="transaction-like-count" className={classes.countText}>
                        {2}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CommentIcon className={classes.countIcons} />
                    </Grid>
                    <Grid item>
                      <Typography
                        data-test="transaction-comment-count"
                        className={classes.countText}
                      >
                        {1}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Paper>
      </ListItem>
      <br />
      <br />
      {/* <Skeleton />
      <input type="checkbox" defaultChecked={false} onChange={() => setIdChecked("test")} />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <input type="checkbox" defaultChecked={false} onChange={() => setIdChecked("test")} />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <input type="checkbox" defaultChecked={false} onChange={() => setIdChecked("test")} />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" /> */}
    </div>
  );
};

export default ListSkeleton;
