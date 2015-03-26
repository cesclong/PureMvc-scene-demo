/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 12:05:15
 * @desc    注册数据模型命令
 */

var PrepModelCommand = Objs("demo.controller.PrepModelCommand",
	SimpleCommand,
{
	/**
	 * @override
	 */
	execute: function( note )
	{
	    //注册一个ProxyName,并设置一个默认的用户列表
		// this.facade.registerProxy( new UserProxy( ProxyNames.USER_PROXY, this.generateUser() ) );


		// 定义book，并添加一条数据用于测试
		var book = new BookVO();

		book.setData({
			name: "CustomBook",
			author: "Petrus.Law",
			country: "China",
			price: "99.9"
		});

		//注册一个ProxyName,并设置一个默认的book列表
		this.facade.registerProxy( new BookProxy( ProxyNames.BOOK_PROXY, [book] ) );
	}

});