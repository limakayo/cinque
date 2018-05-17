import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import List from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import SwipeableViews from 'react-swipeable-views'
import Typography from 'material-ui/Typography'

import { observer } from 'mobx-react'
import pedidoStore from '../../stores/PedidoStore'

import PedidoRow from './PedidoRow'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8, height: '78vh'}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  container: {
    width: '100%'
  },
  progressContainer: {
    height: 200,
    lineHeight: '200px',
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  list: {
    paddingLeft: 32
  },
  floatButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  },
})

const PedidoComponent = observer(class PedidoComponent extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { 
      classes, 
      theme, 
      pedidosAPostar, 
      pedidosPostados, 
      pedidosEncomendas,
    } = this.props
    const { isLoaded } = pedidoStore

    return(
      <div className={classes.container}>
        {isLoaded ? (
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
                centered
              >
                <Tab label="Postar" />
                <Tab label="Postados" />
                <Tab label="Encomendas" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <List>
                      <PedidoRow pedidos={pedidosAPostar}/>
                    </List>
                  </Grid>
                </Grid>
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <List>
                      <PedidoRow pedidos={pedidosPostados}/>
                    </List>
                  </Grid>
                </Grid>
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <List>
                      <PedidoRow pedidos={pedidosEncomendas}/>
                    </List>
                  </Grid>
                </Grid>
              </TabContainer>
            </SwipeableViews>
          </div>
        ) : (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        )}
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.floatButton}
          component={Link}
          to={'pedidos/cadastrar'}>
          <Icon>add</Icon>
        </Button>
      </div>
    )
  }
})

PedidoComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(PedidoComponent)
