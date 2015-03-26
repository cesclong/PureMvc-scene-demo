/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 11:05:11
 * @desc    注册UI命令
 */

var PrepViewCommand = Objs("demo.controller.PrepViewCommand",
	SimpleCommand,
{
	/**
	 * @override
	 */
	execute: function( note )
	{
		this.facade.registerMediator(new MainMediator(MediatorNames.MAIN_MEDIATOR));

		this.facade.registerMediator(new InfoMediator(MediatorNames.INFO_MEDIATOR));

	}
});