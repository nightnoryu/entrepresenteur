import {
  Background,
  BackgroundType,
  ElementType,
  ImageElement,
  Presentation,
  PrimitiveElement,
  PrimitiveStrokeStyle,
  PrimitiveType,
  Slide,
  TextElement,
} from '../model/types';
import jsPDF from 'jspdf';
import { SLIDE_HEIGHT, SLIDE_WIDTH, STROKE_STYLE_DASHED, STROKE_STYLE_DOT_DASHED } from '../model/constants';
import { mapFontToString } from '../model/modelUtils';
import { calculateEllipseProperties, calculateTrianglePoints } from './componentsUtils';

function exportPresentationPDF(presentation: Presentation, filename: string): void {
  if (presentation.slides.length === 0) {
    return;
  }

  const pdf = initializeDocument(presentation.title);

  fillSlidePage(pdf, presentation.slides[0]);
  presentation.slides.slice(1).map(slide => {
    pdf.addPage();
    fillSlidePage(pdf, slide);
  });

  pdf.save(filename);
}

function initializeDocument(title: string): jsPDF {
  const pdf = new jsPDF({
    orientation: 'landscape',
    format: [SLIDE_WIDTH, SLIDE_HEIGHT],
    unit: 'px',
  });
  pdf.setDocumentProperties({
    title: title,
  });

  return pdf;
}

function fillSlidePage(pdf: jsPDF, slide: Slide): void {
  setBackground(pdf, slide.background);

  slide.elements.map(element => {
    switch (element.type) {
    case ElementType.TEXT:
      addText(pdf, element);
      break;
    case ElementType.IMAGE:
      addImage(pdf, element);
      break;
    case ElementType.PRIMITIVE:
      addPrimitive(pdf, element);
      break;
    }
  });
}

function setBackground(pdf: jsPDF, background: Background): void {
  if (background.type === BackgroundType.SOLID) {
    pdf
      .setFillColor(background.color)
      .rect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT, 'DF');
  } else {
    pdf.addImage({
      imageData: background.src,
      x: 0,
      y: 0,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });
  }
}

function addText(pdf: jsPDF, element: TextElement): void {
  pdf
    .setTextColor(element.color)
    .setFont(
      mapFontToString(element.font),
      element.isItalic ? 'italic' : '',
      element.isBold ? 'bold' : undefined,
    )
    .setFontSize(element.size)
    .text(element.value, element.position.x, element.position.y);
}

function addImage(pdf: jsPDF, element: ImageElement): void {
  pdf.addImage({
    imageData: element.src,
    x: element.position.x,
    y: element.position.y,
    width: element.dimensions.width,
    height: element.dimensions.height,
  });
}

function addPrimitive(pdf: jsPDF, element: PrimitiveElement): void {
  setPrimitiveStyling(pdf, element);

  switch (element.primitiveType) {
  case PrimitiveType.RECTANGLE:
    addRectangle(pdf, element);
    break;
  case PrimitiveType.TRIANGLE:
    addTriangle(pdf, element);
    break;
  case PrimitiveType.ELLIPSE:
    addEllipse(pdf, element);
    break;
  }
}

function setPrimitiveStyling(pdf: jsPDF, element: PrimitiveElement): void {
  pdf
    .setFillColor(element.fill)
    .setDrawColor(element.stroke)
    .setLineDashPattern(getLineDashPattern(element.strokeStyle), 0)
    .setLineWidth(element.strokeSize);
}

function getLineDashPattern(style: PrimitiveStrokeStyle): number[] {
  switch (style) {
  case PrimitiveStrokeStyle.SOLID:
    return [];
  case PrimitiveStrokeStyle.DASHED:
    return STROKE_STYLE_DASHED;
  case PrimitiveStrokeStyle.DOT_DASHED:
    return STROKE_STYLE_DOT_DASHED;
  }
}

function addRectangle(pdf: jsPDF, element: PrimitiveElement): void {
  pdf
    .rect(element.position.x, element.position.y, element.dimensions.width, element.dimensions.height, 'DF');
}

function addTriangle(pdf: jsPDF, element: PrimitiveElement): void {
  const points = calculateTrianglePoints(element);
  pdf
    .path([
      {
        op: 'm',
        c: [points[0].x, points[0].y],
      },
      {
        op: 'l',
        c: [points[1].x, points[1].y],
      },
      {
        op: 'l',
        c: [points[2].x, points[2].y],
      },
      {
        op: 'h',
      },
    ])
    .fillStroke();
}

function addEllipse(pdf: jsPDF, element: PrimitiveElement): void {
  const properties = calculateEllipseProperties(element);
  pdf
    .ellipse(properties.cx, properties.cy, properties.rx, properties.ry, 'DF');
}

export default exportPresentationPDF;
