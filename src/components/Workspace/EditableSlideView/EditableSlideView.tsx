import React, { useRef, useState } from 'react';
import { ElementType, Slide } from '../../../model/types';
import styles from './EditableSlideView.module.css';
import { getSlideBackgroundStyle } from '../../../common/componentsUtils';
import { DEFAULT_ELEMENT_POSITION, SLIDE_HEIGHT, SLIDE_WIDTH } from '../../../model/constants';
import { UUID } from '../../../model/uuid';
import { RootState } from '../../../state/reducers';
import { createNewSlide, isCurrentSlide } from '../../../model/modelUtils';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../../../state';
import EditableImageElement from './Elements/EditableImageElement/EditableImageElement';
import EditableTextElement from './Elements/EditableTextElement/EditableTextElement';
import EditablePrimitiveElement from './Elements/EditablePrimitiveElement/EditablePrimitiveElement';
import useScaleFactorForDragAndDrop from '../../../hooks/dragAndDrop/useScaleFactorForDragAndDrop';
import { bindActionCreators } from 'redux';
import { getScaledImageDimensions, loadFileAsImage } from '../../../common/fileUtils';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideView({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  const dispatch = useDispatch();
  const { addImage } = bindActionCreators(actionCreators, dispatch);

  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  const ref = useRef(null);
  const scaleFactor = useScaleFactorForDragAndDrop(ref);

  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const onDrop = (event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      const item = event.dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          loadFileAsImage(file)
            .then(image => addImage(DEFAULT_ELEMENT_POSITION, getScaledImageDimensions(image), image.src))
            .catch(error => alert(error));
        }
      }

    } else if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file) {
        loadFileAsImage(file)
          .then(image => addImage(DEFAULT_ELEMENT_POSITION, getScaledImageDimensions(image), image.src))
          .catch(error => alert(error));
      }
    }
  };

  return (
    <svg
      viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}
      className={styles.editableSlideView}
      style={slideBackgroundStyle}
      ref={ref}
      tabIndex={0}
      onDrop={onDrop}
      onDragOver={event => {
        event.preventDefault();
      }}
    >
      {slide.elements.map(element => {
        const isSelected = selectedElementIDs.includes(element.id);

        switch (element.type) {
        case ElementType.IMAGE:
          return <EditableImageElement
            key={element.id}
            element={element}
            scaleFactor={scaleFactor}
            delta={delta}
            setDelta={setDelta}
            isSelected={isSelected}
            parentRef={ref}
          />;
        case ElementType.TEXT:
          return <EditableTextElement
            key={element.id}
            element={element}
            scaleFactor={scaleFactor}
            delta={delta}
            setDelta={setDelta}
            isSelected={isSelected}
            parentRef={ref}
          />;
        case ElementType.PRIMITIVE:
          return <EditablePrimitiveElement
            key={element.id}
            element={element}
            scaleFactor={scaleFactor}
            delta={delta}
            setDelta={setDelta}
            isSelected={isSelected}
            parentRef={ref}
          />;
        }
      })}
    </svg>
  );
}

function mapStateToProps(state: RootState): EditableSlideViewProps {
  return {
    slide: state.presentation.slides.find(slide => isCurrentSlide(slide, state.selections.selectedSlideIDs)) || createNewSlide(),
    selectedElementIDs: state.selections.selectedElementIDs,
  };
}

export default connect(mapStateToProps)(EditableSlideView);
