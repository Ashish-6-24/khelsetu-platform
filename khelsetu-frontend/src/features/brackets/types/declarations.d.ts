declare module 'html2canvas' {
  interface Options {
    scale?: number;
    useCORS?: boolean;
    backgroundColor?: string;
    [key: string]: unknown;
  }
  function html2canvas(
    element: HTMLElement,
    options?: Options,
  ): Promise<HTMLCanvasElement>;
  export default html2canvas;
}

declare module 'jspdf' {
  class jsPDF {
    constructor(options: {
      orientation?: string;
      unit?: string;
      format?: number[] | string;
    });
    addImage(
      imgData: string,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number,
    ): void;
    save(filename: string): void;
  }
  export default jsPDF;
}
