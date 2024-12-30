import request from "./request";

export function getAllProjects(
  sortedBy: string,
  sortDirection: string,
  searchTerm?: string
) {
  return request(
    `/projects?sortedBy=${sortedBy}&sortDirection=${sortDirection}${
      searchTerm ? `&searchTerm=${searchTerm}` : ""
    }`
  );
}

export function getTopProjects() {
  return request(`/projects/top`);
}
