import {
  Space,
  Tag,
  Typography,
  type TablePaginationConfig,
  type TableProps,
} from "antd";
import { Button, Table } from "@components/ui";
import { useMemo } from "react";
import type { ProjectRecord } from "@/types";
import { useProjectsContext } from "../context/ProjectsContext";

type ProjectTableProps = {
  pagination?: TablePaginationConfig;
  className?: string;
};

export const ProjectTable = ({ pagination, className }: ProjectTableProps) => {
  const {
    filteredProjects,
    statusColors,
    onTableChange,
    openDetails,
    openEditForm,
    isLoading,
  } = useProjectsContext();

  const columns: TableProps<ProjectRecord>["columns"] = useMemo(
    () => [
      {
        title: "Project",
        dataIndex: "name",
        key: "name",
        width: 320,
        sorter: (a, b) => a.name.localeCompare(b.name),
        ellipsis: { showTitle: false },
        render: (_, record) => (
          <Space direction="vertical" size={0}>
            <Typography.Text
              strong
              className="block max-w-xs truncate text-slate-900"
              title={record.name}
            >
              {record.name}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              className="text-xs uppercase text-slate-500"
            >
              {record.projectCode}
            </Typography.Text>
          </Space>
        ),
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        width: 180,
        sorter: (a, b) => a.owner.localeCompare(b.owner),
        ellipsis: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 160,
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (status: ProjectRecord["status"]) => (
          <Tag color={statusColors[status] ?? "default"}>{status}</Tag>
        ),
      },
      {
        title: "Open tickets",
        dataIndex: "tickets",
        key: "tickets",
        width: 140,
        sorter: (a, b) => a.tickets - b.tickets,
        render: (value: number) => (
          <Typography.Text className="font-semibold text-slate-900">
            {value}
          </Typography.Text>
        ),
      },
      {
        title: "Next milestone",
        dataIndex: "dueDate",
        key: "dueDate",
        width: 180,
        sorter: (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      },
      {
        key: "actions",
        width: 160,
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              type="link"
              onClick={() => openDetails(record)}
            >
              View
            </Button>
            <Button
              size="small"
              type="text"
              onClick={() => openEditForm(record)}
            >
              Edit
            </Button>
          </Space>
        ),
      },
    ],
    [openEditForm, openDetails, statusColors]
  );

  return (
    <Table
      columns={columns}
      dataSource={filteredProjects}
      loading={isLoading}
      pagination={pagination}
      className={className}
      onChange={onTableChange}
    />
  );
};
