import request from "./request";

export function getAllBlogs() {
  return request("/blogs");
}

export function getBlogDetail(id: string) {
  return request(`/blogs/${id}/detail`);
}
