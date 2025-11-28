import dayjs from "dayjs";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { PROJECT_ROWS} from "@/mocks/data/projects";
import { RangeFilter, StatusFilter } from "@utils";
import type { ProjectRecord } from "@/types";

type ProjectListParams = {
  search?: string;
  status?: StatusFilter;
  range?: RangeFilter;
};
``;
type CreateProjectPayload = Omit<ProjectRecord, "key">;
type UpdateProjectPayload = Partial<CreateProjectPayload>;

const STORAGE_KEY = "MOCK_PROJECTS_DATA";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadProjects = (): ProjectRecord[] => {
  if (typeof window === "undefined") return [...PROJECT_ROWS];
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ProjectRecord[];
    }
  } catch (error) {
    console.warn("Failed to read projects from storage", error);
  }
  return [...PROJECT_ROWS];
};

const persistProjects = (projects: ProjectRecord[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.warn("Failed to persist projects to storage", error);
  }
};

let mockDatabase: ProjectRecord[] = loadProjects();

const filterProjects = (
  projects: ProjectRecord[],
  params: ProjectListParams
): ProjectRecord[] => {
  const normalizedSearch = params.search?.trim().toLowerCase();
  const statusFilter = params.status ?? "all";
  const rangeFilter: RangeFilter = params.range ?? "quarter";
  const now = dayjs();
  const rangeEndMap: Record<RangeFilter, dayjs.Dayjs> = {
    week: now.add(7, "day"),
    month: now.add(1, "month"),
    quarter: now.add(3, "month"),
  };
  const rangeEnd = rangeEndMap[rangeFilter];

  return projects.filter((project) => {
    const due = dayjs(project.dueDate, "MMM D, YYYY");

    const matchesSearch =
      !normalizedSearch ||
      project.name.toLowerCase().includes(normalizedSearch) ||
      project.projectCode.toLowerCase().includes(normalizedSearch) ||
      project.owner.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && project.status === "In Progress") ||
      (statusFilter === "hold" && project.status === "On Hold") ||
      (statusFilter === "completed" && project.status === "Completed") ||
      (statusFilter === "blocked" && project.status === "Blocked");

    const matchesRange =
      due.isBefore(rangeEnd) && due.isAfter(now.subtract(1, "day"));

    return matchesSearch && matchesStatus && matchesRange;
  });
};

const parseJson = async <T>(request: Request): Promise<T> => {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Invalid JSON payload");
  }
};

export const projectsHandlers = [
  http.get("/api/projects", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const params: ProjectListParams = {
      search: url.searchParams.get("search") ?? undefined,
      status:
        (url.searchParams.get("status") as StatusFilter | null) ?? undefined,
      range: (url.searchParams.get("range") as RangeFilter | null) ?? undefined,
    };

    const data = filterProjects(mockDatabase, params);
    return HttpResponse.json(data);
  }),

  http.get("/api/projects/:id", async ({ params }) => {
    await delay(250);
    const project = mockDatabase.find((item) => item.key === params.id);
    if (!project) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json(project);
  }),

  http.post("/api/projects", async ({ request }) => {
    await delay(400);
    const payload = await parseJson<CreateProjectPayload>(request);
    const key =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`;
    const record: ProjectRecord = { key, ...payload };
    mockDatabase = [record, ...mockDatabase];
    persistProjects(mockDatabase);
    return HttpResponse.json(record, { status: 201 });
  }),

  http.put("/api/projects/:id", async ({ request, params }) => {
    await delay(400);
    const existingIndex = mockDatabase.findIndex(
      (project) => project.key === params.id
    );
    if (existingIndex === -1) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    const updates = await parseJson<UpdateProjectPayload>(request);
    mockDatabase[existingIndex] = {
      ...mockDatabase[existingIndex],
      ...updates,
    };
    persistProjects(mockDatabase);
    return HttpResponse.json(mockDatabase[existingIndex]);
  }),

  http.delete("/api/projects/:id", async ({ params }) => {
    await delay(300);
    const exists = mockDatabase.some((project) => project.key === params.id);
    if (!exists) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    mockDatabase = mockDatabase.filter((project) => project.key !== params.id);
    persistProjects(mockDatabase);
    return HttpResponse.json(null, { status: 204 });
  }),
];

export const worker = setupWorker(...projectsHandlers);