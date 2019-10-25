import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import seashellImg from '../assets/images/seashell.jpg';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(
      2.5,
    )}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 330,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <Typography
          type="headline"
          component="h2"
          className={classes.title}
        >
          Home Page
        </Typography>
        <CardMedia
          className={classes.media}
          image={seashellImg}
          title="Unicorn Shells"
        />
        <CardContent>
          <Typography type="body1" component="p">
            Welcome to the Mern Skeleton home page
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
