import { useMemo, type ReactNode } from "react";
import { RANGE_OPTIONS } from "@utils";
import type { RangeFilter } from "@utils";
import type { ProjectsLayoutConfig } from "@/pages/projects/context/ProjectsContext";
import type { HeaderProps } from "@components/ui";

type UseProjectHeaderOptions = {
  projectsCount: number;
  rangeFilter: RangeFilter;
  layout?: ProjectsLayoutConfig;
  defaultActions: ReactNode;
};

export const useProjectHeader = ({
  projectsCount,
  rangeFilter,
  layout,
  defaultActions,
}: UseProjectHeaderOptions) => {
  const headerProps = useMemo<
    Pick<
      HeaderProps,
      "label" | "title" | "subtitle" | "subtitleSuffix" | "actions"
    >
  >(() => {
    const focusWindow = RANGE_OPTIONS.find(
      (option) => option.value === rangeFilter
    )?.label;
    const resolvedTitle =
      layout?.headerTitle ?? `Projects overview (${projectsCount})`;
    const resolvedSubtitle =
      layout?.headerSubtitle ?? `Tracking ${projectsCount} initiatives`;
    const resolvedActions = layout?.headerActions ?? defaultActions;

    return {
      label: "Overview",
      title: resolvedTitle,
      subtitle: resolvedSubtitle,
      subtitleSuffix: focusWindow ? `Focus on ${focusWindow}` : undefined,
      actions: resolvedActions,
    };
  }, [projectsCount, rangeFilter, layout, defaultActions]);

  return { headerProps };
};
