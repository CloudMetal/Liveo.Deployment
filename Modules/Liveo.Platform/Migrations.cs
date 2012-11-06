using System;
using System.Collections.Generic;
using System.Data;
using Liveo.Platform.Models;
using Orchard.ContentManagement.Drivers;
using Orchard.ContentManagement.MetaData;
using Orchard.ContentManagement.MetaData.Builders;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;

namespace Liveo.Platform {
    public class Migrations : DataMigrationImpl {

        public int Create() {
            SchemaBuilder.CreateTable("LiveoUserRecord", table => table
                            .ContentPartRecord()
                            .Column<int>("UserId")
                            );

            ContentDefinitionManager.AlterPartDefinition("LiveoUserPart", part => part
               .Attachable(false)
               );

            ContentDefinitionManager.AlterTypeDefinition("User", type => type
                .WithPart("LiveoUserPart")
                );

            return 1;
        }

        public int UpdateFrom1() {

            SchemaBuilder.CreateTable("SurveyRecord", table => table
                            .ContentPartRecord()
                            .Column<int>("SurveyId")
                            );

            ContentDefinitionManager.AlterTypeDefinition("Survey",
                cfg => cfg
                    .WithPart("SurveyPart")
                    .WithPart("CommonPart")
                    .WithPart("TitlePart")
                    .WithPart("AutoroutePart", builder => builder
                        .WithSetting("AutorouteSettings.AllowCustomPattern", "true")
                        .WithSetting("AutorouteSettings.AutomaticAdjustmentOnEdit", "false")
                        .WithSetting("AutorouteSettings.PatternDefinitions", "[{Name:'Title', Pattern: '{Content.Slug}', Description: 'my-survey'}]")
                        .WithSetting("AutorouteSettings.DefaultPatternIndex", "0"))
                    .WithPart("MenuPart")
                    .WithPart("AdminMenuPart", p => p.WithSetting("AdminMenuPartTypeSettings.DefaultPosition", "2"))
                );

            return 2;
        }

        public int UpdateFrom2() {
            SchemaBuilder.CreateTable("AffiliateRecord", table => table
                            .ContentPartRecord()
                            .Column<int>("AffiliateId")
                            );

            ContentDefinitionManager.AlterTypeDefinition("Affiliate",
                cfg => cfg
                    .WithPart("AffiliatePart")
                    .WithPart("CommonPart")
                    .WithPart("TitlePart")
                    .WithPart("BodyPart")
                    .WithPart("AutoroutePart", builder => builder
                        .WithSetting("AutorouteSettings.AllowCustomPattern", "true")
                        .WithSetting("AutorouteSettings.AutomaticAdjustmentOnEdit", "false")
                        .WithSetting("AutorouteSettings.PatternDefinitions", "[{Name:'Title', Pattern: '{Content.Slug}', Description: 'my-affiliate'}]")
                        .WithSetting("AutorouteSettings.DefaultPatternIndex", "0"))
                    .WithPart("MenuPart")
                    .WithPart("AdminMenuPart", p => p.WithSetting("AdminMenuPartTypeSettings.DefaultPosition", "2"))
                );

            ContentDefinitionManager.AlterTypeDefinition("Survey",
                cfg => cfg
                    .WithPart("BodyPart")
                );

            return 3;
        }

        public int UpdateFrom3()
        {
            SchemaBuilder.CreateTable("GoalListRecord", table => table
                            .ContentPartRecord()
                            .Column<int>("UserId")
                            );

            ContentDefinitionManager.AlterPartDefinition(typeof(GoalListPart).Name, cfg => cfg
                .Attachable());

            ContentDefinitionManager.AlterTypeDefinition("GoalList",
                cfg => cfg
                    .WithPart("GoalListPart")
                    .WithPart("CommonPart")
                    .WithPart("WidgetPart")
                    .WithSetting("Stereotype", "Widget")
                );
            return 4;
        }

        public int UpdateFrom4() {
            SchemaBuilder.CreateTable("MediaCollectionPartRecord",
                table => table
                    .ContentPartRecord()
                    .Column<int>("MediaCollectionId")
                );

            ContentDefinitionManager.AlterTypeDefinition("MediaCollection",
                cfg => cfg
                    .WithPart("MediaCollectionPart")
                    .WithPart("CommonPart")
                    .WithPart("WidgetPart")
                    .WithSetting("Stereotype", "Widget")
                );

            return 5;
        }
    }
}