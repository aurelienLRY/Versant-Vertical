import React from 'react'
import CreateActivity from './create'
import AllActivities from './getAllactivities'
import './activity.scss'

/**
 * Renders the Activity component.
 * This component displays all activities and allows creating new activities.
 *
 * @returns {JSX.Element} The rendered Activity component.
 */
function Activity() {
  return (
    <div className='activity'>
        <AllActivities />
        <CreateActivity />
    </div>
  )
}

export default Activity