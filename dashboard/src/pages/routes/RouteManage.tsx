import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import type { RouteModel } from "../../models/route.model";

export default function RouteManage () {
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
    <section className="section">
        {route && <>
        <div className="columns">
            <div className="column">
                <h1 className="title">Manage route {route.name}</h1>
                <h2 className="subtitle">{route.endpoint}</h2>
            </div>

            <div className="column is-one-quarter">
                <Link className="button is-success" to="action/register">Add actions</Link>
            </div>
        </div>

        <div>{route.events.map((e, index) => <span key={index} className="tag is-dark">{e}</span>)}</div>

        <nav className="panel is-primary my-2">
            <p className="panel-heading">Actions</p>
            {route.actions.map(a => (
                <div className="panel-block">
                    <div className="is-flex is-align-items-center is-justify-content-space-between w-100">
                        {<div>{a.command}</div> }
                        <div className="is-flex is-right">
                            <Link className="button is-info" relative="path" to={`action/${a.id}`}>Manage</Link>
                        </div>
                    </div>
                </div>)
            )}
        </nav>
        </>}
    </section>
    </>);
}

