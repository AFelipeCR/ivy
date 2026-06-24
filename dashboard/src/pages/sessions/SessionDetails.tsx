import { useParams } from "react-router-dom";

export default function SessionDetails(){
    const { sessionId } = useParams()
    return (<>
    {sessionId}
    </>);
}