import React from 'react';

export const settings = {
  slideViewWidth: 800,
  slideViewHeight: 600,
  slideViewAspectRatio: {
    width: 16,
    height: 9,
  },
};

export default React.createContext(settings);
