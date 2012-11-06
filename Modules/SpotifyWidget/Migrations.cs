using System;
using System.Collections.Generic;
using System.Data;
using Orchard.ContentManagement.Drivers;
using Orchard.ContentManagement.MetaData;
using Orchard.ContentManagement.MetaData.Builders;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;
using Orchard.Environment.Extensions;
using SpotifyWidget.Models;

namespace SpotifyWidget
{
  [OrchardFeature("SpotifyWidget")]
  public class Migrations : DataMigrationImpl
  {
    public int Create()
    {
      // Creating table SpotifyWidgetRecord
      SchemaBuilder.CreateTable("SpotifyWidgetRecord", table => table
        .ContentPartRecord()
        .Column("Uri", DbType.String)
        .Column("Theme", DbType.String)
        .Column("ViewType", DbType.String)
        .Column("Height", DbType.Int32)
        .Column("Width", DbType.Int32)
        );

      ContentDefinitionManager.AlterPartDefinition(typeof(SpotifyWidgetPart).Name,
        builder => builder.Attachable());

      ContentDefinitionManager.AlterTypeDefinition("SpotifyWidget", cfg => cfg
             .WithPart("SpotifyWidgetPart")
             .WithPart("WidgetPart")
             .WithPart("CommonPart")
             .WithSetting("Stereotype", "Widget"));


      return 1;
    }
  }
}