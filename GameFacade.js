/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 09:00:05
 * @desc    游戏全局应用
 */

var GameFacade = Objs("demo.GameFacade",
	Facade,
	{
		/**
		 * 程序启动入口
		 */
		startup: function()
		{
			//发送STARTUP消息给StartupCommand
			this.sendNotification( NotificationNames.STARTUP);
		},

		/**
		 * @override
		 * 重写初始化方法
		 * 注册启动命令
		 *
		 */
		initializeController: function()
		{
			//.&super 引用父元素
			GameFacade.$super.initializeController.call(this);

			//注册StartupCommand, 用来监听STARTUP启动消息
			this.registerCommand( NotificationNames.STARTUP, StartupCommand );
		}
	}
);

/**
 * 实现程序的单例类
 * @return {ApplicationFacade}
 * 		提供Facade供全局调用唯一接口
 */
GameFacade.getInstance = function()
{
	if( !Facade.instance )
		Facade.instance = new GameFacade();

	return Facade.instance;
};
