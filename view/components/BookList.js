/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-15 13:59:18
 * @desc    BookList列表控件
 */

var BookList = Objs("demo.view.components.UserForm",
	UiComponent,	// 继承UI基础控件(主要是为了继承UiComponent中的监听器)
{

	$el: null,

	bookList: [],

	/**
	 * @construct
	 * @override
	 */
	initialize: function(bookList)
	{
		// 调用父类中的initialize函数
		BookList.$super.initialize.call( this );

		this.bookList = bookList;

		// 初始化容器
		this.initializeContainer();

	},

	/**
	 * 初始化Html容器
	 */
	initializeContainer: function(){
		this.$el = $("<table id='bookListContainer' align='center'><tr id='bookListHead'><td>Name</td><td>Author</td><td>Country</td><td>Price</td><td>action</td></tr></table>");

		for(var i=0; i<this.bookList.length; i++){
			this.loadBook(this.bookList[i]);
		}
	},

	/**
	 * 加载book显示
	 */
	loadBook: function(book)
	{
		if(!book || !book.name) return;

		var name = book.name;
		var author = book.author || "Unknow";
		var country = book.country || "Unknow";
		var price = book.price || "Unknow";

		var $tr = $("<tr><td>"+name+"</td><td>"+author+"</td><td>"+country+"</td><td>"+price+"</td><td>"+"<input type='button' value='Remove' id='"+name+"' />"+"</td></tr>");

		this.$el.append($tr);

		var _this = this;
		$tr.find('td #' + name).click(
			function(evt){
				_this.sendRemoveBook(book);
			}
		)
	},

	/**
	 * 发送删除消息
	 */
	sendRemoveBook: function(book){
		// 发送删除book监听消息
		this.dispatchEvent( BookList.Remove, book );
	},

	/**
	 * 删除book
	 */
	removeBook: function(book){
		this.$el.find('#' + book.name).parents("tr").remove();
	}

});

/*
 * Event names
 */
BookList.Remove= "BookList_Remove";


