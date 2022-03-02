import http from "../http-common";

const getAll = () => {
	return http.get("/compounds");
};

const get = id => {
	return http.get("/compounds/${id}");
};

const create = data => {
	return http.post("/compounds/", data);
};

const update = (id, data) => {
	return http.put("/compounds/${id}", data);
};

const remove = id => {
	return http.delete("/compounds/${id}", data);
};

const removeAll = () => {
	return http.delete("/compounds");
};

const findCompoundsByTitle = title => {
	return http.get(`/compounds?comp_index=${title}`);
};

const CompoundDataService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findCompoundsByTitle,
};

export default new CompoundDataService();
