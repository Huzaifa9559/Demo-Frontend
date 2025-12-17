import {
  Space,
  Tag,
  Typography,
  type TableProps,
} from "antd";
import { Button, Table } from "@components/ui";
import { useMemo } from "react";
import type { ProjectRecord } from "@/types";
import { useProjectsContext } from "../context/ProjectsContext";
import { useAppSelector } from "@/store";
import { PROJECT_STATUS_COLORS } from "@/types";

type ProjectTableProps = {
  className?: string;
};

export const ProjectTable = ({ className }: ProjectTableProps) => {
  const {
    projects,
    onTableChange,
    openDetails,
    openEditForm,
    isLoading,
    pagination,
  } = useProjectsContext();

  const tablePagination = {
    ...pagination,
  };

  const user=useAppSelector((state) => state.auth.user);


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
          <Tag color={PROJECT_STATUS_COLORS[status] ?? "default"}>{status}</Tag>
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
            {user?.role === 'admin' && <Button
              size="small"
              type="text"
              onClick={() => openEditForm(record)}
            >
              Edit
            </Button>}
          </Space>
        ),
      },
    ],
    [openEditForm, openDetails]
  );

  return (
    <Table
      columns={columns}
      dataSource={projects}
      loading={isLoading}
      pagination={tablePagination}
      className={className}
      onChange={onTableChange}
    />
  );
};
