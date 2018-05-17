import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'

import { observer } from 'mobx-react'
import clienteStore from '../../stores/ClienteStore'

const styles = theme => ({
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

const ClienteComponent = observer(class ClienteComponent extends Component {
  render() {
    const { classes, clientes } = this.props
    const { isLoaded } = clienteStore

    return(
      <div className={classes.container}>
        {isLoaded ? (
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <List>
                {clientes.map((e) => {
                  return (
                    <div key={e._id}>
                      <ListItem
                        button
                        className={classes.list}
                        component={Link}
                        to={`clientes/editar/${e._id}`}>
                        <ListItemText
                          primary={e.nome}
                          secondary={e.instagram}/>
                      </ListItem>
                      <li>
                        <Divider />
                      </li>
                    </div>
                  )
                })}
              </List>
            </Grid>
          </Grid>
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
          to={'clientes/cadastrar'}>
          <Icon>add</Icon>
        </Button>
      </div>
    )
  }
})

ClienteComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClienteComponent)
