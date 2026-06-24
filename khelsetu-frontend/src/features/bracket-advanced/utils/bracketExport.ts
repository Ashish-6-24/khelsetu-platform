export async function exportBracketAsPdf(
  elementId: string,
  tournamentName: string,
): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const el = document.getElementById(elementId);
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const pdf = new jsPDF({
    orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
    unit: 'px',
    format: [imgWidth / 2, imgHeight / 2],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth / 2, imgHeight / 2);
  pdf.save(`${tournamentName.replace(/\s+/g, '_')}_bracket.pdf`);
}

export async function exportBracketAsImage(
  elementId: string,
  tournamentName: string,
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');

  const el = document.getElementById(elementId);
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${tournamentName.replace(/\s+/g, '_')}_bracket.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function printBracket(elementId: string): void {
  const el = document.getElementById(elementId);
  if (!el) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const sanitized = el.innerHTML;
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tournament Bracket</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 20px; }
        img { max-width: 100%; }
      </style>
    </head>
    <body>
      ${sanitized}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

export async function shareBracket(tournamentName: string): Promise<void> {
  const shareData = {
    title: `${tournamentName} - Tournament Bracket`,
    text: `Check out the bracket for ${tournamentName}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // User cancelled or error
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
  }
}
