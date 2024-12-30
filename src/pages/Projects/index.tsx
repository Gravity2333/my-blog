import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { FaSort, FaSearch } from "react-icons/fa";
import LoadingPage from "@/components/LoadingPage";
import { getAllProjects } from "@/services/projects";

const ITEMS_PER_PAGE = 6;

const GitLabRepos: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortedBy, setSortedBy] = useState<"created_at" | "updated_at">(
    "updated_at"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true); // Start loading when component mounts or query changes
    (async () => {
      const { success, data } = await getAllProjects(sortedBy, sortDirection);
      if (success) {
        setRepos(data);
      }
      setLoading(false);
    })();
  }, [sortedBy, sortDirection, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setCurrentPage(1); // Reset to the first page when searching
    setLoading(true);
    const { success, data } = await getAllProjects(
      sortedBy,
      sortDirection,
      searchTerm
    );
    if (success) {
      setRepos(data);
    }
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredRepos = repos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 格式化日期
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.repoList}>
      <div className={styles.controls}>
        <div className={styles.sortSearchContainer}>
          <button
            onClick={() => {
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              setLoading(true);
            }}
            className={styles.sortButton}
          >
            <FaSort /> Sort (
            {sortDirection === "asc" ? "Ascending" : "Descending"})
          </button>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Show loading state */}
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <ul className={styles.repoItems}>
            {filteredRepos.map((repo) => (
              <li key={repo.id} className={styles.repoItem}>
                <div className={styles.repoHeader}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoName}
                  >
                    {repo.name}
                  </a>
                  <div className={styles.repoStats}>
                    <span className={styles.stars}>
                      🌟 {repo.stargazers_count}
                    </span>
                    <span className={styles.forks}>🍴 {repo.forks_count}</span>
                    <span className={styles.openIssues}>
                      🐛 {repo.open_issues_count} Open Issues
                    </span>
                  </div>
                </div>
                <p className={styles.repoDescription}>
                  {repo.description
                    ? repo.description
                    : "No description provided."}
                </p>
                <div className={styles.repoFooter}>
                  <p className={styles.createdAt}>
                    <strong>Created At:</strong> {formatDate(repo.created_at)}
                  </p>
                  <p className={styles.updatedAt}>
                    <strong>Updated At:</strong> {formatDate(repo.updated_at)}
                  </p>
                  <p className={styles.defaultBranch}>
                    <strong>Default Branch:</strong> {repo.default_branch}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.activePage : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GitLabRepos;
