import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import ptLocale from 'date-fns/locale/pt'
import Routes from './Routes'
import red from 'material-ui/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: { main: red['A100'] },
    secondary: { main: red['A100'] }
  }
})

class App extends Component {
  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
          <div>
            <BrowserRouter>
              <Routes/>
            </BrowserRouter>
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
