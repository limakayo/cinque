import React, { Component } from 'react'
import { observer } from 'mobx-react'
import userStore from '../stores/UserStore'
import Content from './layout/Content'

import { setUserInfo } from '../utils/AuthService'

const Home = observer(class Home extends Component {
  componentDidMount() {
    if (Object.keys(userStore.profile).length === 0) {
      setUserInfo()
    }
  }

  render() {
    return(
      <div>
        <Content title="Cinque"/>
      </div>
    )
  }
})

export default Home
