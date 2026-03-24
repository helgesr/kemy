import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPdf(
  reportElement: HTMLElement,
  filename: string,
): Promise<void> {
  // Ensure the element is visible for rendering
  const prev = reportElement.style.cssText;
  reportElement.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 794px;
    background: #FFFFFF;
  `;

  // Wait for fonts & layout
  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 100));

  const canvas = await html2canvas(reportElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    width: 794,
    windowWidth: 794,
  });

  // Restore hidden state
  reportElement.style.cssText = prev;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Handle multi-page if content is taller than A4
  if (imgHeight <= pdfHeight) {
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    let remainingHeight = canvas.height;
    let position = 0;
    const pageCanvasHeight = (canvas.width * pdfHeight) / pdfWidth;

    while (remainingHeight > 0) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);

      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          canvas,
          0, position,
          canvas.width, pageCanvas.height,
          0, 0,
          canvas.width, pageCanvas.height,
        );
      }

      const pageImgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width;
      if (position > 0) pdf.addPage();
      pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageImgHeight);

      remainingHeight -= pageCanvasHeight;
      position += pageCanvasHeight;
    }
  }

  pdf.save(filename);
}
