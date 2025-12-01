import { Header } from "@components/ui";
import { useProjectsContext } from "../context/ProjectsContext";
type ProjectsHeaderProps = {
  className?: string;
};

export const ProjectsHeader = ({ className }: ProjectsHeaderProps) => {
  const { headerProps } = useProjectsContext();

  return <Header {...headerProps} className={className} />;
};
