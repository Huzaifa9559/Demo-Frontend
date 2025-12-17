import { useAppSelector } from "@/store";
import { Projects } from "./provider";

export const ProjectsScreen = () => {
  const user=useAppSelector((state) => state.auth.user);
  return (
    <div className="flex w-full flex-col gap-6">
      <Projects>
        <Projects.Header />
        <Projects.Filters />
        <Projects.Table />
        <Projects.ViewModal />
        {user?.role === 'admin' && <Projects.FormModal />}
      </Projects>
    </div>
  );
};
