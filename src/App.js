import React from 'react';
import { Route, Routes } from 'react-router';

import { AuthProvider } from './context/AuthProvider.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import Booklist from './components/Book-list/Booklist.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';

import './scss/app.scss';

// export const UserContext = React.createContext();

function App() {
    // const [userName, setUserName] = React.useState('');

    // localStorage.setItem('username', userName);
    // const name = localStorage.getItem('username');
    // console.log(name);
    // console.log('app username', userName);

    // const [isAuth, setIsAuth] = React.useState(false);

    // useEffect(() => {
    //     setIsAuth(if (localStorage.name ? isAuth==='true'){}

    // }, [userName, setUserName]);

    return (
        <div className='wrapper'>
            {/* <UserContext.Provider value={}> */}
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route path='/booklist' element={<Booklist />} />
                    <Route
                        path='/booklist/book/:bookId'
                        element={<SpecificBook />}
                    />
                    <Route path='*' element={<NotFoundBlock />} />
                </Routes>
                <Footer />
            </AuthProvider>
            {/* </UserContext.Provider> */}
        </div>
    );
}

export default App;
