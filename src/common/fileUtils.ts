import { Presentation } from '../model/types';

type OpenPresentationCallback = (presentation: Presentation) => void;

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
  const input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      const file = target.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const content = event.target.result.toString();
          callback(JSON.parse(content));
        }
      });
    }
  });

  input.click();
}
