export default function Device (props: any) {
    return <div>
        <p>{props.name}</p>
        <p>{props.mac}</p>
        <p>{props.lanIp}</p>
    </div>
};