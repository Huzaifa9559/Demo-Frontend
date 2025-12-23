import { Header, Button } from "@components/ui";
import { PlusOutlined } from "@ant-design/icons";
import { useProjectsContext } from "../context/ProjectsContext";
import { RANGE_OPTIONS } from "@/types";
import { useAppSelector } from "@/store";

type ProjectsHeaderProps = {
  className?: string;
};

export const ProjectsHeader = ({ className }: ProjectsHeaderProps) => {
  const { projectsCount, rangeFilter, openCreateForm } = useProjectsContext();
  const user = useAppSelector((state) => state.auth.user);
  const focusWindow = RANGE_OPTIONS.find((option) => option.value === rangeFilter)?.label;

  return (
    <Header className={className}>
      <Header.Content>
        <Header.Label>Overview</Header.Label>
        <Header.Title>
          {`Projects overview (${projectsCount})`}
        </Header.Title>
        {((`Tracking ${projectsCount} initiatives`) || focusWindow) && (
          <Header.Subtitle suffix={focusWindow ? `Focus on ${focusWindow}` : undefined}>
            {`Tracking ${projectsCount} initiatives`}
          </Header.Subtitle>
        )}
      </Header.Content>
      {user?.role === 'admin' && (
        <Header.Actions>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>
            New Project
          </Button>
        </Header.Actions>
      )}
    </Header>
  );
};
