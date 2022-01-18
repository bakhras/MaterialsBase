import {
	CREATE_COMPOUND,
	RETRIEVE_COMPOUNDS,
	UPDATE_COMPOUND,
	DELETE_COMPOUND,
	DELETE_ALL_COMPOUNDS
} from "./types";
import CompoundDataService from "../services/compound.service"

export const createCompound = (comp_index, comp_material, comp_notation, comp_mol2, comp_components, comp_properties, comp_activities, comp_overallProperties, comp_overallActivities) => async (dispatch) => {
	try {
		const res = await CompoundDataService.create({
			comp_index,
			comp_material,
			comp_notation,
			comp_mol2,
			comp_components,
			comp_properties,
			comp_activities,
			comp_overallProperties,
			comp_overallActivities
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
	try{
		const res = await CompoundDataService.getAll();
		dispatch({
			type: RETRIEVE_COMPOUNDS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateCompound = (comp_id, data) => async (dispatch) => {
	try {
		const res = await CompoundDataService.update(comp_id, data);

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
		await CompoundDataService.deleteCompound(id);

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
		const res = await CompoundDataService.deleteAllCompounds();

		dispatch({
			type: DELETE_ALL_COMPOUNDS,
			payload: res.data,
		});

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
