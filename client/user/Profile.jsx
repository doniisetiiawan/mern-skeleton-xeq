import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Edit, Person } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { read } from './api-user';
import auth from '../auth/auth-helper';
import DeleteUser from './DeleteUser';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      redirectToSignin: false,
    };
  }

  init = (userId) => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId,
      },
      { t: jwt.token },
    ).then((data) => {
      if (!data) this.setState({ redirectToSignin: true });
      else this.setState({ user: data });
    });
  };

  componentDidMount = () => {
    this.init(this.props.match.params.userId);
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.init(nextProps.match.params.userId);
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirectToSignin) return <Redirect to="/signin" />;
    return (
      <>
        <Paper className={classes.root} elevation={4}>
          <Typography
            type="title"
            className={classes.title}
          >
            Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={this.state.user.name}
                secondary={this.state.user.email}
              />
              {auth.isAuthenticated().user
                && auth.isAuthenticated().user._id
                  === this.state.user._id && (
                  <ListItemSecondaryAction>
                    <Link
                      to={`/user/edit/${this.state.user._id}`}
                    >
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <DeleteUser
                      userId={this.state.user._id}
                    />
                  </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={`Joined: ${new Date(
                  this.state.user.created,
                ).toDateString()}`}
              />
            </ListItem>
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Profile);
