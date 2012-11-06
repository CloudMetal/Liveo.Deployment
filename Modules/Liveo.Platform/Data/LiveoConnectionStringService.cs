using System;
using System.Collections.Generic;
using System.Data.EntityClient;
using System.IO;
using System.Linq;
using System.Web;
using Orchard.Environment.Configuration;
using Orchard.FileSystems.AppData;

namespace Liveo.Platform.Data
{
    public class LiveoConnectionStringService : ILiveoConnectionStringService
    {
        private readonly IAppDataFolder _appDataFolder;

        public LiveoConnectionStringService(IAppDataFolder appDataFolder)
        {
            _appDataFolder = appDataFolder;
        }

        public string BuildConnectionString() {
            ShellSettings shellSettings = LoadSettings().FirstOrDefault();

            string providerName = "System.Data.SqlClient";
            string connectionString = shellSettings.DataConnectionString;

            var entityBuilder =
             new EntityConnectionStringBuilder();

            //Set the provider name.
            entityBuilder.Provider = providerName;

            // Set the provider-specific connection string.
            entityBuilder.ProviderConnectionString = connectionString;

            // Set the Metadata location.
            entityBuilder.Metadata = "res://*/Model.LiveoModel.csdl|res://*/Model.LiveoModel.ssdl|res://*/Model.LiveoModel.msl";

            return entityBuilder.ToString();
        }

        IEnumerable<ShellSettings> LoadSettings()
        {
            var filePaths = _appDataFolder
                .ListDirectories("Sites")
                .SelectMany(path => _appDataFolder.ListFiles(path))
                .Where(path => string.Equals(Path.GetFileName(path), "Settings.txt", StringComparison.OrdinalIgnoreCase));

            foreach (var filePath in filePaths)
            {
                yield return ShellSettingsSerializer.ParseSettings(_appDataFolder.ReadFile(filePath));
            }
        }
    }
}