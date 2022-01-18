import http from "../http-common";

class CompoundDataService {
	getAll() {
		return http.get("/compounds");
	}

	get(id) {
		return http.get("/compounds/${id}");
	}

	create(data) {
		return http.post("/compounds/", data);
	}

	update(id, data) {
		return http.put("/compounds/${id}", data);
	}

	remove(id) {
		return http.delete("/compounds/${id}", data);
	}

	removeAll(id) {
		return http.delete("/compounds")
	}
}

const CompoundDataService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll
};


export default new CompoundDataService();
