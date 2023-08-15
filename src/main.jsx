import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home.jsx'
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import Quiz from './pages/Quiz/Quiz.jsx'
import Result from './pages/Results/Results.jsx'
import AllQuiz from './pages/AllQuiz/AllQuiz.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <HashRouter>
    <Routes>

    <Route path='/' element={<Home />} />

    <Route path='/quiz/:id' element={<Quiz/>} />

    <Route path='/quiz/result/:id' element={<Result/>} />

    <Route path='/allquiz' element={<AllQuiz/>} />
    </Routes>
 
    </HashRouter>
  </React.StrictMode>,
)
