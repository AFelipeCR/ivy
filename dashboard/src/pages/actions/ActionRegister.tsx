import { useParams } from "react-router-dom";
import ActionForm from "./ActionForm";
import type { RouteModel } from "../../models/route.model";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ActionRegister () {
    const { routeId } = useParams();
    let [route, setRoute] = useState<RouteModel>(undefined);

    const requestData = async () => {
        const r: RouteModel = await api.routes.getById(routeId);
        setRoute(r);
    };
    
    useEffect(() => {
        requestData();
    }, []);
    
    return (<>
    {route && <ActionForm events={route.events} routeId={route.id}></ActionForm>}
    </>);
}