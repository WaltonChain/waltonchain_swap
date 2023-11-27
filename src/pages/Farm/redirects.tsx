import React from 'react'
import { Redirect,RouteComponentProps } from 'react-router-dom'
import Farm from './index'

export function RedirectToFarm() {
    return <Redirect to="/farm/" />
}

export function RedirectStakeToken(props: RouteComponentProps<{ pid:any }>) {
    return <Farm {...props} />
}

export function RedirectStakeType(props: RouteComponentProps<{ type:any }>) {
    return <Farm {...props} />
}