import { api } from '.';
async function selectAllData(path) {
	const res = await api.get(`selectAll/${path}`);
	return res.data;
}

async function searchData(path) {
	const res = await api.get(`search/${path}`);
	return res.data;
}

async function deleteData(path) {
	const res = await api.get(`delete/${path}`);
	return res.data;
}

async function changeData(path) {
	const res = await api.get(`change/${path}`);
	return res.data;
}

export { selectAllData, searchData, deleteData, changeData };
