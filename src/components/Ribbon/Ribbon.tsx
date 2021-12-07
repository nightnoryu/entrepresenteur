import React from 'react';
import './Ribbon.css';
import { MenuItemType, RibbonMenu } from './RibbonTypes';
import PresentationTitle from './PresentationTitle/PresentationTitle';

type RibbonProps = {
  menu: RibbonMenu;
};

function Ribbon({ menu }: RibbonProps): JSX.Element {
  return (
    <div className="ribbon">
      <PresentationTitle />
      <nav className="menu">
        <ul className="menu__list">
          {menu.items.map(dropdown => {
            return (
              <li key={dropdown.label}>
                <a href="#" className="menu__link">{dropdown.label}</a>
                <ul className="sub-menu__list">
                  {dropdown.items.map(item => {
                    return item.type === MenuItemType.MenuButton
                      ? (
                        <li key={item.label}>
                          <a href="#" className="sub-menu__link" onClick={item.action}>{item.label}</a>
                        </li>
                      )
                      : (
                        <li key={item.label}>
                          <a href="#" className="sub-menu__link">{item.label}</a>
                          <ul className="sub-sub-menu__list">
                            {item.items.map(subItem => {
                              return (
                                <li key={subItem.label}>
                                  <a href="#" className="sub-sub-menu__link" onClick={subItem.action}>
                                    {subItem.label}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Ribbon;
