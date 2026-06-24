import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (<>
    <main className="is-fullwidth">
        <div className="columns">
            <div className="column is-one-fifth">
                <div>
                    <h1 className="title pt-6 px-2">Menu</h1>
                </div>
                <div className="menu">
                    <ul className="menu-list">
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>

                        <li>
                            <Link to="/sessions">Sessions</Link>
                        </li>

                        <li>
                            <Link to="/extensions">Extensions</Link>
                        </li>

                        <li>
                            <Link to="/status">Status</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="column is-three-fifths">
                <div className="container">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    </main>
    <br />
    </>);
}