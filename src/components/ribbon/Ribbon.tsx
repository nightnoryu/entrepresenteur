import React from 'react';
import './Ribbon.css';

function Ribbon(): JSX.Element {
    return (
        <div className="ribbon">
            <h1 className="presentation-name">New presentation</h1>
            <nav className="menu">
                <ul className="menu__list">
                    <li>
                        <a href="#" className="menu__link">File</a>
                        <ul className="sub-menu__list">
                            <li>
                                <a href="#" className="sub-menu__link">New</a>
                                <ul className="sub-sub-menu__list">
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Empty</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">From template</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Open</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Rename</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Download</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Export</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="menu__link">Edit</a>
                        <ul className="sub-menu__list">
                            <li>
                                <a href="#" className="sub-menu__link">Undo</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Redo</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Delete</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Text</a>
                                <ul className="sub-sub-menu__list">
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Color</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Font</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Size</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Primitive</a>
                                <ul className="sub-sub-menu__list">
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Fill</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Stroke</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="menu__link">Insert</a>
                        <ul className="sub-menu__list">
                            <li>
                                <a href="#" className="sub-menu__link">Image</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Text</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Primitive</a>
                                <ul className="sub-sub-menu__list">
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Rectangle</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Triangle</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Circle</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="menu__link">Slide</a>
                        <ul className="sub-menu__list">
                            <li>
                                <a href="#" className="sub-menu__link">New</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Delete</a>
                            </li>
                            <li>
                                <a href="#" className="sub-menu__link">Change Background</a>
                                <ul className="sub-sub-menu__list">
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Color</a>
                                    </li>
                                    <li>
                                        <a href="#" className="sub-sub-menu__link">Image</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Ribbon;
