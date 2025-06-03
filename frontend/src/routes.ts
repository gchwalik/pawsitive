const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

if (!API_BASE_URL) {
  throw new Error('VITE_BACKEND_API environment variable is required');
}   

const createApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const ROUTES = {
  API_BASE_URL,

  FRONTEND: {
    ROOT: "/",
    PLACES_LIST: '/places',
    PLACES_CREATE: '/places/create',
    PLACES_VIEW: (id: number) => `/places/${id}`,
    PLACES_EDIT: (id: number) => `/places/${id}/edit`,
    PLACES_DELETE: (id: number) => `/places/${id}/delete`,
  },

  API: {
    PLACES_LIST: createApiUrl("/places"),
    PLACES_CREATE: createApiUrl("/places/create"),
    PLACES_DETAIL: (id: number) => createApiUrl(`/places/${id}`),
  },

  // Routes for React Router
  PATTERNS: {
    PLACES_VIEW_PATTERN: "/places/:id",
    PLACES_EDIT_PATTERN: "/places/:id/edit",
    PLACES_DELETE_PATTERN: "/places/:id/delete",
  }
}
