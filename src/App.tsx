import React from "react";

import "./App.css";
import { appStore, AppStoreContext } from "./stores/appStore";
import { Game } from "./components/Game/Game";
import { SoundContainer } from "./components/Sound/SoundContainer";

function App() {
    return (
        <AppStoreContext.Provider value={ appStore }>
            <div className="App">
                <Game/>
                <SoundContainer/>
            </div>
        </AppStoreContext.Provider>
    );
}

export default App;
