import { Header } from "@components/ui";
import { useProjectsContext } from "../context/ProjectsContext";
type ProjectsHeaderProps = {
  className?: string;
};

export const ProjectsHeader = ({ className }: ProjectsHeaderProps) => {
  const { headerProps } = useProjectsContext();
  return (
    <Header className={className}>
      <Header.Content>
        {headerProps.label && (
          <Header.Label>{headerProps.label}</Header.Label>
        )}
        <Header.Title>{headerProps.title}</Header.Title>
        {(headerProps.subtitle || headerProps.subtitleSuffix) && (
          <Header.Subtitle suffix={headerProps.subtitleSuffix}>
            {headerProps.subtitle}
          </Header.Subtitle>
        )}
      </Header.Content>
      {headerProps.actions && headerProps.actionsAllowed && (
        <Header.Actions>{headerProps.actions}</Header.Actions>
      )}
    </Header>
  );
};
