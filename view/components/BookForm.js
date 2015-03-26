/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-15 12:00:28
 * @desc    Book表单控件
 */

var BookForm = Objs("demo.view.components.BookForm",
	UiComponent,
{
	/**
	 * @construct
	 * @override
	 */
	initialize: function()
	{

		BookForm.$super.initialize.call( this );

		this.initializeContainer();
	},

	/**
	 * 初始化UI容器
	 */
	initializeContainer: function()
	{
		var $el = this.$el = $("<div id='bookFormContainer'><div>name: <input id='bookName' /></div><div>author: <input id='bookAuthor' /></div><div id='bookCountry'>country: <input /></div><div id='bookPrice'>price: <input /></div><div><input id='bookFormSub' type='button' value='submit' /></div></div>");

		// 定义各数据对应元素引用，方便后续调用
		this.$name = $el.find("#bookName");
		this.$author = $el.find("#bookAuthor");
		this.$country = $el.find("#country");
		this.$price = $el.find("#bookPrice");
		this.$sub = $el.find("#bookFormSub");

		var _this = this;
		this.$sub.click( function(){ _this.onSub() } );
	},

	getBook: function()
	{
		// 使用数据模型
		var book = new BookVO();

		book.setData({
			name: this.$name.val(),
			author: this.$author.val(),
			country: this.$country.val(),
			price: this.$price.val()
		});

		return book;
	},

	/**
	 * 清除表单
	 */
	clearForm: function(){
		this.$name .val("");
		this.$author.val("");
		this.$country.val("");
		this.$price.val("");
	},

	onSub: function(evt){
		if(!this.getBook().isValid())
		{
			alert("亲,正确输入哦!!!")
			return;
		}
		else
		{
			this.dispatchEvent( BookForm.OnSubmit, this.getBook() );
		}
	}

});

BookForm.OnSubmit = "BookForm.OnSubmit";

