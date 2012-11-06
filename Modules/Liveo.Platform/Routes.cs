using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Orchard.Mvc.Routes;

namespace Liveo.Platform
{
    public class Routes : IRouteProvider
    {
        public IEnumerable<RouteDescriptor> GetRoutes()
        {
            return new[] {
                 new RouteDescriptor {
                    Route = new Route(
                        "Users",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "User"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Users/Profile",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "User"},
                            {"action", "Profile"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Users/Settings",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "User"},
                            {"action", "Settings"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Liveo",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Home"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                 new RouteDescriptor {
                    Route = new Route(
                        "Standards",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Standards"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Survey",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Survey"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "ChooseProgram",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Survey"},
                            {"action", "SurveyPrograms"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Albums",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Album"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Groups",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Groups"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "MemberSearch",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "MemberSearch"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "HealthPlan",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Fitness"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Fitness",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Fitness"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Gallery",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Gallery"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Fitness/CreateGoal",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Fitness"},
                            {"action", "CreateGoal"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Affiliates",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Affiliate"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Affiliates/Program",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Affiliate"},
                            {"action", "Program"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Survey/Start",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Survey"},
                            {"action", "Start"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Survey/Page/{index}",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Survey"},
                            {"action", "Page"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Liveo/Account",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Account"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Liveo/Account/Register",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Account"},
                            {"action", "Register"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                    Route = new Route(
                        "Liveo/Account/Login",
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"},
                            {"controller", "Account"},
                            {"action", "Login"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "Liveo.Platform"}
                        },
                        new MvcRouteHandler())
                },
                new RouteDescriptor {
                                                     Route = new Route(
                                                         "Admin/Affiliate/Create",
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"},
                                                                                      {"controller", "AffiliateAdmin"},
                                                                                      {"action", "Create"}
                                                                                  },
                                                         new RouteValueDictionary(),
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"}
                                                                                  },
                                                         new MvcRouteHandler())
                                                 },
                             new RouteDescriptor {
                                                     Route = new Route(
                                                         "Admin/Affiliate/{affiliateId}/Edit",
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"},
                                                                                      {"controller", "AffiliateAdmin"},
                                                                                      {"action", "Edit"}
                                                                                  },
                                                         new RouteValueDictionary (),
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"}
                                                                                  },
                                                         new MvcRouteHandler())
                                                 },
                             new RouteDescriptor {
                                                     Route = new Route(
                                                         "Admin/Affiliate/{affiliateId}/Delete",
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"},
                                                                                      {"controller", "AffiliateAdmin"},
                                                                                      {"action", "Delete"}
                                                                                  },
                                                         new RouteValueDictionary (),
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"}
                                                                                  },
                                                         new MvcRouteHandler())
                                                 },
                             new RouteDescriptor {
                                                     Route = new Route(
                                                         "Admin/Affiliate/{affiliateId}",
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"},
                                                                                      {"controller", "AffiliateAdmin"},
                                                                                      {"action", "Item"}
                                                                                  },
                                                         new RouteValueDictionary (),
                                                         new RouteValueDictionary {
                                                                                      {"area", "Liveo.Platform"}
                                                                                  },
                                                         new MvcRouteHandler())
                                                 },
                
            };
        }

        public void GetRoutes(ICollection<RouteDescriptor> routes)
        {
            foreach (var routeDescriptor in GetRoutes())
                routes.Add(routeDescriptor);
        }
    }
}