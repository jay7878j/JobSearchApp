import React from 'react'

const jobApplyContext = React.createContext({
  jobAppliedList: [],
  addToAppliedList: () => {},
})

export default jobApplyContext
