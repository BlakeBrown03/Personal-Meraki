import { Card } from "react-bootstrap";

export default function NetworkCards(props: any) {

    return <Card style={{ whiteSpace: "nowrap", paddingTop: 5, paddingBottom: 5, textAlign: "center" }}>
        <h2>{props.name}</h2>
    </Card>
}