/*
 * @Descripttion:
 * @version:
 * @Author: 程垒 💻
 * @Date: 2024-08-21 08:58:34
 * @LastEditors: 程垒 💻
 * @LastEditTime: 2024-08-21 09:20:32
 */
import { ElLoading } from 'element-plus';
let loadingInstance = null;

//显示加载
export function showLoading(text = '努力加载中...') {
  loadingInstance = ElLoading.service({
    lock: true,
    text,
    background: 'rgba(0, 0, 0, 0.2)',
  });
}

//隐藏加载
export function hideLoading() {
  loadingInstance.close();
}
