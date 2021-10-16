import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()


ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
      <ReactQueryDevtools position={"bottom-right"} />
    </React.StrictMode>
  </QueryClientProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
