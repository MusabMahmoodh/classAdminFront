import React from 'react'
import SubscriptionList from '../components/subscriptions/SubscriptionsList'
import AddSubscription from '../components/subscriptions/AddSubscription'
const subscriptions = () => {
    return (
        <div>
            <AddSubscription/>
            <SubscriptionList/>
        </div>
    )
}

export default subscriptions
