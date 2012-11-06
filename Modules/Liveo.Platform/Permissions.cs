using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Environment.Extensions.Models;
using Orchard.Security.Permissions;

namespace Liveo.Platform
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageFeatures = new Permission { Description = "Manage feature settings", Name = "ManageFeatures" };
        public static readonly Permission ManageSurveys = new Permission { Description = "Manage surveys", Name = "ManageSurveys" };
        public static readonly Permission ManageAffiliates = new Permission { Description = "Manage affiliates", Name = "ManageAffiliates" };

        public virtual Feature Feature { get; set; }

        public IEnumerable<Permission> GetPermissions()
        {
            return new[] {
                ManageFeatures,
                ManageSurveys,
                ManageAffiliates
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new[] {ManageFeatures, ManageSurveys, ManageAffiliates}
                },
                
            };
        }
    }
}