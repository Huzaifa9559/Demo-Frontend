import { Projects } from "./provider";

export const ProjectsScreen = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Projects
        layout={{
          headerTitle: "Active projects",
        }}
      >
        <Projects.Header />
        <Projects.Filters />
        <Projects.Table />
        <Projects.ViewModal />
        <Projects.CreateModal />
        <Projects.EditModal />
      </Projects>
    </div>
  );
};
