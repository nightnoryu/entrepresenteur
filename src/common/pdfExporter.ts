import { ElementType, Presentation, Slide } from '../model/types';
import jsPDF from 'jspdf';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../model/constants';

function fillSlidePage(pdf: jsPDF, slide: Slide): void {
  slide.elements.map(element => {
    switch (element.type) {
    case ElementType.TEXT:
      pdf
        .setFont(element.font)
        .setFontSize(element.size)
        .text(element.value, element.position.x, element.position.y);
      break;
    default:
      break;
    }
  });
}

function exportPresentationPDF(presentation: Presentation, filename: string): void {
  if (presentation.slides.length === 0) {
    return;
  }

  const pdf = new jsPDF({
    orientation: 'landscape',
    format: [SLIDE_WIDTH, SLIDE_HEIGHT],
    unit: 'px',
  });
  pdf.setDocumentProperties({
    title: presentation.title,
  });

  fillSlidePage(pdf, presentation.slides[0]);

  presentation.slides.slice(1).map(slide => {
    pdf.addPage();
    fillSlidePage(pdf, slide);
  });

  pdf.save(filename);
}

export default exportPresentationPDF;
