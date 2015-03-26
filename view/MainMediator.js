/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 18:33:30
 * @desc    主场景
 */

var MainMediator = Objs("demo.view.MainMediator",
	Mediator,
{

	/**
	 * 重写Mediator初始化方法
	 */
	initialize: function( name, viewComponent )
	{
		MainMediator.$super.initialize.call( this, name, viewComponent );

		// 注册Model
		this.bookProxy = this.facade.retrieveProxy( ProxyNames.BOOK_PROXY );
	},

	/**
	 * @override
	 * 添加监听消息
	 * 监听消息由handleNotification中处理
	 */
	listNotificationInterests: function()
	{
		return [
			MainMediator.SHOW,
			MainMediator.CLOSE,
			BookList.Remove,
			BookProxy.DELETE_USER_SUCCESS,
			BookProxy.ADD_BOOK_SUCCESS,
			MainMediator.REPLACE_MEDIATOR
		];
	},

	/**
	 * @override
	 * 处理监听到的消息
	 */
	handleNotification: function( note )
	{
		// 根据获取到的消息名，分别处理各类消息
		switch( note.getName() ) {
			// 显示主场景消息
			case MainMediator.SHOW:
				// 存在viewComponent,则表示当前场景位于动作中，不处理
				if(this.viewComponent) return;

				this.setViewComponent($("#container"));

				// 讲bookList保存到当前mediator中，便于后续操作
				var bookList = this.bookList = new BookList( this.bookProxy.bookList );
				this.viewComponent.append( bookList.$el );
				// 添加监听事件
				bookList.addEventListener( BookList.Remove, this.onRemoveBook, this );

				var bookForm = this.bookForm = new BookForm();
				bookForm.addEventListener( BookForm.OnSubmit, this.onAddBook, this );
				this.viewComponent.append(bookForm.$el);

				var $info = $( "<div id='bottomInfo'>点击我挑转InfoMediator</div>" );
				var _this = this;
				$info.click( function()
				{
					// 发送替换主场景消息
					_this.sendNotification(MainMediator.REPLACE_MEDIATOR, InfoMediator.SHOW);
				}
				);
				this.viewComponent.append($info);

				break;
			// 关闭主场景
			// 关闭主场景，并不是移除主场景，而是清空主场景的视图而已
			case MainMediator.CLOSE:
				if(this.viewComponent){
					this.viewComponent.empty();
					this.viewComponent = null;
				}

				break;
			// 数据层中成功删除book后view做出相应处理
			case BookProxy.DELETE_USER_SUCCESS:
				if(!this.viewComponent) return;

				// 相应处理bookList
				this.bookList.bookList = this.bookProxy.bookList;
				this.bookList.removeBook( note.getBody() );

				break;
			case BookProxy.ADD_BOOK_SUCCESS:
				this.bookList.bookList = this.bookProxy.bookList;

				this.bookList.loadBook( note.getBody() );
				this.bookForm.clearForm();

				break;
			// 替换主场景
			case MainMediator.REPLACE_MEDIATOR:
				// 先关闭主场景
				this.sendNotification(MainMediator.CLOSE);
				// note.getBody()，此处传入未替换场景的命令，如: InfoMediator.SHOW
				this.sendNotification(note.getBody());

				break;
		}
	},

	onRemoveBook: function( book ){
		// 调用模型层删除book
		this.bookProxy.deleteBook( book );
	},

	onAddBook: function( book ){
		// 同上，增加
		this.bookProxy.addBook( book );
	}

}

);

// 主场景监听消息, 名字任意，不重复即可
// 当然也可以单独简历一个文件用来定义消息名

MainMediator.SHOW = "MainMediator_SHOW";

MainMediator.CLOSE = "MainMediator_CLOSE";

MainMediator.REPLACE_MEDIATOR = "MainMediator_TO_INFO_MEDIATOR";
