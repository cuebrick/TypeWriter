class UserInfo{

	_data;

	constructor(props){

		let id = 'user' + Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
		let name = "이름없는 사용자";
		let grade = "수련생";
		let level = {};
		let icon = 0;

		if(props){
			id = (props.id) ? props.id : id;
			name = (props.name) ? props.name : name;
			grade = (props.grade) ? props.grade : grade;
			level = (props.level) ? props.level : level;
			icon = (props.icon) ? props.icon : icon;
		}

		this._data = {
			id: id,
			name: name,
			grade: grade,
			level: level,
			icon: icon
		}
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
	get level(){
		return this._data.level;
	}
	get icon(){
		return this._data.icon;
	}

	toString(){
		return JSON.stringify(this._data);
	}
}

export default UserInfo;