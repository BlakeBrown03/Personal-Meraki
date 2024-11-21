export default function Device(props: any) {
	return (
		<tr>
			{"hostname" in props ? <td>{props.hostname}</td> : ""}
			{"productType" in props ? <td>{props.productType}</td> : ""}
			{"model" in props ? <td>{props.model}</td> : ""}
			{"lanIp" in props ? <td>{props.lanIp}</td> : ""}
			{"mac" in props ? <td>{props.mac}</td> : ""}
			{"serial" in props ? <td>{props.serial}</td> : ""}
		</tr>
	);
}
