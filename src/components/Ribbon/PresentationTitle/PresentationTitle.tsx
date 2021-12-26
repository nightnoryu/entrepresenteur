import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import styles from './PresentationTitle.module.css';
import { RootState } from '../../../state/reducers';
import { BASE_WINDOW_TITLE, WINDOW_TITLE_SEPARATOR } from '../../../model/constants';

type PresentationTitleProps = {
  title: string;
}

function PresentationTitle({ title }: PresentationTitleProps): JSX.Element {
  const dispatch = useDispatch();
  const { changePresentationTitle } = bindActionCreators(actionCreators, dispatch);

  const [editingValue, setEditingValue] = useState(title);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditingValue(event.currentTarget.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim() === '') {
      setEditingValue(title);
    } else {
      changePresentationTitle(event.currentTarget.value);
    }
  };

  const onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  useEffect(() => {
    document.title = title + WINDOW_TITLE_SEPARATOR + BASE_WINDOW_TITLE;
  }, [title]);


  return (
    <input
      type="text"
      aria-label="Presentation Title"
      className={styles.title}
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}

function mapStateToProps(state: RootState): PresentationTitleProps {
  return {
    title: state.presentation.title,
  };
}

export default connect(mapStateToProps)(PresentationTitle);
