import { useEffect, useState } from "react";

export default function DetailsView({ data }) {
	const [state, setState] = useState({
		videourl: "",
		videoType: "",
	});
	useEffect(() => {
		if (data.video) {
			let paramString = data.video.split("?")[1];
			let queryString = new URLSearchParams(paramString);
			const queryData = queryString.get("v");
			const checkString = /\.(mp3|mp4)$/i.test(queryData);

			if (checkString) {
				setState({ videoType: "mp4", videourl: queryData });
			} else {
				setState({ videoType: "youtube", videourl: queryData });
			}
		} else {
			setState({ videoType: null });
		}
	}, [data]);
	return (
		<div style={{ flexFlow: "row wrap" }} className="flex">
			<div className="w-1/2 sm:w-full p-4">
				<div className="grid grid-cols-2 gap-2 mobile-card">
					{data.images.map((o, key) => {
						return <img key={key} src={o} />;
					})}
				</div>
			</div>
			<div className="w-1/2 sm:w-full p-4">
				<h3 className="text-lg m-3 font-bold">{data.name}</h3>
				<div className="m-3 text-lg">
					<span>{data.price}</span>

					<span style={{ textDecoration: "line-through", color: "#aeb1bd" }} className="m-3">
						{data.special_price}
					</span>
				</div>
				<h2 style={{ color: "red" }} className="text-md">
					{data.extra_info_title}
				</h2>
				{state.videoType && state.videoType == "mp4" ? (
					<video className="videoContainer" style={{ width: "100%", height: "300px" }} controls>
						<source src={state.videourl} type="video/mp4" />
					</video>
				) : (
					<iframe style={{ width: "100%", height: "300px" }} src={`https://www.youtube.com/embed/${state.videourl}`} />
				)}

				{/* <div>
					{data.extra_info.map((o, key) => {
						return <div dangerouslySetInnerHTML={{ __html: o }}></div>;
					})}
				</div> */}
				<div style={{ margin: "10px 0px" }}>
					<span className="font-bold text-lg m-3">Color:</span>
					<span>{data.color}</span>
				</div>
				<div style={{ margin: "10px 0px" }}>
					<span className="font-bold text-lg m-3">Brand:</span>
					<span>{data.brand}</span>
				</div>
				<div style={{ margin: "10px 0px" }}>
					<span className="font-bold text-lg m-3">Qty:</span>
					<span>{data.options[0].qty}</span>
				</div>
				<div className="font-bold">Size Option:</div>
				<div style={{ flexFlow: "row wrap" }} className="flex">
					{data.options.map((o, key) => {
						return <div className="size-label">{o.label}</div>;
					})}
				</div>

				<a href={data.url_key}>
					<div style={{ fontSize: "30px" }} className="card-container text-center category-container">
						Learn More
					</div>
				</a>
			</div>
		</div>
	);
}
