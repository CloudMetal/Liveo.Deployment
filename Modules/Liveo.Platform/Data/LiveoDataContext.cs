using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using CloudMetal.Core.Data.Configuration;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;

namespace Liveo.Platform.Data
{
    public class LiveoDataContext : LiveoModelContainer, ILiveoDataContext
    {
        public LiveoDataContext(ILiveoConnectionStringService connectionStringService) : base(connectionStringService) {}

        public LiveoDataContext Context
        {
            get { return this; }
        }
    }

    public class LiveoDataContextModule : Module {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<LiveoDataContext>().As<ILiveoDataContext>().InstancePerLifetimeScope();
        }
    }
}