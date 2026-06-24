import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import TextInput from "../../components/TextInput";
import TextSpan from "../../components/TextSpan";

const RegisterSessionSchema = {
    id: "",
    name: "",
    phone: "",
    description: ""
};

type RegisterSessionBody = typeof RegisterSessionSchema; 

export function formToObject<T>(event:SubmitEvent<HTMLFormElement>, schema: T): T {
  const data = new FormData(event.currentTarget);

  let body:T = {} as T;

  Object.keys(schema).forEach(k => {
    body[k] = data.get(k);
  })

  return body;
}

export default function SessionRegister(){
    const navigate = useNavigate();
    const { sessionId } = useParams()
    const [ session, setSession ] = useState(null);

    const requestSession = async () =>{
        const s = await api.sessions.WA.getById(sessionId);
        setSession(s)
        console.log(s)
    }

    useEffect(() => {
        requestSession();
    }, []);

    const tryToRegister = async (event:SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const b = formToObject<RegisterSessionBody>(event, RegisterSessionSchema);
        const s = await api.sessions.register(b);

        if(s.id == b.id){
            navigate('../manage', { relative: 'path' });
        }
    }

    return (<>
    { session &&
        <section className="section">
            <h1 className="title">Register session</h1>

            <div className="box">
                <form onSubmit={tryToRegister}>
                    <TextSpan name="id" label="ID" value={session.id}></TextSpan>
                    <TextSpan name="phone" label="Phone" value={session.phone ?? "Phone not set yet"}></TextSpan>
                    <TextInput name="name" label="Name" value={session.name}></TextInput>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Description</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <textarea className="textarea" name="description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-right">
                    <p className="control">
                        <button className="button is-success">
                            Submit
                        </button>
                    </p>
                    <p className="control">
                        <Link to="/sessions" className="button is-light">
                            Cancel
                        </Link>
                    </p>
                    </div>
                </form>
            </div>
        </section>
    }
    </>);
}