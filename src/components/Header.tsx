import * as React from 'react'
import { Link } from "react-router-dom";
import { PATHS } from '../constants';

const Header: React.SFC = () => {
    return (
        <ul>
            <li><Link to={PATHS.TOP}>Top</Link></li>
            <li><Link to={PATHS.ABOUT}>About</Link></li>
            <li><Link to={PATHS.NOVELS}>Novel List</Link></li>
        </ul>
    );
}

export default Header;