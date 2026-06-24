import { useEffect, useState, type SubmitEvent } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput";
import { formToObject } from "../sessions/SessionRegister";
import type { RouteModel } from "../../models/route.model";
import TextSpan from "../../components/TextSpan";

const RegisterRouteSchema = {
    name: "",
    endpoint: "",
    sessionId: "",
    events: "",
};

type RegisterRouteBody = typeof RegisterRouteSchema; 

export default function RoutesListPanel ({sessionId, sessionName}) {
    let [routes, setRoutes] = useState<RouteModel[]>(undefined);
    let [currentRoute, setCurrentRoute] = useState<RouteModel>(undefined);
    let [isShowingModal, setModalState] = useState<boolean>(false);

    const requestData = async () => {
        const rs:RouteModel[] = await api.sessions.getRoutes(sessionId);
        setRoutes(rs);
    }

    const openModal = (id:number) => {
        setCurrentRoute(routes.find(r => r.id == id));
        setModalState(true)
    }

    const closeModal = () => {
        setCurrentRoute(undefined);
        setModalState(false)
    }

    const tryToRegister = async (event:SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const b = formToObject<RegisterRouteBody>(event, RegisterRouteSchema);
        const r = await api.routes.register(b);

        if(b.endpoint == r.endpoint){
            const index = routes.findIndex(rr => rr.endpoint == r.endpoint);
            routes[index].registered = true;
            routes[index].name = b.name;
            closeModal();
        }
    }

    useEffect(() => {
        requestData();
    }, []);

    return (routes && 
    <>
        <nav className="panel is-primary">
            <p className="panel-heading">Routes</p>
            {routes.map(r => (
            <div className="panel-block">
                <div className="is-flex is-align-items-center is-justify-content-space-between w-100">
                    {r.name && <div>{r.name}</div> }
                    <div>{r.endpoint}</div>
                    <div className="is-flex is-right">
                        {r.registered 
                        ? <Link className="button is-info" relative="path" to={`../route/${r.id}`}>Manage</Link> 
                        :<button className="button is-success" onClick={() => openModal(r.id)}>Register</button>}
                    </div>
                </div>
            </div>
            ))}
        </nav>
    
        {currentRoute &&
        <div className={`modal ${isShowingModal ? "is-active": ""}`}>
            <div className="modal-background"></div>
            <form onSubmit={tryToRegister}>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Register route</p>
                        <button className="delete" aria-label="close" onClick={()=>closeModal()}></button>
                    </header>

                    <section className="modal-card-body">
                        <TextInput name="name" label="Name" value={currentRoute.name} required></TextInput>
                        <input type="text" name="sessionId" defaultValue={sessionId} hidden/>
                        <TextSpan name="endpoint" label="Endpoint" value={currentRoute.endpoint}></TextSpan>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Events</label>
                            </div>
                            <div className="field-body">
                                <div className="py-2">
                                    {currentRoute.events.map(e => <span className="tag is-dark">{e}</span>)}
                                    <input type="text" name="events" defaultValue={JSON.stringify(currentRoute.events)} hidden/>
                                </div>
                            </div>
                        </div>
                        <TextSpan name="sessionName" label="Session" value={sessionName}></TextSpan>
                    </section>

                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className="button is-success">Save changes</button>
                            <button type="button" className="button" onClick={()=>closeModal()}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </form>
        </div>}
    </>);
}