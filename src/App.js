import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from '~/layouts';
import PopUpNotify from './component/PopUpNotify/PopUpNotify';
import ModalAuth from './component/ModalAuth';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, i) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={
                                    <>
                                        <PopUpNotify />
                                        <ModalAuth />
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;