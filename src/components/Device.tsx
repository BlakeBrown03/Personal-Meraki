export default function Device(props: any) {
	return (
		<tr>
			{"name" in props ? <td style={{whiteSpace: "nowrap"}}>{props.name}</td> : <td>NA</td>}
			{"productType" in props ? <td>{props.productType}</td> : <td>NA</td>}
			{"model" in props ? <td>{props.model}</td> : <td>NA</td>}
			{"lanIp" in props ? <td>{props.lanIp}</td> : <td>NA</td>}
			{"mac" in props ? <td>{props.mac}</td> : <td>NA</td>}
			{"serial" in props ? <td style={{whiteSpace: "nowrap"}}>{props.serial}</td> : <td>NA</td>}
		</tr>
	);
}
