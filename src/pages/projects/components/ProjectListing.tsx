import { Projects } from "../provider";
import { useProjectsContext } from "../context/ProjectsContext";

export const ProjectListing = () => {
  const { filteredProjects, pagination } = useProjectsContext();

  const tablePagination = {
    ...pagination,
    total: pagination.total ?? filteredProjects.length,
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Projects.Header />
      <Projects.Card>
        <Projects.Filters>
          <Projects.Filters.Search />
          <Projects.Filters.Group>
            <Projects.Filters.Status />
            <Projects.Filters.Range />
          </Projects.Filters.Group>
        </Projects.Filters>
        <Projects.Table pagination={tablePagination} />
      </Projects.Card>
    </div>
  );
};
