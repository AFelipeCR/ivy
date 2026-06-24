interface TextSpanConfig {
    label:string;
    value: string;
    name: string;
    className?: string;
}

const defaultSpan:TextSpanConfig = {
    label: "",
    value: "",
    name: ""
}

export default function TextSpan({label, value, name, className }:TextSpanConfig = defaultSpan) {
    return (<>
    <div className={`field is-horizontal ${className}`}>
        <div className="field-label is-normal">
            <label className="label">{label}</label>
        </div>
        <div className="field-body">
            <div className="field">
                <div className="control">
                    <span className="input">{value}</span>
                    <input type="text" defaultValue={value} name={name} hidden/>
                </div>
            </div>
        </div>
    </div>
    </>);
}