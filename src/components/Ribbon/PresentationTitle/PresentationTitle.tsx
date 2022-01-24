import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import styles from './PresentationTitle.module.css';
import { RootState } from '../../../state/reducers';
import { BASE_WINDOW_TITLE, WINDOW_TITLE_SEPARATOR } from '../../../model/constants';
import useElementWidth from '../../../hooks/useElementWidth';
import useInlineEditing from '../../../hooks/useInlineEditing';

type PresentationTitleProps = {
  title: string;
}

function PresentationTitle({ title }: PresentationTitleProps): JSX.Element {
  const dispatch = useDispatch();
  const { changePresentationTitle } = bindActionCreators(actionCreators, dispatch);

  const [editingValue, onChange, onKeyDown, onBlur, onFocus] = useInlineEditing(
    title,
    newTitle => changePresentationTitle(newTitle),
  );

  useEffect(() => {
    document.title = title + WINDOW_TITLE_SEPARATOR + BASE_WINDOW_TITLE;
  }, [title]);

  const placeholderRef = useRef<HTMLSpanElement>(null);
  const width = useElementWidth(placeholderRef, [editingValue]);

  return (
    <div className={styles.title}>
      <span
        className={styles.titlePlaceholder}
        ref={placeholderRef}
      >
        {editingValue}
      </span>
      <input
        type="text"
        spellCheck="false"
        className={styles.titleInput}
        style={{
          width: `${width}px`,
        }}
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

function mapStateToProps(state: RootState): PresentationTitleProps {
  return {
    title: state.presentation.title,
  };
}

export default connect(mapStateToProps)(PresentationTitle);
