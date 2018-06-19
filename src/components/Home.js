import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import userStore from '../stores/UserStore'
import Content from './layout/Content'
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles'
import { NavLink } from 'react-router-dom'

import { setUserInfo, isLoggedIn } from '../utils/AuthService'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'images/clientes.jpg',
    title: 'Clientes',
    width: '25%',
    location: '/clientes'
  },
  {
    url: 'images/vestidos.jpg',
    title: 'Vestidos',
    width: '25%',
    location: '/vestidos'
  },
  {
    url: 'images/pedidos.jpg',
    title: 'Pedidos',
    width: '25%',
    location: '/pedidos'
  },
  {
    url: 'images/compras.jpg',
    title: 'Compras',
    width: '25%',
    location: '/compras'
  },
];

const Home = observer(class Home extends Component {
  componentDidMount() {
    if (Object.keys(userStore.profile).length === 0) {
      setUserInfo()
    }
  }

  render() {
    const { classes } = this.props

    return(
      <div>
        <Content title="Cinque">
          {isLoggedIn() ? (
            <div className={classes.root}>
              {images.map(image => (
                <ButtonBase
                  focusRipple
                  component={NavLink}
                  to={image.location}
                  key={image.title}
                  className={classes.image}
                  style={{
                    width: image.width,
                  }}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subheading"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      {image.title}
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
              ))}
            </div>
          ) : null}
        </Content>
      </div>
    )
  }
})

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
