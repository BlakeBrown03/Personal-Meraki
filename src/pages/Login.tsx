import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Login() {
    const [key,setKey] = useState("");

    function registerKey(e: any): void {
        e?.preventDefault();
        if (key === "") {
            alert("Please enter an API key");
            return;
        } 
        sessionStorage.setItem("apiKey", JSON.stringify(key.toLowerCase()));
    };

    return (
        <Form style={{textAlign: "center"}}>
            <Form.Group>
                <Form.Label>API Key</Form.Label>
                <Form.Control type="text" placeholder="Enter API Key" onChange={(e) => setKey(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={registerKey}>Submit</Button>
        </Form>
    );
};