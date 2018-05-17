import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import Menu from './Menu'
import { login, logout, isLoggedIn } from '../../utils/AuthService'
import { observer } from 'mobx-react'
import history from '../../utils/history'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '430',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: {
    textAlign: 'center',
    padding: 20,
    color: '#3f51b5'
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },
  content: {
    width: '100%',
    display: 'flex',
		flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      marginTop: 60
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 56
    },
  },
});

const Content = observer(class Content extends Component {

	state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleBack = () => {
    history.goBack()
  }

	render() {
		const { classes, theme, children, title, action } = this.props;

		const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Typography variant="title" color="primary" noWrap>
            Cinque
          </Typography>
        </div>
        <Divider />
        <List>
          <Menu
            pathname={history.location.pathname}/>
        </List>
      </div>
    );

		return (
			<div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar} position="fixed" elevation={0}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={
                  action === 'back' ? this.handleBack
                  : this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                {action === 'back' ? <Icon>arrow_back</Icon>
                : <Icon>menu</Icon>}
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              {(isLoggedIn()) ? (
                <div>
                  <Button color="inherit" onClick={() => logout()}>Sair</Button>
                </div>
                ) : (
                <Button color="inherit" onClick={() => login()}>Entrar</Button>
              )}
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </div>
	  )
	}
})

Content.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Content)
