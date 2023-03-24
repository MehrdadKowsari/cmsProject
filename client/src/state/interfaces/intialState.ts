export interface IntialState {
    isLoading: boolean,
    hasError: boolean,
    totalCount?: number,
    currentPage?: number,
    numberOfPages?: number | null,
    error?: string | null | undefined
}