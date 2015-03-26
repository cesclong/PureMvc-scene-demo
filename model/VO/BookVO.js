/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 17:54:50
 * @desc    Book模型
 */

var BookVO = Objs("demo.model.vo.BookVO",
{

	name: undefined,

	author: undefined,

	country: undefined,

	price: NaN,

	/**
	 * 设置数据
	 * name 必须存在的情况下方才生效
	 */
	setData: function(props){
		if( !props instanceof Object ) return;

		if( !this.name && !props.name ) return;

		if( props.name && $.trim(props.name).length == 0 ) return;

		for(var key in props) this[key] = props [key];
	},

	/*
	 * 判断是否有效
	 */
	isValid: function()
	{
		if(!this.name) return false;

		if($.trim(this.name).length == 0) return false;

		return true;
	}

});