import { ElementType, ImageElement, Presentation, PrimitiveElement, Slide, TextElement } from '../model/types';
import jsPDF from 'jspdf';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../model/constants';
import { mapFontToString } from '../model/modelUtils';

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
    default:
      break;
    }
  });
}

function addText(pdf: jsPDF, element: TextElement): void {
  pdf
    .setTextColor(element.color)
    .setFont(mapFontToString(element.font))
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
  console.log('Primitive');
}

export default exportPresentationPDF;
