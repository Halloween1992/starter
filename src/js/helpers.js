import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
///////////////////////////////////////
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJson = async function (url) {
  try {
    const jsonPro = fetch(url);
    const res = await Promise.race([jsonPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error(`${data.message} ${res.status} ${res.statusText}`);
    return data;
  } catch (err) {
    throw err;
  }
};
