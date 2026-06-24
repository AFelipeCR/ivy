import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import RoutesListPanel from "../routes/RoutesListPanel";

export default function SessionManage(){
    const { sessionId } = useParams();
    let [session, setSession] = useState(undefined);

    const requestData = async () => {
        const s = await api.sessions.getById(sessionId);
        setSession(s);
    }

    useEffect(() => {
        requestData();
    }, []);

    return (<>
    <section className="section">
        <h1 className="title">Manage session</h1>
        {session && <div>
            <div>
                {session.name}
            </div>

            <div className="tabs is-centered">
                <ul>
                    <li className="is-active"><a>Routes</a></li>
                </ul>
            </div>

            <div>
                <RoutesListPanel sessionId={sessionId} sessionName={session.name}></RoutesListPanel>
            </div>
        </div>}
    </section>
    </>);
}