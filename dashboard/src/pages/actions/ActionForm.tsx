import { useEffect, useState, type SubmitEvent } from "react";
import TextInput from "../../components/TextInput";
import type { ExtensionFunction, ExtensionModel, ExtFunctionInput } from "../../models/extension.model";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import type { SubscribableEvent } from "../../models/route.model";


export default function ActionForm ({routeId, events}) {
    const [functions, setFunctions] = useState<ExtensionFunction[]>([]);
    let [extensions, setExtensions] = useState<ExtensionModel[]>([]);
    const [nextId, setNextId] = useState(2);
    const [selectedEvents, setSelectedEvents] = useState<SubscribableEvent[]>([events[0]]);
    const navigate = useNavigate();

    const onSubmitAction = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const action = {
            command: data.get("command"),
            events: selectedEvents,
            functions: functions.map(f => {
                const func = extensions[Number(f.extensionId)].functions[Number(f.functionId)];
                const inputs = func.inputs.map((_, index) => data.get(`func-input-${index}`))

                return {
                    extension: extensions[Number(f.extensionId)].name, 
                    function: func.alias,
                    inputs
                }
            }),
            routeId
        };

        const res = await api.actions.register(action);

        if(res.success){
            navigate("../")
        }
    }

    const removeFunctionForm = (idToRemove: number) => {
        setFunctions(prev => prev.filter(f => f.id !== idToRemove));
    };

    const updateFunction = (id, field, value) => {
        setFunctions(prev => prev.map(f => 
            f.id === id ? { ...f, [field]: value } : f
        ));
    };

    const updateEvents = (eventName) => {
        const isSelected = selectedEvents.includes(eventName);

        if (isSelected && selectedEvents.length === 1) {
            return;
        }
        
        const newEvents = selectedEvents.includes(eventName)
            ? selectedEvents.filter(e => e !== eventName)
            : [...selectedEvents, eventName];
        
        setSelectedEvents(newEvents)
    };

    const addFunctionForm = () => {
        setFunctions(prev => [...prev, {
            extensionId: 0, functionId: 0, id: nextId, events,
        }]);
        setNextId(prev => prev + 1);
    };

    const requestData = async () => {
        setFunctions([{
            extensionId: 0, 
            functionId: 0, 
            id: 1
        }]);
        
        const es:ExtensionModel[] = await api.extensions.getList();
        setExtensions(es);
    };

    useEffect(() => {
        requestData();
    }, []);

    return (<>
    <div className="box my-2">
        <form onSubmit={onSubmitAction}>
            <TextInput name="command" label="Command" value="" required={true} className="mb-5"></TextInput>
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label">Events</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="checkboxes">
                                {events.map((e, index) => <>
                                    <label key={index} className="checkbox">
                                        <input 
                                        type="checkbox" 
                                        name="events[]"
                                        checked={selectedEvents.includes(e)}
                                        onChange={() => updateEvents(e)}/>
                                        <span className="px-2">{e}</span>
                                    </label>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {extensions && extensions.length != 0 && functions.map((f)  => <FunctionForm 
                removeForm={removeFunctionForm} 
                eFunction={f} key={f.id} 
                length={functions.length} 
                updateFunction={updateFunction}
                extensions={extensions}></FunctionForm>)}

            <div className="buttons is-centered my-4">
                <button className="button is-rounded" type="button" onClick={addFunctionForm}>
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>

            <div className="buttons is-right my-4">
                <button className="button is-success" type="submit">Guardar</button>
                <button className="button is-light" type="button">Cancelar</button>
            </div>
        </form>
    </div>
    </>);
}

interface FunctionFormParams {
    removeForm: any;
    eFunction: ExtensionFunction;
    length: number;
    updateFunction: any;
    extensions: ExtensionModel[]
}

function FunctionForm({removeForm, eFunction, length, updateFunction, extensions}: FunctionFormParams) {
    let [functions, setFunctions] = useState<string[]>([]);
    let [functionInputs, setFunctionInputs] = useState<ExtFunctionInput[]>([]);

    const onExtensionChange = (e) => {
        const index = e.target.value;
        updateFunction(eFunction.id, 'extensionId', e.target.value)
        updateFunction(eFunction.id, 'functionId', 0)
        setFunctions(extensions[index].functions.map(f => f.alias));
        setFunctionInputs(extensions[index].functions[eFunction.functionId].inputs)
    }

    const onFunctionChange = (e) => {
        const funcs = extensions[eFunction.extensionId].functions;
        updateFunction(eFunction.id, 'functionId', e.target.value)
        setFunctionInputs(funcs[e.target.value].inputs)
    }

    useEffect(() => {
        const funcs = extensions[eFunction.extensionId].functions;
        setFunctions(funcs.map(f => f.alias));
        setFunctionInputs(funcs[eFunction.functionId].inputs)
    }, []);

    return(<>
    <div className="my-2 has-border has-border-primary pt-4 pb-5 px-5 is-rounded">
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Function</label>
            </div>

            <div className="field-body">
                <div className="field is-grouped">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select value={eFunction.extensionId} onChange={(e) => onExtensionChange(e) }>
                                {extensions.map((e, index) => <option value={index}>{e.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select value={eFunction.functionId} onChange={(e) => onFunctionChange(e)}>
                                {functions && functions.map((f, index)=> <option value={index}>{f}</option>)}
                            </select>
                        </div>
                    </div>

                    {false && <p className="control">
                        <button className="button" type="button">
                            <i className="bi bi-arrows-vertical"></i>
                        </button>
                    </p>}

                    <p className="control">
                        <button className="button" type="button" onClick={() => length > 1 ? removeForm(eFunction.id) : 0 } disabled={length == 1}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </p>
                </div>
            </div>
        </div>

        {functionInputs.map((i, index) => {
            if(i === "input-text"){
                return (<TextInput label="Input" name={`func-input-${index}`} value="" required={true}></TextInput>);
            }

            if(i === "textarea"){
                return (<textarea className="textarea" name={`func-input-${index}`}></textarea>);
            }

            return (<></>);
        })}
    </div>
    </>);
}