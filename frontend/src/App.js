import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Appbar from './components/Appbar';
import User from './components/User';
import Show from './components/Show';

function App({ store }) {
  function Page() {
    const pageState = store.getState();
    const currentRole = String(localStorage.getItem("role"));

    switch (pageState) {
      case "Signin":
        return (
          <div>
            <Appbar store={store} />
            <SignIn store={store} />
          </div>
        );
      case "Signup":
        return (
          <div>
            <Appbar store={store} />
            <SignUp store={store} />
          </div>
        );
      case "User":
        if (currentRole === "1" || currentRole === "2") {
          return (
            <div>
              <Appbar store={store} />
              <User />
            </div>
          );
        } else {
          return (
            <div>
              <Appbar store={store} />
              <SignIn store={store} />
            </div>
          );
        }
      case "Show":
        if (currentRole === "1") {
          return (
            <div>
              <Appbar store={store} />
              <Show />
            </div>
          );
        } else {
          return (
            <div>
              <Appbar store={store} />
              <SignIn store={store} />
            </div>
          );
        }
      default:
        return (
          <div>
            <Appbar store={store} />
            <SignIn store={store} />
          </div>
        );
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={{ padding: '16px', background: '#0f172a', color: 'white', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem' }}>FeedBack Management System</h2>
      </header>
      <div className="App-body">
        <Page />
      </div>
    </div>
  );
}

export default App;
