import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPdf(
  reportElement: HTMLElement,
  filename: string,
): Promise<void> {
  // Temporarily make visible for rendering
  const prev = reportElement.style.cssText;
  reportElement.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 794px;
    height: 1123px;
    background: #FFFFFF;
    overflow: hidden;
  `;

  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 150));

  const canvas = await html2canvas(reportElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    width: 794,
    height: 1123,
    windowWidth: 794,
  });

  // Restore hidden
  reportElement.style.cssText = prev;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, h);
  pdf.save(filename);
}
