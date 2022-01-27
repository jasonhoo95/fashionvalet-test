import axios from "axios";
import { useEffect, useState } from "react";
import CardView from "../components/cardView";
import DetailsView from "../components/detailsView";
import _ from "lodash";
export default function ProductDetails({ data, type }) {
	const [state, setState] = useState({
		listData: [],
	});
	useEffect(() => {
		console.log(data, "fetch data");
		setState({ listData: data });
	}, [data]);
	return (
		<div>
			{type == "details" ? (
				<div>
					{" "}
					<DetailsView data={data} />
				</div>
			) : (
				<div>
					<h1 className="text-center text-bold text-4xl uppercase">{type}</h1>

					<div style={{ margin: "20px" }} class="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-1">
						{state.listData.map((o, key) => {
							return <CardView data={o} type={type} />;
						})}
					</div>
				</div>
			)}
		</div>
	);
}

ProductDetails.getInitialProps = async (ctx) => {
	const { req, res, query } = ctx;
	if (query.slug.length >= 2) {
		if (query.slug[0] == "dickies") {
			const data1 = await axios.get("/dickies.json");
			console.log(data1.data.data);

			const finaldata = _.find(data1.data.data, function (o) {
				return o.url_key.substring(o.url_key.lastIndexOf("/") + 1) == query.slug[1];
			});
			console.log(finaldata);
			return { data: finaldata, type: "details" };
		} else {
			const data1 = await axios.get("/co-ords.json");
			console.log(data1.data.data);

			const finaldata = _.find(data1.data.data, function (o) {
				return o.url_key.substring(o.url_key.lastIndexOf("/") + 1) == query.slug[1];
			});
			console.log(finaldata);
			return { data: finaldata, type: "details" };
		}
	} else {
		if (query.slug[0] == "dickies") {
			const data1 = await axios.get("/dickies.json");
			console.log(data1.data.data);
			return { data: data1.data.data, type: "dickies" };
		} else {
			const data1 = await axios.get("/co-ords.json");
			console.log(data1.data.data);
			return { data: data1.data.data, type: "coords" };
		}
	}
};
