import config from '../../payload.config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import React from 'react'
import { importMap } from './admin/importMap'

type Args = {
  children: React.ReactNode
}

const ServerFunctionHandler = async (args: {
  serverFunctionArgs: {
    args: any
    name: string
  }
}) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={ServerFunctionHandler}>
    {children}
  </RootLayout>
)

export default Layout
