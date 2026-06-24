import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css'
import SessionsList from './pages/sessions/SessionsList';
import SessionManage from './pages/sessions/SessionManage';
import SessionDetails from './pages/sessions/SessionDetails';
import SessionRegister from './pages/sessions/SessionRegister';
import Dashboard from './pages/Dashboard';
import RouteManage from './pages/routes/RouteManage';
import ActionManage from './pages/actions/ActionManage';
import ActionRegister from './pages/actions/ActionRegister';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard></Dashboard>}>
            <Route path='sessions'>
              <Route index element={<SessionsList></SessionsList>}></Route>

              <Route path=':sessionId'>
                <Route index element={<SessionDetails></SessionDetails>}></Route>

                <Route path='manage' element={<SessionManage></SessionManage>}></Route>

                <Route path='register' element={<SessionRegister></SessionRegister>}></Route>

                <Route path='route'>
                  <Route path=':routeId'>
                    <Route index element={<RouteManage></RouteManage>}></Route>

                    <Route path='action'>
                      <Route path='register' element={<ActionRegister></ActionRegister>}></Route>
                      
                      <Route path=':actionId'>
                        <Route index element={<ActionManage></ActionManage>}></Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
