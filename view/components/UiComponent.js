/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-12-15 10:00:08
 * @desc    UI基础控件
 */

var UiComponent = Objs("demo.view.components.UiComponent",
	{

		listenerMap: null,

		/**
		 * @construct
		 * 初始化执行函数
		 */
		initialize: function()
		{
			// 监听键值对
			this.listenerMap = {};
		},

		/**
		 * 触发监听器
		 * @type 监听类型
		 * @properties 监听事件传入数据
		 */
		dispatchEvent: function(type, properties)
		{
			// 未传入监听事件 || 找不到该监听类型
			if( typeof type == undefined || typeof this.listenerMap[type] == undefined ) return;

			// 监听事件，所有需要执行方法列表
			var queue = this.listenerMap[type].slice(0);

			var props = properties || {};	// Object

			var len = queue.length;

			// 循环执行监听事件
			for(var i=0; i<len; i++)
			{
				var listenerDescriptor = queue[i];

				if( typeof listenerDescriptor.listener == 'function' )
				{
					if( typeof listenerDescriptor.context != "undefined" )
						listenerDescriptor.listener.call( listenerDescriptor.context, props );
					else
						listenerDescriptor.listener.call( this, event, props );
				}
			}
		},

		/**
		 * 添加监听事件
		 * @param {String} type 监听类型
		 * @param {Function} listener 回调
		 * @param {Object} context 作用域
	 	 */
		addEventListener: function(type, listener, context)
		{
			if(!type || !listener) return;

			var newListener = new UiComponent.ListenerDescriptor( listener, context );

			var queue;	// Object

			// 该监听类型无监听队列处理
			if( typeof this.listenerMap[type ] == "undefined" )
				queue = this.listenerMap[type] = [];
			// 存在监听队列则直接使用存在的监听队列
			else
				queue = this.listenerMap[type];

			var len = queue.length;	// Number
			for(var i=0; i<len; i++ )
			{
				var listenerDescriptor = queue[i];

				// 监听数据已存在
				if( listenerDescriptor.equals( newListener ) )
					return;
			}

			queue.push(newListener);

		}
	}
);

/**
 * 监听器
 */
UiComponent.ListenerDescriptor = Objs("demo.view.components.UiComponent.Event",
{
	/**
	 * @construct
	 * Initialize a <code>UiComponent.ListenerDescriptor</code> instance.
	 * @param {Function} listener 监听回调
	 * @context {Object} listener 监听作用域
	 */
	initialize: function( listener, context )
	{
		this.listener = listener;
		this.context = context;
	},

    /**
	 * 判断两个监听对象是相同
     * @param {UiComponent.ListenerDescriptor} compared
     * @return {Boolean}
     */
    equals: function( compared )
    {
        if( compared.listener == this.listener )
        {
            if( typeof compared.context != "undefined" )
            {
                if( compared.context == null && this.context == null )
                    return true;

                if( compared.context == this.context )
                    return true;
            }
        }

        return false;
    }
});


