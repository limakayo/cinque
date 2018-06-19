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
import moment from 'moment'
import 'moment/locale/pt-br'

import { observer } from 'mobx-react'
import compraStore from '../../stores/CompraStore'

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

const CompraComponent = observer(class CompraComponent extends Component {
  render() {
    const { classes, compras } = this.props
    const { isLoaded } = compraStore

    return(
      <div className={classes.container}>
        {isLoaded ? (
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <List>
                {compras.map((e) => {
                  return (
                    <div key={e._id}>
                      <ListItem
                        button
                        className={classes.list}
                        component={Link}
                        to={`compras/editar/${e._id}`}>
                        <ListItemText
                          primary={e.descricao}
                          secondary={
                            <span>
                              <span>{moment(e.data).locale('pt-br').format('L') + ' - R$ ' + e.valorTotal}</span>
                            </span>
                          }/>
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
          to={'compras/cadastrar'}>
          <Icon>add</Icon>
        </Button>
      </div>
    )
  }
})

CompraComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompraComponent)
