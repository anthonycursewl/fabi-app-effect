// store/citasStore.ts
import { create } from 'zustand';
import { secureFetch } from '@/app/shared/services/secureFetch';
import { API_URl } from '@/app/config/api.breadriuss.config';
import { Cita } from '@/app/shared/interfaces/CitaType';
import { TypeFilter } from '@/app/ui/Citas/interfaces/TypeFilter';


interface CitasState {
    citasByFilter: { [key in TypeFilter]?: Cita[] };
    paginationByFilter: { [key in TypeFilter]?: { skip: number; take: number; isEnd: boolean } };
    loading: boolean;
    error: string | null;
    currentFilter: TypeFilter;

    setFilter: (filter: TypeFilter) => void;
    fetchCitas: (filter: TypeFilter, userId: string, isRefresh?: boolean) => Promise<void>;
    clearError: () => void;
}

const initialPagination = { skip: 1, take: 10, isEnd: false };

export const useCitasStore = create<CitasState>((set, get) => ({
    citasByFilter: {},
    paginationByFilter: {},
    loading: false,
    error: null,
    currentFilter: 'all',

    setFilter: (filter) => {
        console.log('[STORE] setFilter called with:', filter);
        set({ currentFilter: filter, error: null });
    },

    clearError: () => {
        set({ error: null });
    },

    fetchCitas: async (filter, userId, isRefresh = false) => {
        console.log(`[STORE] fetchCitas BEGIN: filter=${filter}, userId=${userId}, isRefresh=${isRefresh}`);

        // --- Bloque de Refresh ---
        if (isRefresh) {
            console.log('[STORE] Refreshing. Resetting pagination and citas for filter:', filter);
            set(state => ({
                paginationByFilter: {
                    ...state.paginationByFilter,
                    [filter]: { ...initialPagination }
                },
                citasByFilter: {
                    ...state.citasByFilter,
                    [filter]: []
                },
                error: null,
            }));
        }
        // --- Fin Bloque de Refresh ---

        // Obtener el estado de paginación DESPUÉS de un posible reset por refresh
        const currentPaginationState = get().paginationByFilter[filter] || initialPagination;
        console.log('[STORE] Current pagination for fetch:', filter, currentPaginationState);

        // --- Condiciones de Salida Temprana ---
        if (get().loading && !isRefresh) { // Si ya está cargando Y NO es un refresh, salir.
            console.log('[STORE] Aborting fetch: already loading and not a refresh.');
            return;
        }
        if (currentPaginationState.isEnd && !isRefresh) { // Si ya llegó al final Y NO es un refresh, salir.
            console.log('[STORE] Aborting fetch: already at end and not a refresh.');
            return;
        }
        // --- Fin Condiciones de Salida Temprana ---

        set({ loading: true, error: null });
        console.log('[STORE] Set loading to true');

        const pageToFetch = currentPaginationState.skip;
        const takeAmount = currentPaginationState.take;
        const URL = `${API_URl}/cita/get/all/byuserid/${userId}?take=${takeAmount}&skip=${pageToFetch}&filter=${filter}`;
        console.log('[STORE] Fetching URL:', URL);

        const { response, error: fetchErrorObject } = await secureFetch({
            options: { url: URL, method: 'GET' },
            setLoading: () => {}
        });

        // --- Manejo de Error ---
        if (fetchErrorObject) {
            let errorMessage = "BRD | Ha ocurrido un error al obtener las citas.";
            console.log(JSON.stringify(fetchErrorObject, null, 2));

            set(state => ({
                loading: false,
                error: errorMessage,
                paginationByFilter: {
                    ...state.paginationByFilter,
                    [filter]: {
                        ...(state.paginationByFilter[filter] || initialPagination),
                        isEnd: true
                    }
                }
            }));
            console.log(`[STORE] fetchCitas ERROR END: filter=${filter}`);
            return;
        }
        // --- Fin Manejo de Error ---

        console.log('[STORE] Response from API:', response);

        // --- Manejo de Respuesta Exitosa ---
        if (response && Array.isArray(response)) {
            const newCitas = response as Cita[];
            const reachedEnd = newCitas.length < takeAmount;
            console.log(`[STORE] newCitas.length=${newCitas.length}, takeAmount=${takeAmount}, reachedEnd=${reachedEnd}`);

            set(state => {
                const existingCitasForFilter = state.citasByFilter[filter] || [];
                const updatedPagination = {
                    skip: pageToFetch + 1, // Próxima página a pedir
                    take: takeAmount,
                    isEnd: reachedEnd,
                };
                console.log('[STORE] New pagination to set:', filter, updatedPagination);

                return {
                    citasByFilter: {
                        ...state.citasByFilter,
                        [filter]: isRefresh ? newCitas : [...existingCitasForFilter, ...newCitas]
                    },
                    paginationByFilter: {
                        ...state.paginationByFilter,
                        [filter]: updatedPagination
                    },
                    loading: false,
                };
            });
        } else {
            console.warn('[STORE] Response was not an array or was null/undefined. Assuming end of data for this request.');
            set(state => ({
                loading: false,
                // No necesariamente un error para mostrar al usuario, pero sí el final de los datos.
                paginationByFilter: {
                    ...state.paginationByFilter,
                    [filter]: {
                        ...(state.paginationByFilter[filter] || initialPagination),
                        isEnd: true // Marcar como final
                    }
                }
            }));
        }
        // --- Fin Manejo de Respuesta Exitosa ---
        console.log(`[STORE] fetchCitas SUCCESS/NO-DATA END: filter=${filter}`);
    },
}));