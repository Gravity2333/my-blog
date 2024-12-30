import request from "./request";

export function getAllBlogs() {
  return request("http://127.0.0.1:3000/api/blogs")
}


export function getBlogDetail(id: string) {
    return request(`http://127.0.0.1:3000/api/blogs/${id}/detail`)
  }
  
