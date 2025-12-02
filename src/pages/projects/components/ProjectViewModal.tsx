import { Descriptions, Tag } from "antd";
import { Modal } from "@components/ui";
import { useProjectsContext } from "../context";

type ProjectViewModalProps = {
  className?: string;
};

export const ProjectViewModal = ({
  className,
}: ProjectViewModalProps = {}) => {
  const { selectedProject, detailsModalProps } = useProjectsContext();

  return (
    <Modal {...detailsModalProps} className={className}>
      {selectedProject ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Project">
            {selectedProject.name}
          </Descriptions.Item>
          <Descriptions.Item label="Code">
            {selectedProject.projectCode}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {selectedProject.owner}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag>{selectedProject.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Next milestone">
            {selectedProject.dueDate}
          </Descriptions.Item>
          <Descriptions.Item label="Open tickets">
            {selectedProject.tickets}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p className="text-sm text-slate-500">
          Select a project to view details.
        </p>
      )}
    </Modal>
  );
};

