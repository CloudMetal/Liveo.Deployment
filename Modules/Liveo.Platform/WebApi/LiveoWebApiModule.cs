using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;

namespace Liveo.Platform.WebApi
{
    public class LiveoWebApiModule : Module
    {
        protected override void Load(ContainerBuilder builder) {
            var assembly = typeof (Liveo.WebApi.AutoFacBuilder).Assembly;
            builder.RegisterAssemblyModules(assembly);
            builder.RegisterAssemblyTypes(assembly);
        }
    }
}