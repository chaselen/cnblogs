/**
 * 简单休眠函数
 * @param {number} timeMill 毫秒数
 */
export async function sleep(timeMill) {
  return new Promise(resolve => setTimeout(resolve, timeMill))
}

export default {
  sleep
}
