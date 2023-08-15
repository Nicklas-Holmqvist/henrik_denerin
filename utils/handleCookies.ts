export function getLocalStorage(key: string, defaultValue: any) {
  const value = localStorage.getItem(key);

  return value !== null && value !== 'undefined'
    ? JSON.parse(value)
    : defaultValue;
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
