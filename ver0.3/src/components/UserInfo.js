class UserInfo{

	_data;

	constructor(props){

		let id = '_USER_' + Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
		let name = "이름없는 사용자";
		let grade = "수련생";
		let saveData = {};
		let icon = 0;

		if(props){
			id = (props.id) ? props.id : id;
			name = (props.name) ? props.name : name;
			grade = (props.grade) ? props.grade : grade;
			icon = (props.icon) ? props.icon : icon;
			saveData = (props.saveData) ? props.saveData : saveData;
		}

		this._data = {
			id: id,
			name: name,
			grade: grade,
			icon: icon,
			saveData: saveData
		}
	}

	saveLevel(levelData){
		this._data.saveData[levelData.id] = JSON.stringify(levelData);
	}

	get data(){
		return this._data;
	}
	get id(){
		return this._data.id;
	}
	get name(){
		return this._data.name;
	}
	get grade(){
		return this._data.grade;
	}
	get icon(){
		return this._data.icon;
	}
	get saveData(){
		return this._data.saveData;
	}

	toString(){
		return JSON.stringify(this._data);
	}
}

export default UserInfo;