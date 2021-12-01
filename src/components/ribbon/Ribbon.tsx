import React from 'react';
import './Ribbon.css';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { RootState } from '../../state/reducers';
import { MenuItemType, RibbonMenu } from './RibbonTypes';

type RibbonProps = StateProps & OwnProps;

type StateProps = {
  presentationTitle: string;
};

type OwnProps = {
  menu: RibbonMenu;
};

function Ribbon({ presentationTitle, menu }: RibbonProps): JSX.Element {
  const dispatch = useDispatch();
  const { changePresentationTitle } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="ribbon">
      <h1
        className="presentation-name"
        onClick={() => {
          const newTitle = prompt('Enter new title') || '';
          changePresentationTitle(newTitle);
        }}
      >
        {presentationTitle}
      </h1>
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

function mapStateToProps(state: RootState, ownProps: OwnProps): RibbonProps {
  return {
    presentationTitle: state.editor.presentation.title,
    menu: ownProps.menu,
  };
}

export default connect(mapStateToProps)(Ribbon);
