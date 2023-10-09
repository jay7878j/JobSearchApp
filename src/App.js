import {Component} from 'react'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetails from './components/JobItemDetails'
import jobApplyContext from './context/jobApplyContext'

class App extends Component {
  state = {
    jobAppliedList: [],
  }

  addToAppliedList = jobItem => {
    const {jobAppliedList} = this.state

    const isJobPresent = jobAppliedList.find(
      each => each.jobData.id === jobItem.jobData.id,
    )

    if (isJobPresent === undefined) {
      this.setState(prev => ({
        jobAppliedList: [
          ...prev.jobAppliedList,
          {...jobItem, isJobApplied: true},
        ],
      }))
    }
  }

  render() {
    const {jobAppliedList} = this.state

    return (
      <jobApplyContext.Provider
        value={{
          jobAppliedList,
          addToAppliedList: this.addToAppliedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/jobs" component={JobsRoute} />
          <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </jobApplyContext.Provider>
    )
  }
}

export default App
