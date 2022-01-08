import { Dimensions, Presentation } from '../model/types';
import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH, PRESENTATION_EXTENSION } from '../model/constants';

enum FileTypes {
  IMAGES = 'image/*',
  PRESENTATIONS = '.json',
}

function openFile(types: FileTypes): Promise<File> {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = types;

    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target?.files) {
        resolve(target.files[0]);
      }
    });

    input.click();
  });
}

export function savePresentationJSON(presentation: Presentation, filename: string): void {
  const file = new Blob([JSON.stringify(presentation)], {
    type: 'text/plain',
  });
  const url = URL.createObjectURL(file);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename + PRESENTATION_EXTENSION;

  link.click();
  URL.revokeObjectURL(url);
}

export function openPresentationJSON(): Promise<Presentation> {
  return new Promise((resolve, reject) => {
    openFile(FileTypes.PRESENTATIONS)
      .then(file => {
        const reader = new FileReader();

        reader.addEventListener('loadend', (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            try {
              const result = JSON.parse(event.target.result.toString());
              resolve(result);
            } catch (e) {
              reject('Invalid presentation format');
            }
          }
        });

        reader.readAsText(file, 'UTF-8');
      });
  });
}

export function openImageBase64(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    openFile(FileTypes.IMAGES)
      .then(file => {
        const reader = new FileReader();

        reader.addEventListener('loadend', (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const image = new Image();

            image.addEventListener('load', () => {
              resolve(image);
            });
            image.addEventListener('error', () => {
              reject('Invalid image');
            });

            image.src = event.target.result.toString();
          }
        });

        reader.readAsDataURL(file);
      });
  });
}

export function pickColor(): Promise<string> {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'color';

    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target?.value) {
        resolve(target.value);
      }
    });

    input.click();
  });
}

export function scaleImage(width: number, height: number): Dimensions {
  const result = { width, height };
  const aspectRatio = width / height;

  if (result.width > DEFAULT_IMAGE_WIDTH) {
    result.width = DEFAULT_IMAGE_WIDTH;
    result.height = result.width / aspectRatio;
  }

  if (result.height > DEFAULT_IMAGE_HEIGHT) {
    result.height = DEFAULT_IMAGE_HEIGHT;
    result.width = result.height * aspectRatio;
  }

  return result;
}
