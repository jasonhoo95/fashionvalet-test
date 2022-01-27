import { useEffect, useState } from "react";

export default function CardView({ data, type }) {
	const [url, setUrl] = useState();
	useEffect(() => {
		var urlparam = data.url_key;

		const lastSegment = urlparam.substring(urlparam.lastIndexOf("/") + 1);

		// "playlist"
		setUrl(lastSegment);
	}, []);
	return (
		<div className="card-container">
			<a href={`/${type}/${url}`}>
				<div className="image-card">
					<img src={data.thumbnail} />
				</div>
				<div style={{ padding: "10px" }}>
					<div className="desc-txt font-bold">{data.name}</div>
					<div className="desc-txt">{data.price}</div>
					<div style={{ color: "red" }} className="desc-txt discount-txt">
						{data.special_price}
					</div>
					{data.is_in_stock ? <div className="desc-txt">In Stock</div> : <div className="desc-txt">Not In Stock</div>}
				</div>
			</a>
		</div>
	);
}
