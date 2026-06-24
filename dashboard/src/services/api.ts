import type { ExtensionModel } from "../models/extension.model";

const request = async <T>(endpoint:string, method: "GET" | "POST", body?:any) =>{
    const res = await fetch(endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    });

    const data = await res.json()

    return data as T;
}

const http = {
    get: <T>(endpoint:string) => request<T>(endpoint, "GET"),
    post: <T>(endpoint:string, data) => request<T>(endpoint, "POST", data),
};

const sessionsWAApi = {
    getById: (id:string) => {
        return request<any>(`/api/sessions/WA/${id}`, "GET");
    }
};

const sessionsApi = {
    WA: sessionsWAApi,
    getRegistered: async () => {
        const res = await fetch("/api/sessions/registered", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await res.json();

        return body as any;
    },
    register: (session) => {
        return request<any>(`/api/sessions`, "POST", session);
    },
    getById: (id:string) => {
        return request<any>(`/api/sessions/${id}`, "GET");
    },
    getRoutes: (id: string) => {
        return request<any>(`/api/sessions/${id}/routes`, "GET");
    }
};

const routesApi = {
    register: (route) => {
        return request<any>(`/api/routes`, "POST", route);
    },
    getById: async (id:string) => {
        const r = await request<any>(`/api/routes/${id}`, "GET");
        r.events = JSON.parse(r.events)
        return r;
    },
};

const extensionsApi = {
    getList: () => http.get<ExtensionModel[]>(`/api/extensions`)
};

const actionsApi = {
    register: (action) => http.post<any>(`/api/actions`, action)
};

export const api = {
    sessions: sessionsApi,
    routes: routesApi,
    extensions: extensionsApi,
    actions: actionsApi,
} as const;