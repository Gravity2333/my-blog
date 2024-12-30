const BASE_URL = "http://127.0.0.1:3000";
const API_URL = "/api";
export default function request(url: string) {
  return fetch(BASE_URL + API_URL + url)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // 获取 Content-Type
      const contentType = res.headers.get("Content-Type");

      let data;

      if (contentType?.includes("application/json")) {
        // JSON 数据
        data = await res.json();
      } else if (contentType?.includes("text/")) {
        // 文本数据
        data = await res.text();
      } else if (contentType?.includes("application/octet-stream")) {
        // 二进制数据
        data = await res.text();
      } else {
        // 其他类型的数据
        data = (await res.blob()).text();
      }

      return {
        success: true,
        data,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err.message,
      };
    });
}
