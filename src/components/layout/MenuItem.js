import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { NavLink } from 'react-router-dom'
import Button from 'material-ui/Button'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  button: {
  	width: '100%',
  	textTransform: 'none',
  },
  active: {
    background: '#E0E0E0'
  },
  navItem: {
  	paddingBottom: 0,
  	paddingTop: 0,
  	display: 'block'
  },
})

class MenuItem extends Component {
  render() {
    const { classes, title, location, children } = this.props

    return(
      <div>
        <ListItem className={classes.navItem} disableGutters>
          <Button
            component={NavLink}
            to={location}
            activeClassName={classes.active}
            className={classes.button}>
            <ListItemIcon>
              {children}
            </ListItemIcon>
            <ListItemText primary={title} />
          </Button>
        </ListItem>
      </div>
    )
  }
}

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuItem)
