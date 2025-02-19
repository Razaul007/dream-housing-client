import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router/router.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import {
 
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import { ThemeProvider } from './providers/ThemeProvider.jsx';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>


    <QueryClientProvider  client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
           <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
