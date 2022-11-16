import axios from "axios";

export default axios.create({
	// TO-DO make this more intelligent: is it localhost:port or a URL ? make this a process.env style flag
	baseURL: "https://backend.nanobiodata.org/api",
	headers: {
		"Content-type": "application/json"
	}
});
