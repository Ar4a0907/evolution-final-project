import React from 'react';
import './App.css';
import {appStore, AppStoreContext} from "./stores/appStore";
import {Game} from "./components/Game/Game";

function App() {
    return (
        <AppStoreContext.Provider value={appStore}>
            <div className="App">
                <Game/>
            </div>
        </AppStoreContext.Provider>
    );
}

export default App;
