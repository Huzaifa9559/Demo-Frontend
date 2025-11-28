import { ProjectListing } from "./components";
import { Projects } from "./provider";

export const ProjectsScreen = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Projects
        layout={{
          headerTitle: "Active projects",
        }}
      >
        <ProjectListing />
        <Projects.DetailsModal />
        <Projects.FormModal />
      </Projects>
    </div>
  );
};
