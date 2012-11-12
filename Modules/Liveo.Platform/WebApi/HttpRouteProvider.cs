using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Orchard.Mvc.Routes;
using Orchard.WebApi.Routes;

namespace Liveo.Platform.WebApi
{
	public class HttpRoutes : IHttpRouteProvider
	{
		public void GetRoutes(ICollection<RouteDescriptor> routes)
		{
			foreach (RouteDescriptor routeDescriptor in GetRoutes())
			{
				routes.Add(routeDescriptor);
			}
		}

		public IEnumerable<RouteDescriptor> GetRoutes()
		{
			return new[]{
                 new HttpRouteDescriptor {
											Name = "AccountApi",
											Priority = -10,
											RouteTemplate = "api/Account/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "AccountApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "AffiliateApi",
											Priority = -10,
											RouteTemplate = "api/Affiliate/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "AffiliateApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "AlbumApi",
											Priority = -10,
											RouteTemplate = "api/Album/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "AlbumApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "AnswerSelectionApi",
											Priority = -10,
											RouteTemplate = "api/AnswerSelection",
											Defaults = new	{ area = "Liveo.Platform", controller = "AnswerSelectionApi" }		
										},
                new HttpRouteDescriptor {
											Name = "AnswerSelectionGetApi",
											Priority = -10,
											RouteTemplate = "api/AnswerSelection/{questionId}",
											Defaults = new	{ area = "Liveo.Platform", controller = "AnswerSelectionApi" }		
										},
                new HttpRouteDescriptor {
											Name = "ChartTypeApi",
											Priority = -10,
											RouteTemplate = "api/ChartType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ChartTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ExerciseApi",
											Priority = -10,
											RouteTemplate = "api/Exercise/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ExerciseApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ExerciseTypeApi",
											Priority = -10,
											RouteTemplate = "api/ExerciseType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ExerciseTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "FeatureApi",
											Priority = -10,
											RouteTemplate = "api/Feature/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "FeatureApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "FitnessApi",
											Priority = -10,
											RouteTemplate = "api/Fitness/{action}/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "FitnessApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "GoalApi",
											Priority = -10,
											RouteTemplate = "api/Goal/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "GoalApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "GoalTypeApi",
											Priority = -10,
											RouteTemplate = "api/GoalType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "GoalTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "GroupApi",
											Priority = -10,
											RouteTemplate = "api/Group/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "GroupApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "GroupMembershipApi",
											Priority = -10,
											RouteTemplate = "api/GroupMembership/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "GroupMembershipApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "IngredientApi",
											Priority = -10,
											RouteTemplate = "api/Ingredient/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "IngredientApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "MealApi",
											Priority = -10,
											RouteTemplate = "api/Meal/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "MealApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "MeasurementApi",
											Priority = -10,
											RouteTemplate = "api/Measurement/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "MeasurementApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "MeasurementTypeApi",
											Priority = -10,
											RouteTemplate = "api/MeasurementType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "MeasurementTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "MediaItemApi",
											Priority = -10,
											RouteTemplate = "api/MeasurementType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "MeasurementTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "OrganizationApi",
											Priority = -10,
											RouteTemplate = "api/Organization/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "OrganizationApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "PersonaApi",
											Priority = -10,
											RouteTemplate = "api/Persona/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "PersonaApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ProgramApi",
											Priority = -10,
											RouteTemplate = "api/Program/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ProgramApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ProgramCycleApi",
											Priority = -10,
											RouteTemplate = "api/ProgramCycle/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ProgramCycleApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "QuestionTypeApi",
											Priority = -10,
											RouteTemplate = "api/QuestionType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "QuestionTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ReadingApi",
											Priority = -10,
											RouteTemplate = "api/Reading/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ReadingApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ReadingSourceApi",
											Priority = -10,
											RouteTemplate = "api/ReadingSource/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ReadingSourceApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ReadingSourceTypeApi",
											Priority = -10,
											RouteTemplate = "api/ReadingSourceType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ReadingSourceTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ReadingTypeApi",
											Priority = -10,
											RouteTemplate = "api/ReadingType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ReadingTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "ReadingTypeUnitTypeXApi",
											Priority = -10,
											RouteTemplate = "api/ReadingTypeUnitTypeX/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "ReadingTypeUnitTypeXApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "RoleApi",
											Priority = -10,
											RouteTemplate = "api/Role/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "RoleApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "SurveyApi",
											Priority = -10,
											RouteTemplate = "api/Survey/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "SurveyApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "SurveyQuestionApi",
											Priority = -10,
											RouteTemplate = "api/SurveyQuestion/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "SurveyQuestionApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "SystemInstallationApi",
											Priority = -10,
											RouteTemplate = "api/SystemInstallation/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "SystemInstallationApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UnitTypeApi",
											Priority = -10,
											RouteTemplate = "api/UnitType/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UnitTypeApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserApi",
											Priority = -10,
											RouteTemplate = "api/User/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserAffiliateXApi",
											Priority = -10,
											RouteTemplate = "api/UserAffiliateX/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserAffiliateXApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserAnswerApi",
											Priority = -10,
											RouteTemplate = "api/UserAnswer/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserAnswerApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserPersonaApi",
											Priority = -10,
											RouteTemplate = "api/UserPersona/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserPersonaApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserQuestionApi",
											Priority = -10,
											RouteTemplate = "api/UserQuestion/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserQuestionApi", id = RouteParameter.Optional }		
										},
                new HttpRouteDescriptor {
											Name = "UserSurveyApi",
											Priority = -10,
											RouteTemplate = "api/UserSurvey/{id}",
											Defaults = new	{ area = "Liveo.Platform", controller = "UserSurveyApi", id = RouteParameter.Optional }		
										},
                
                
               
               
			};
		}
	}
}