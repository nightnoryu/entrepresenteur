import React from 'react';
import './Ribbon.css';

type RibbonProps = {
  title: string;
}

function Ribbon({ title }: RibbonProps): JSX.Element {
  return (
    <div className="ribbon">
      <h1>{title}</h1>
      <p>Menu</p>
    </div>
  );
}

export default Ribbon;
