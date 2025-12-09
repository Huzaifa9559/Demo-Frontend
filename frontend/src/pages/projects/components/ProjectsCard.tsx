import { type ReactNode } from "react";
import { Card } from "@components/ui";

type ProjectsCardProps = {
  children: ReactNode;
  className?: string;
};

export const ProjectsCard = ({ children, className }: ProjectsCardProps) => {
  return <Card className={className}>{children}</Card>;
};
