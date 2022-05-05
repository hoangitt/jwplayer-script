const App = {
    setLocalStoreWithExpiry: (key, value, days) => {
        const now = new Date();
        now.setDate(now.getDate() + days);

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiry: now.getTime()
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getLocalStoreWithExpiry: (key) => {
        const itemStr = localStorage.getItem(key);
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    },
};