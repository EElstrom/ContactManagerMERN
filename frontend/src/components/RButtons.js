import React from 'react';

import {AddButton, LogoutButton} from './SVGs'
import './Home.css';

const RButtons = () =>
{

	const doAdd = async() =>
    {
        // switch to add contact screen
        window.location.replace("/register");
    };

    const doLogout = async() =>
    {
        // actually logout!
        window.location.replace("/login");
    };

    // return render(<Buttons />, document.getElementById("root"));
    return (
        <div>
            <LogoutButton class="rButtons" onClick={doLogout}/>
            <AddButton class="rButtons" onClick={doAdd}/>
        </div>
    );
};

export default RButtons;
