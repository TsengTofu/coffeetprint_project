export default function LocalStorageSupport(localStorageKey) {
  // 互相影響的資料處理才會放在同一個 module 裡面
  const saveItem = (favorite) => {
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem(localStorageKey, favoriteString);
  };
  const getItem = () => JSON.parse(localStorage.getItem(localStorageKey));
  const removeItem = () => localStorage.removeItem(localStorageKey);
  return {
    saveItem,
    getItem,
    removeItem,
  };
}
