/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 12:06:57
 * @desc    初始数据命令
 */

var InitDataCommand = Objs("demo.controller.InitDataCommand",
	SimpleCommand,
{
	/**
	 * @override
	 */
	execute: function( note )
	{
		// 初始发送显示显示主场景消息
		this.sendNotification(MainMediator.SHOW);

	}

});