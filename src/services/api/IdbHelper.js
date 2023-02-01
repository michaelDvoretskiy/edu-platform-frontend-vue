import {openDB} from "idb";
import {getLocale} from "/src/locales/index.js";

const cacheNames = ['info', 'courses', 'frames']

const dbPromise = openDB('eduportal-data', 1, {
  upgrade(db) {
    for(let oneCache of cacheNames) {
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
  return (await dbPromise).get(objStoreName, getKey(objStoreName, key));
}

export async function set(objStoreName, key, val) {
  return (await dbPromise).put(objStoreName, val, getKey(objStoreName, key));
}

function getKey(objStoreName, key) {
  return getLocale() + '-' + key
  // if (objStoreName != 'frames') {
  //   return getLocale() + '-' + key
  // }
  // return key
}

async function keys(objStoreName) {
  return (await dbPromise).getAllKeys(objStoreName);
}
async function getAll(objStoreName) {
  return (await dbPromise).getAll(objStoreName);

}

// module.exports = { get, set, keys, getAll }