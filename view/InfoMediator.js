/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-12 19:43:01
 * @desc    Info场景
 */

var InfoMediator = Objs("demo.view.InfoMediator",
	Mediator, {

		/**
		 * @construct
		 * @override
		 */
		initialize: function(name, viewComponent) {
			InfoMediator.$super.initialize.call(this, name, viewComponent);

		},

		/**
		 * @override
		 */
		listNotificationInterests: function() {
			return [
				InfoMediator.SHOW,
				InfoMediator.CLOSE,
				InfoMediator.REPLACE_MEDIATOR
			];
		},

		/**
		 * @override
		 */
		handleNotification: function(note) {
			switch (note.getName()) {
				case InfoMediator.SHOW:
					if(this.viewComponent) return;

					this.setViewComponent($("#container"));

					var $info = $("<div id='infoAdv'>\
					<div>puremvc用法示例</div>\
					<div>适用于存在多个场景单页面WEbAPP</div>\
					<div>参考于:<br/>\
						<a target='_blank' href='http://www.java2s.com/Open-Source/Javascript_Free_Code/MVC/Download_puremvc_employeeadmin_jquery_Free_Java_Code.htm'>http://www.java2s.com/Open-Source/Javascript_Free_Code/MVC/Download_puremvc_employeeadmin_jquery_Free_Java_Code.htm</a><br/>\
						<a target='_blank' href='http://www.tekool.net/blog/2010/03/14/puremvc-javascript-mootools-employeeadmin-demo/'>http://www.tekool.net/blog/2010/03/14/puremvc-javascript-mootools-employeeadmin-demo/</a><div/>\
					<div>联系我:Petrus.law@outlook.com</div>\
					</div>");
					this.viewComponent.append($info);

					var $back = $("<div id='backInfo'>Click Me To MainMediator !</div>");
					var _this = this;
					$back.click(function() {
						_this.sendNotification(InfoMediator.REPLACE_MEDIATOR, MainMediator.SHOW);
					});
					this.viewComponent.append($back);

					break;
				case InfoMediator.CLOSE:
					if (this.viewComponent) {
						this.viewComponent.empty();
						this.viewComponent = null;
					}

					break;
				case InfoMediator.REPLACE_MEDIATOR:
					this.sendNotification(InfoMediator.CLOSE);

					this.sendNotification(note.getBody());

					break;
			}
		}

	}

);

InfoMediator.SHOW = "InfoMediator_SHOW";

InfoMediator.CLOSE = "InfoMediator_CLOSE";

InfoMediator.REPLACE_MEDIATOR = "InfoMediator_TO_MAIN_MEDIATOR";