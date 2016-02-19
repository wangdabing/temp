using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebSite.Controllers
{
    /// <summary>
    /// 插件Js代理
    /// </summary>
    public class ActiveXProxiesController : Controller
    {
        /***

//插件方法返回值
{
  "result": null,
  "success": false,
  "error": {
    "message": "An internal error occured during your request!",
    "details": "..."
  },
  "unAuthorizedRequest": false
}
var obj = document.getElementById("xx");
icp.activeX.player(obj).init().start();
         */

        /// <summary>
        /// 获取插件Js代理
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public JavaScriptResult Get(string name)
        {
            var js = RenderViewToString("Template");
            return JavaScript(js);
        }

        /// <summary>
        /// 插件Js模板
        /// </summary>
        /// <returns></returns>
        private ActionResult Template()
        {
            return View();
        }

        /// <summary>
        /// 将视图转换为字符串
        /// </summary>
        /// <param name="viewName"></param>
        /// <returns></returns>
        private string RenderViewToString(string viewName)
        {
            var view = ViewEngines.Engines.FindView(this.ControllerContext, viewName, null).View;
            using (var writer = new StringWriter())
            {
                var viewContext = new ViewContext(this.ControllerContext, view, this.ViewData, this.TempData, writer);
                viewContext.View.Render(viewContext, writer);
                return writer.ToString();
            }
        }
    }
}
