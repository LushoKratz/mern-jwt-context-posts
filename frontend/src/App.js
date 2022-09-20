import {Routes, Route, NavLink} from 'react-router-dom';
import SignIn from './components/SignIn';
import PageNotFound from './components/PageNotFound';
import SignUp from './components/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoutes';
import Home from './components/Home';
import { GlobalContextProvider } from './context/GlobalContext';
import PostForm from './components/PostForm';

function App() {
  return (
    <div className="App bg-light">
      <AuthContextProvider>
            <GlobalContextProvider>
        <Routes>
              <Route path='/' exact element={ <ProtectedRoute>
                                                <Home />
                                              </ProtectedRoute> } />
          <Route path='/create-post' exact element={ <PostForm /> } />
          <Route path='/update-post/:id' exact element={ <PostForm /> } />
          
          <Route path='/signIn' exact element={ <SignIn /> } />
          <Route path='/signUp' exact element={ <SignUp /> } />
          <Route path='*' exact element={ <PageNotFound /> } />
        </Routes>
            </GlobalContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
