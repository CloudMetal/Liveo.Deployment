using Orchard.Data.Migration;

namespace Onestop.CustomAdmin {
    public class Migrations : DataMigrationImpl {

        public int Create() {

            SchemaBuilder.CreateTable(
                "AdminThemeSettingsPartRecord",
                table => table
                             .ContentPartRecord()
                             .Column<string>("LogoUrl")
                             .Column<string>("Brand")
                );

            return 1;
        }

        public int UpdateFrom1() {
            SchemaBuilder.AlterTable(
                "AdminThemeSettingsPartRecord",
                table => table
                             .AddColumn<string>("Welcome"));
            return 2;
        }
    }
}