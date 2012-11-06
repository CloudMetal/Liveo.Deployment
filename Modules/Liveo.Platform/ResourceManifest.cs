using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Orchard.UI.Resources;

namespace Liveo.Platform
{
	public class ResourceManifest : IResourceManifestProvider
	{
		public void BuildManifests(ResourceManifestBuilder builder)
		{
			var manifest = builder.Add();

			#region generated scripts

			var generatedScripts = new string[] { 
													"viewModel_Affiliate",
													"viewModel_Album",
													"viewModel_AnswerSelection",
													"viewModel_ChartType",
													"viewModel_Exercise",
													"viewModel_ExerciseType",
													"viewModel_Feature",
													"viewModel_Goal",
													"viewModel_Goal_WIP",
													"viewModel_GoalType",
													"viewModel_Group",
													"viewModel_GroupMembership",
													"viewModel_Ingredient",
													"viewModel_Meal",
													"viewModel_Measurement",
													"viewModel_MeasurementType",
													"viewModel_MediaItem",
													"viewModel_Organization",
													"viewModel_Persona",
													"viewModel_Program",
													"viewModel_ProgramCycle",
													"viewModel_QuestionType",
													"viewModel_Reading",
													"viewModel_ReadingSource",
													"viewModel_ReadingSourceType",
													"viewModel_ReadingType",
													"viewModel_ReadingTypeUnitTypeX",
													"viewModel_Role",
													"viewModel_Survey",
													"viewModel_SurveyQuestion",
													"viewModel_SystemInstallation",
													"viewModel_UnitType",
													"viewModel_User",
													"viewModel_UserAffiliateX",
													"viewModel_UserAnswer",
													"viewModel_UserPersona",
													"viewModel_UserQuestion",
													"viewModel_UserSurvey"};

			#endregion

			manifest.DefineScript("jquerytools").SetUrl("Resources/jquery.tools.1.2.7-min.js", "Resources/jquery.tools.1.2.7-min.js").SetVersion("2012.2.913");
			manifest.DefineScript("jqueryuijs").SetUrl("Resources/jquery-ui-1.8.24-min.js", "Resources/jquery-ui-1.8.24-min.js").SetVersion("2012.2.913");
            manifest.DefineScript("jquerycookie").SetUrl("Resources/jquery.cookie.js", "Resources/jquery.cookie.js").SetVersion("1.3");
            manifest.DefineScript("jqueryfancybox").SetUrl("Resources/jquery.fancybox.js", "Resources/jquery.fancybox.js").SetVersion("2012.1.1");
            manifest.DefineScript("jqueryfancyboxpack").SetUrl("Resources/jquery.fancybox.pack.js", "Resources/jquery.fancybox.pack.js").SetVersion("2012.1.1");
            manifest.DefineScript("jquerymousewheelpack").SetUrl("Resources/jquery.mousewheel-3.0.6.pack.js", "Resources/jquery.mousewheel-3.0.6.pack.js").SetVersion("3.0.6");

			manifest.DefineScript("livequery").SetUrl("Resources/jquery.livequery.js", "Resources/jquery.livequery.js").SetVersion("1.1.1");
			manifest.DefineScript("form").SetUrl("Resources/jquery.form.js", "Resources/jquery.form.min.js").SetVersion("3.18");
            manifest.DefineScript("ko").SetUrl("Resources/knockout-2.1.0.js", "Resources/knockout-2.1.0.debug.js").SetVersion("2.1.0");
			manifest.DefineScript("komulti").SetUrl("Resources/knockout.multimodels-0.1.min.js", "Resources/knockout.multimodels-0.1.min.js").SetVersion("0.1");

			manifest.DefineScript("common").SetUrl("fitness/common.js", "fitness/common.js").SetVersion("2012.2.913");

            
			//manifest.DefineScript("style").SetUrl("Resources/style.js", "Resources/style.js").SetVersion("1.0");
			//manifest.DefineScript("colorbox").SetUrl("Resources/jquery.colorbox.js", "Resources/jquery.colorbox.js").SetVersion("1.3.20.1");

			foreach (var alias in generatedScripts)
			{
				var filename = string.Format("generated/{0}.js", alias);
				manifest.DefineScript(alias).SetUrl(filename, filename).SetVersion("2012.2.913");
			}

            manifest.DefineScript("kovalidate").SetUrl("Resources/knockout.validation.min.js", "Resources/knockout.validation.js").SetVersion("0.1");
			// css required for jquery tools popup dialog that we are leveraging
			manifest.DefineStyle("modal").SetUrl("modal.css", "modal.css").SetVersion("2012.2.913");

			// jquery ui css, had to rename b/c orchard wouldn't recognize the regular name of this file (jquery.ui.2.blah.blah.min.js)
			manifest.DefineStyle("jqui").SetUrl("jqui.css", "jqui.css").SetVersion("2012.2.913");
            manifest.DefineStyle("fancybox").SetUrl("jquery.fancybox.css", "jquery.fancybox.css").SetVersion("2012.2.913");

			// standards styles setup by kyle (copied from Liveo.MVC4 project which has a copy from Standards repo
			manifest.DefineStyle("reset").SetUrl("Liveo/reset.css", "Liveo/reset.css").SetVersion("2012.2.913");
			manifest.DefineStyle("layout").SetUrl("Liveo/layout.css", "Liveo/layout.css").SetVersion("2012.2.913");
            manifest.DefineStyle("layout_ext").SetUrl("Liveo/layout_ext.css", "Liveo/layout_ext.css").SetVersion("2012.2.913");
			manifest.DefineStyle("font").SetUrl("Liveo/font.css", "Liveo/font.css").SetVersion("2012.2.913");
		}
	}
}
//

