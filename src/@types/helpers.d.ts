declare namespace Shy {
  type StrictType = string | number
  
  export interface Pagination<T> {
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      first_page: number;
      first_page_url: string;
      last_page_url: string;
      next_page_url: string;
      previous_page_url: string;
    };
    data: T;
  }

  export interface QueryString<T> {
    fields: (keyof T | '*')[]
    between?: Partial<Record<keyof T, [StrictType, StrictType]>>
    limit?: number
    page?: number
    preload?: {
      [K in keyof T]?: T[K] extends Array<any>
        ? QueryString<T[K][0]>
        : QueryString<T[K]>
    }
    in?: Partial<Record<keyof T, StrictType[]>>
    notIn?: Partial<Record<keyof T, StrictType[]>>
    startsWith?: Partial<Record<keyof T, StrictType[]>>
    counters?: (keyof T)[]
    distincts?: (keyof T)[]
    null?: (keyof T)[]
    notNull?: (keyof T)[]
    endsWith?: Partial<Record<keyof T, StrictType[]>>
    order?: Partial<Record<keyof T, 'desc' | 'asc'>> &
      Partial<Record<string, 'desc' | 'asc'>>
    lt?: Partial<Record<keyof T, StrictType>>
    lte?: Partial<Record<keyof T, StrictType>>
    gt?: Partial<Record<keyof T, StrictType>>
    gte?: Partial<Record<keyof T, StrictType>>
  }
}
