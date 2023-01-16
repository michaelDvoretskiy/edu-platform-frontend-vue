import {openDB} from "idb";
import {getLocale} from "/src/locales/index.js";

const cacheNames = ['info', 'courses']

const dbPromise = openDB('eduportal-data', 1, {
  upgrade(db) {
    for(let oneCache in cacheNames) {
      db.createObjectStore(oneCache);
    }
  },
});

export async function clearCache(caches = null) {
  if (caches == null) {
    caches = cacheNames
  }
  if (caches.length > 0) {
    const db = await dbPromise;
    for(let oneCache of caches) {
      db.clear(oneCache)
    }
  }
}

export async function get(objStoreName, key) {
  return (await dbPromise).get(objStoreName, getLocale() + '-' + key);
}

export async function set(objStoreName, key, val) {
  return (await dbPromise).put(objStoreName, val, getLocale() + '-' + key);
}

async function keys(objStoreName) {
  return (await dbPromise).getAllKeys(objStoreName);
}
async function getAll(objStoreName) {
  return (await dbPromise).getAll(objStoreName);

}

// module.exports = { get, set, keys, getAll }