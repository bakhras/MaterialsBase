import http from "../http-common";
class CompoundDataService {
	getAll() {
		return http.get("/compounds");
	}

	get(id) {
		return http.get(`/compounds/${id}`);
	}

	create(data){
		return http.post("/compounds/", data);
	}

	update(id, data){
		return http.put(`/compounds/${id}`, data);
	}

	remove(id){
		return http.delete(`/compounds/${id}`);
	}

	removeAll() {
		return http.delete("/compounds");
	}

	findCompoundsByTitle = title => {
		return http.get(`/compounds?comp_index=${title}`);
	}
}
export default new CompoundDataService();
