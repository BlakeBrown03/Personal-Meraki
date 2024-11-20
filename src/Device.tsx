export default function Device(props: any) {
	return (
		<div>
			<ul>
				<li>{props.name}</li>
				<ul>
					{"mac" in props ? <li>MAC: {props.mac}</li> : ""}
					{"lanIp" in props ? <li>LAN IP: {props.lanIp}</li> : ""}
					{"model" in props ? <li>Model: {props.model}</li> : ""}
					{"productType" in props ? <li>Product Type: {props.productType}</li> : ""}
					{"serial" in props ? <li>Serial: {props.serial}</li> : ""}
				</ul>
			</ul>
		</div>
	);
}
