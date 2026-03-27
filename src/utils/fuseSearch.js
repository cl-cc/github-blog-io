/*
 * @Descripttion:
 * @version:
 * @Author: 程垒 💻
 * @Date: 2024-09-13 10:25:17
 * @LastEditors: 程垒 💻
 * @LastEditTime: 2024-09-13 15:20:11
 */
import Fuse from 'fuse.js';
const init_search = list => {
  return new Fuse(list, {
    keys: ['text', 'introduction'],
    includeScore: true,
    threshold: 0.2,
  });
};

export default init_search;
