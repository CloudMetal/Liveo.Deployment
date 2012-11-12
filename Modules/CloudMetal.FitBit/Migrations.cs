using System;
using System.Collections.Generic;
using System.Data;
using Orchard.ContentManagement.Drivers;
using Orchard.ContentManagement.MetaData;
using Orchard.ContentManagement.MetaData.Builders;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;

namespace CloudMetal.FitBit {
    public class Migrations : DataMigrationImpl {

        public int Create() {
            SchemaBuilder.CreateTable("OAuthSettingsRecord", table => table
                .ContentPartRecord()
                .Column<string>("ConsumerKey")
                .Column<string>("ConsumerSecret")
                );

            ContentDefinitionManager.AlterPartDefinition("OAuthSettingsPart", part => part
               .Attachable(false)
               );

            SchemaBuilder.CreateTable("FitBitUserRecord", table => table
                .ContentPartRecord()
                .Column<string>("Email")
                .Column<string>("OAuthToken")
                );

            ContentDefinitionManager.AlterPartDefinition("FitBitUserPart", part => part
               .Attachable(false)
               );

            return 1;
        }
    }
}