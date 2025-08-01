"use client";
import { persistor, store } from '@/store/store'
import React, { Suspense } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'
import Loading from './Loading'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const GlobalProvider = ({children}) => {

  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
            {children}
        </PersistGate>
    </Provider>

    <Suspense fallback={null}>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
    </QueryClientProvider>
    
  )
}

export default GlobalProvider
