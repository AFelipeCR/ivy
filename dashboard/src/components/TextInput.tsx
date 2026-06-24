interface TextInputConfig {
    label:string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    value: string;
    name: string;
}

const defaultInput:TextInputConfig = {
    label: "",
    required: false,
    disabled: false,
    readOnly: false,
    value: "",
    name: ""
}

export default function TextInput({label, required, disabled, value, readOnly, name, className }:TextInputConfig = defaultInput) {
    return (<>
    <div className={`field is-horizontal ${className}`}>
        <div className="field-label is-normal">
            <label className="label">{label}</label>
        </div>
        <div className="field-body">
            <div className="field">
                <div className="control">
                    <input 
                    className="input" 
                    type="text" 
                    disabled={disabled}
                    required={required}  
                    readOnly={readOnly}
                    defaultValue={value}
                    name={name}
                    />
                </div>
            </div>
        </div>
    </div>
    </>);
}