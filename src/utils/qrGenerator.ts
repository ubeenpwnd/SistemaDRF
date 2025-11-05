export const generateQRCode = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return `${timestamp}-${randomString}`;
};
