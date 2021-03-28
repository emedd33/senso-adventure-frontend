import React from 'react'
import { Redirect } from 'react-router-dom'
import useOwner from '../../../store/hooks/useOwner'

export default function Campaigns() {
    const owner = useOwner()
    if (owner) {

        return (
            <>
                <Redirect to={`/user/${owner}`} />
            </>
        )
    }
    else {
        return <></>
    }
}
