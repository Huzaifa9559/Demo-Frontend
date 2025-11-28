import { type ReactNode } from "react";
import { Header } from "@components/ui";
import { useProjectsContext } from "../context/ProjectsContext";

type ProjectsHeaderProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export const ProjectsHeader = ({
  title,
  subtitle,
  actions,
  className,
}: ProjectsHeaderProps) => {
  const { headerProps } = useProjectsContext();

  return (
    <Header
      {...headerProps}
      {...(title !== undefined && { title })}
      {...(subtitle !== undefined && { subtitle })}
      {...(actions !== undefined && { actions })}
      className={className}
    />
  );
};
