import {
	CREATE_COMPOUND,
	RETRIEVE_COMPOUND,
	UPDATE_COMPOUND,
	DELETE_COMPOUND,
	DELETE_ALL_COMPOUNDS
} from "./types";
import CompoundService from "../services/CompoundService"

export const createCompound = (comp_index, comp_material, comp_notation, comp_mol2, comp_components, comp_properties) => async (dispatch) => {
	try {
		const res = await CompoundService.create({
			comp_index,
			comp_material,
			comp_notation,
			comp_mol2,
			comp_components,
			comp_properties,
		});

		dispatch({
			type: CREATE_COMPOUND,
			payload: res.data,
		});

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const retrieveCompounds = () => async (dispatch) => {
	try {
		const res = await CompoundService.getAll();
		dispatch({
			type: RETRIEVE_COMPOUND,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateCompound = (comp_id, data) => async (dispatch) => {
	try {
		const res = await CompoundService.update(comp_id, data);

		dispatch({
			type: UPDATE_COMPOUND,
			payload: data,
		});

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err)
	}
};

export const deleteCompound = (comp_id) => async (dispatch) => {
	try {
		await CompoundService.deleteCompound(comp_id);

		dispatch({
			type: DELETE_COMPOUND,
			payload: { comp_id },
		});
	} catch (err) {
		console.log(err);
	}
};

export const deleteAllCompounds = () => async (dispatch) => {
	try {
		const res = await CompoundService.deleteAllCompounds();

		dispatch({
			type: DELETE_ALL_COMPOUNDS,
			payload: res.data,
		});

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const findCompoundByTitle = (title) => async (dispatch) => {
	try {
		const res = await CompoundService.findCompoundByTitle(title);
		dispatch({
			type: RETRIEVE_COMPOUND,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};
