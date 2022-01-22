import { Dimensions, Presentation } from '../model/types';
import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH, PRESENTATION_EXTENSION } from '../model/constants';

enum FileTypes {
  IMAGES = '.jpg,.jpeg,.png,.gif',
  PRESENTATIONS = '.json',
}

function getFileExtension(name: string): string {
  const ext = name.split('.').pop();
  return '.' + ext;
}

function isCorrectFiletype(name: string, types: FileTypes): boolean {
  const typesList = types.split(',');
  const ext = getFileExtension(name);
  return typesList.includes(ext);
}

function openFile(types: FileTypes): Promise<File> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = types;

    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target?.files) {
        const file = target.files[0];
        if (isCorrectFiletype(file.name, types)) {
          resolve(file);
        } else {
          reject('Invalid file type');
        }
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

        reader.onload = event => {
          if (event.target?.result) {
            try {
              const result = JSON.parse(event.target.result.toString());
              resolve(result);
            } catch (e) {
              reject('Invalid presentation format');
            }
          }
        };

        reader.readAsText(file, 'UTF-8');
      })
      .catch(error => reject(error));
  });
}

export function loadFileAsImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = event => {
      if (event.target?.result) {
        const image = new Image();

        image.onload = () => {
          resolve(image);
        };
        image.onerror = () => {
          reject('Invalid image');
        };

        image.src = event.target.result.toString();
      }
    };

    reader.readAsDataURL(file);
  });
}

export async function openImageBase64(): Promise<HTMLImageElement> {
  const file = await openFile(FileTypes.IMAGES);
  return await loadFileAsImage(file);
}

export function pickColor(): Promise<string> {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'color';

    input.onchange = event => {
      const target = event.target as HTMLInputElement;
      if (target?.value) {
        resolve(target.value);
      }
    };

    input.click();
  });
}

export function getScaledImageDimensions(image: HTMLImageElement): Dimensions {
  const result = {
    width: image.width,
    height: image.height,
  };
  const aspectRatio = image.width / image.height;

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
