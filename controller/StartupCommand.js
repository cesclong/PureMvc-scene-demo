/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 10:32:08
 * @desc    启动控制命令
 */

var StartupCommand = Objs("demo.controller.StartupCommand",
	MacroCommand,
{
	/**
	 * @override
	 * 添加Subcommands子命令来启动PuerMVC组件
	 */
	initializeMacroCommand: function( note )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
		this.addSubCommand( InitDataCommand );
	}


});