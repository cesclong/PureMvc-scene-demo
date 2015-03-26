/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 17:54:50
 * @desc    Book数据容器
 */

var BookProxy = Objs("demo.model.BookProxy",
	Proxy,
	{
		bookList: [],

		/**
		 * @override
		 * 初始化UserProxy实例
		 * @param {String} name proxy标识符
		 * @param {Array} bookList book集合
		 */
		initialize: function( name, bookList )
		{
			Proxy.prototype.initialize.call( this, name, bookList );

			if(bookList) this.bookList = bookList;
		},

		/**
		 * 添加book
		 */
		addBook: function( book )
		{
			this.bookList.push(book);
			// 发送添加book成功消息
			this.facade.sendNotification( BookProxy.ADD_BOOK_SUCCESS, book );
		},

		/**
		 * 根据name返回对应book
		 */
		getBookByName: function( name )
		{
			var bookList = this.bookList;

			for(var i=0; i<bookList.length; i++){
				if(bookList[i].name == name) return bookList[i];
			}

			return null;
		},

		/**
		 * 删除book
		 */
		deleteBook: function( book ){
			var bookList = this.bookList;

			for(var i=0; i<bookList.length; i++){
				if(bookList[i].name == book.name){
					bookList.splice(i, 1);
					this.facade.sendNotification( BookProxy.DELETE_USER_SUCCESS, book);
					return;
				}
			}
		}
	}

);

// 定义相关静态变量

BookProxy.DELETE_BOOK_SUCCESS = "BookProxy_DELETE_BOOK_SUCCESS";

BookProxy.ADD_BOOK_SUCCESS = "BookProxy_ADD_BOOK_SUCCESS";
