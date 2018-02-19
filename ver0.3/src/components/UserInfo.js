class UserInfo{

	_data;

	constructor(props){

		let id = '_USER_' + Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
		let name = "이름없는 사용자";
		let grade = "수련생";
		let saveData = {};
		let icon = 0;
		let progress = undefined;
		let settings = {};

		if(props){
			id = (props.id) ? props.id : id;
			name = (props.name) ? props.name : name;
			grade = (props.grade) ? props.grade : grade;
			icon = (props.icon) ? props.icon : icon;
			progress = (props.progress) ? props.progress : progress;
			saveData = (props.saveData) ? props.saveData : saveData;
			settings = (props.settings) ? props.settings : settings;
		}

		this._data = {
			id: id,
			name: name,
			grade: grade,
			icon: icon,
			progress: progress,
			saveData: saveData,
			settings: settings
		}
	}

	removeSaveData(){
		this._data.saveData = {};
	}

	saveSettings(key, value){
		let settings = this._data.settings;
		settings[key] = value;
	}

	saveProgress(levelId){
		this._data.progress = levelId;
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
	get progress(){
		return this._data.progress;
	}
	get saveData(){
		return this._data.saveData;
	}
	get settings(){
		return this._data.settings;
	}


	toString(){
		return JSON.stringify(this._data);
	}
}

export default UserInfo;