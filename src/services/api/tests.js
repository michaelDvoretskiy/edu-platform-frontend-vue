import {ref} from 'vue'
import {set} from "./IdbHelper";
import {BaseMethods} from "/src/services/api/BaseMethods.js";

export function useTests() {
  function getTest(id) {
    const url = BaseMethods.getUrl('/tests/get-test/' + id);

    const headers = { "Accept": "application/json" };
    let token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {headers})
      .then(response => response.json())
      .then(data => {
        return data
      });
  }

  return {getTest}
}