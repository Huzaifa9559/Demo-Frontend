import { Table as AntTable, type TableProps as AntTableProps } from "antd";
import { type ReactNode } from "react";

export type TableProps<T = any> = AntTableProps<T> & {
  children?: ReactNode;
  className?: string;
};

export const Table = <T extends Record<string, any> = any>({
  children,
  className,
  pagination,
  rowKey,
  scroll,
  tableLayout,
  ...props
}: TableProps<T>) => {
  const defaultPagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 5,
    pageSizeOptions: ["5", "10", "15", "20"],
  };

  // Default className with pt-4 padding
  const defaultClassName = "pt-4";
  const mergedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <AntTable<T>
      className={mergedClassName}
      pagination={
        pagination === false
          ? false
          : {
              ...defaultPagination,
              ...pagination,
            }
      }
      rowKey={rowKey ?? "key"}
      scroll={scroll ?? { x: 900 }}
      tableLayout={tableLayout ?? "fixed"}
      {...props}
    >
      {children}
    </AntTable>
  );
};
