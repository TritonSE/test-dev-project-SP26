const DATABASE_NAME = "tse-submission-photos";
const DATABASE_VERSION = 1;
const STORE_NAME = "photos";
const PENDING_PHOTOS_KEY = "pending";

async function openPhotoDatabase(): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open photo storage."));
    request.onblocked = () => reject(new Error("Photo storage is blocked by another page."));
  });
}

export async function savePendingPhotos(photos: File[]): Promise<void> {
  const database = await openPhotoDatabase();

  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put(photos, PENDING_PHOTOS_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Could not save selected photos."));
      transaction.onabort = () =>
        reject(transaction.error ?? new Error("Saving selected photos was canceled."));
    });
  } finally {
    database.close();
  }
}

export async function loadPendingPhotos(): Promise<File[]> {
  const database = await openPhotoDatabase();

  try {
    return await new Promise<File[]>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(PENDING_PHOTOS_KEY);

      request.onsuccess = () => {
        const photos: unknown = request.result;
        if (photos === undefined) {
          resolve([]);
        } else if (Array.isArray(photos) && photos.every((photo) => photo instanceof File)) {
          resolve(photos);
        } else {
          reject(new Error("Saved photos could not be read."));
        }
      };
      request.onerror = () => reject(request.error ?? new Error("Could not read saved photos."));
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Could not read saved photos."));
    });
  } finally {
    database.close();
  }
}

export async function clearPendingPhotos(): Promise<void> {
  const database = await openPhotoDatabase();

  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete(PENDING_PHOTOS_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Could not clear saved photos."));
      transaction.onabort = () =>
        reject(transaction.error ?? new Error("Clearing saved photos was canceled."));
    });
  } finally {
    database.close();
  }
}
