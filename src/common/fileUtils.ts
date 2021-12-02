import { Presentation } from '../model/types';

type OpenFileHandler = (file: File) => void;
type OpenPresentationCallback = (presentation: Presentation) => void;
type OpenImageCallback = (image: HTMLImageElement) => void;

function openFile(handler: OpenFileHandler): void {
  const input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      handler(target.files[0]);
    }
  });

  input.click();
}

export function savePresentationJSON(presentation: Presentation, filename: string): void {
  const file = new Blob([JSON.stringify(presentation)], {
    type: 'text/plain',
  });
  const url = URL.createObjectURL(file);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename + '.json';

  link.click();
  URL.revokeObjectURL(url);
}

export function openPresentationJSON(callback: OpenPresentationCallback): void {
  openFile(file => {
    const reader = new FileReader();

    reader.addEventListener('loadend', (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        try {
          const result = JSON.parse(event.target.result.toString());
          callback(result);
        } catch (e) {
          alert('Invalid presentation format');
        }
      }
    });

    reader.readAsText(file, 'UTF-8');
  });
}

export function openImageBase64(callback: OpenImageCallback): void {
  openFile(file => {
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener('loadend', (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        const image = new Image();

        image.addEventListener('load', () => {
          callback(image);
        });

        image.src = event.target.result.toString();
      }
    });

    reader.readAsDataURL(file);
  });
}
