import { http, HttpResponse, type HttpHandler } from "msw";

/**
 * Base type for entities that have a unique key identifier
 */
export type EntityWithKey = {
  key: string;
  [key: string]: unknown;
};

/**
 * Configuration for creating CRUD handlers
 */
export interface CrudHandlersConfig<
  T extends EntityWithKey,
  TFilterParams = Record<string, unknown>
> {
  /** API endpoint prefix (e.g., "/api/projects") */
  endpoint: string;
  /** LocalStorage key for persistence */
  storageKey: string;
  /** Initial data to use if storage is empty */
  initialData: T[];
  /** Optional custom filter function */
  filterFn?: (items: T[], params: TFilterParams) => T[];
  /** Optional function to parse query parameters */
  parseQueryParams?: (url: URL) => TFilterParams;
  /** Optional delays for each operation (in milliseconds) */
  delays?: {
    list?: number;
    get?: number;
    create?: number;
    update?: number;
    delete?: number;
  };
  /** Optional custom error message for not found */
  notFoundMessage?: string;
}

/**
 * Utility function to delay execution (for simulating network latency)
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Load entities from localStorage or return initial data
 */
const loadEntities = <T extends EntityWithKey>(
  storageKey: string,
  initialData: T[]
): T[] => {
  if (typeof window === "undefined") return [...initialData];
  try {
    const stored = window.localStorage?.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored) as T[];
    }
  } catch (error) {
    console.warn(`Failed to read ${storageKey} from storage`, error);
  }
  return [...initialData];
};

/**
 * Persist entities to localStorage
 */
const persistEntities = <T extends EntityWithKey>(
  storageKey: string,
  entities: T[]
): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem(storageKey, JSON.stringify(entities));
  } catch (error) {
    console.warn(`Failed to persist ${storageKey} to storage`, error);
  }
};

/**
 * Parse JSON from request body
 */
const parseJson = async <T>(request: Request): Promise<T> => {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Invalid JSON payload");
  }
};

/**
 * Generate a unique key for new entities
 */
const generateKey = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Create generic CRUD handlers for any entity type
 */
export function createCrudHandlers<
  T extends EntityWithKey,
  TCreatePayload = Omit<T, "key">,
  TUpdatePayload = Partial<TCreatePayload>,
  TFilterParams = Record<string, unknown>
>(config: CrudHandlersConfig<T, TFilterParams>): HttpHandler[] {
  const {
    endpoint,
    storageKey,
    initialData,
    filterFn,
    parseQueryParams,
    delays = {},
    notFoundMessage = "Resource not found",
  } = config;

  const {
    list: listDelay = 300,
    get: getDelay = 250,
    create: createDelay = 400,
    update: updateDelay = 400,
    delete: deleteDelay = 300,
  } = delays;

  // Initialize database from storage or initial data
  let mockDatabase: T[] = loadEntities(storageKey, initialData);

  return [
    // GET /api/{endpoint} - List all entities (with optional filtering)
    http.get(endpoint, async ({ request }) => {
      await delay(listDelay);
      const url = new URL(request.url);

      let filteredData = mockDatabase;

      // Apply custom filtering if provided
      if (filterFn && parseQueryParams) {
        const params = parseQueryParams(url);
        filteredData = filterFn(mockDatabase, params);
      } else if (filterFn) {
        // Fallback: pass empty params if no parser provided
        filteredData = filterFn(mockDatabase, {} as TFilterParams);
      }

      return HttpResponse.json(filteredData);
    }),

    // GET /api/{endpoint}/:id - Get single entity
    http.get(`${endpoint}/:id`, async ({ params }) => {
      await delay(getDelay);
      const entity = mockDatabase.find((item) => item.key === params.id);
      if (!entity) {
        return HttpResponse.json({ message: notFoundMessage }, { status: 404 });
      }
      return HttpResponse.json(entity);
    }),

    // POST /api/{endpoint} - Create new entity
    http.post(endpoint, async ({ request }) => {
      await delay(createDelay);
      const payload = await parseJson<TCreatePayload>(request);
      const key = generateKey();
      const record: T = { key, ...payload } as unknown as T;
      mockDatabase = [record, ...mockDatabase];
      persistEntities(storageKey, mockDatabase);
      return HttpResponse.json(record, { status: 201 });
    }),

    // PUT /api/{endpoint}/:id - Update entity
    http.put(`${endpoint}/:id`, async ({ request, params }) => {
      await delay(updateDelay);
      const existingIndex = mockDatabase.findIndex(
        (entity) => entity.key === params.id
      );
      if (existingIndex === -1) {
        return HttpResponse.json({ message: notFoundMessage }, { status: 404 });
      }
      const updates = await parseJson<TUpdatePayload>(request);
      mockDatabase[existingIndex] = {
        ...mockDatabase[existingIndex],
        ...updates,
      } as unknown as T;
      persistEntities(storageKey, mockDatabase);
      return HttpResponse.json(mockDatabase[existingIndex]);
    }),

    // DELETE /api/{endpoint}/:id - Delete entity
    http.delete(`${endpoint}/:id`, async ({ params }) => {
      await delay(deleteDelay);
      const exists = mockDatabase.some((entity) => entity.key === params.id);
      if (!exists) {
        return HttpResponse.json({ message: notFoundMessage }, { status: 404 });
      }
      mockDatabase = mockDatabase.filter((entity) => entity.key !== params.id);
      persistEntities(storageKey, mockDatabase);
      return HttpResponse.json(null, { status: 204 });
    }),
  ];
}
