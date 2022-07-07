import http from "../http-common";

const getAll = () => {
	return http.get("/compounds");
};

const get = (id) => {
	return http.get(`/compounds/${id}`);
};

const create = (data) => {
	return http.post("/compounds/", data);
};

const update = (id, data) => {
	return http.put(`/compounds/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/compounds/${id}`);
};

const removeAll = () => {
	return http.delete("/compounds");
};

const findCompoundByTitle = title => {
	return http.get(`/compounds?comp_index=${title}`);
};

const CompoundService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findCompoundByTitle
}
export default CompoundService;
