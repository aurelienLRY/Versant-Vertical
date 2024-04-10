import CreateActivity from '../../../features/createActivity'
import AllActivities from '../../../features/getActivities'
import './outletActivity.scss'

/**
 * Renders the Activity component.
 * This component displays all activities and allows creating new activities.
 *
 * @returns {JSX.Element} The rendered Activity component.
 */
function OutletActivity() {
  return (
    <div className='outletActivity' data-testid='outlet-activity'>
        <AllActivities />
        <CreateActivity />
    </div>
  )
}

export default OutletActivity