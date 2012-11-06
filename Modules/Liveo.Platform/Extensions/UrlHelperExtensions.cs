using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Platform.Models;
using Orchard.ContentManagement.Aspects;
using Orchard.Mvc.Extensions;

namespace Liveo.Platform.Extensions
{
    public static class UrlHelperExtensions
    {
        public static string Affiliates(this UrlHelper urlHelper)
        {
            return urlHelper.Action("List", "Affiliate", new { area = "Liveo.Platform" });
        }

        public static string AffiliatesForAdmin(this UrlHelper urlHelper)
        {
            return urlHelper.Action("List", "AffiliateAdmin", new { area = "Liveo.Platform" });
        }

        public static string Affiliate(this UrlHelper urlHelper, AffiliatePart affiliatePart)
        {
            return urlHelper.Action("Item", "Affiliate", new { affiliateId = affiliatePart.Id, area = "Liveo.Platform" });
        }

        public static string AffiliateForAdmin(this UrlHelper urlHelper, AffiliatePart affiliatePart)
        {
            return urlHelper.Action("Item", "AffiliateAdmin", new { affiliateId = affiliatePart.Id, area = "Liveo.Platform" });
        }

        public static string AffiliateCreate(this UrlHelper urlHelper)
        {
            return urlHelper.Action("Create", "AffiliateAdmin", new { area = "Liveo.Platform" });
        }

        public static string AffiliateEdit(this UrlHelper urlHelper, AffiliatePart affiliatePart)
        {
            return urlHelper.Action("Edit", "AffiliateAdmin", new { affiliateId = affiliatePart.Id, area = "Liveo.Platform" });
        }

        public static string AffiliateRemove(this UrlHelper urlHelper, AffiliatePart affiliatePart)
        {
            return urlHelper.Action("Remove", "AffiliateAdmin", new { affiliateId = affiliatePart.Id, area = "Liveo.Platform" });
        }

        public static string SurveyCreate(this UrlHelper urlHelper)
        {
            return urlHelper.Action("Create", "SurveyAdmin", new { area = "Liveo.Platform" });
        }

        public static string SurveyEdit(this UrlHelper urlHelper, SurveyPart surveyPart)
        {
            return urlHelper.Action("Edit", "SurveyAdmin", new { surveyId = surveyPart.Id, area = "Liveo.Platform" });
        }

        public static string SurveysForAdmin(this UrlHelper urlHelper)
        {
            return urlHelper.Action("List", "SurveyAdmin", new { area = "Liveo.Platform" });
        }

        public static string SurveyQuestionCreate(this UrlHelper urlHelper, int surveyId)
        {
            return urlHelper.Action("CreateQuestion", "SurveyAdmin", new { area = "Liveo.Platform", surveyId });
        }

        public static string SurveyQuestionEdit(this UrlHelper urlHelper, int questionId)
        {
            return urlHelper.Action("EditQuestion", "SurveyAdmin", new { area = "Liveo.Platform", questionId });
        }
    }
}