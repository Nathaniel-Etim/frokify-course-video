import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
import recipeViews from './views/recipeViews';

// this is for functions that we will use over and over again in the project
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) return;

    return data;
  } catch (err) {
    throw err;
  }
};

// export const get_json = async function (url) {
//   try {
//     const fetchPro = fetch(url);

//   } catch (err) {}
// };

// export const sendjson = async function (url, uploadData) {
//   try {
//     const fetchPro = await fetch(url, {
//       method: `POST`,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     if (!fetchPro.ok) throw new Error(`bad request`);

//     const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await response.json();

//     if (!response.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
