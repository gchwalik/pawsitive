export const ROUTES = {
  // Routes
  PLACES_LIST: '/places',
  PLACES_CREATE: '/places/create',
  PLACES_VIEW: (id: number) => `/places/${id}`,
  PLACES_EDIT: (id: number) => `/places/${id}/edit`,
  PLACES_DELETE: (id: number) => `/places/${id}/delete`,

  // Route patterns for React Router
  PLACES_VIEW_PATTERN: '/places/:id',
  PLACES_EDIT_PATTERN: '/places/:id/edit',
  PLACES_DELETE_PATTERN: '/places/:id/delete',
}

