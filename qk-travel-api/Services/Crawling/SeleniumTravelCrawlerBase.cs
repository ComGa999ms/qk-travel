using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace QkTravelApi.Services.Crawling
{
    public abstract class SeleniumTravelCrawlerBase
    {
        protected IWebDriver CreateDriver()
        {
            var options = new ChromeOptions();
            options.AddArgument("--headless=new");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--window-size=1440,1200");
            options.AddArgument("--lang=vi-VN");
            options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");

            var service = ChromeDriverService.CreateDefaultService();
            service.HideCommandPromptWindow = true;

            return new ChromeDriver(service, options, TimeSpan.FromSeconds(60));
        }

        protected static string? SafeText(IWebElement element)
        {
            var text = element.Text?.Trim();
            return string.IsNullOrWhiteSpace(text) ? null : text;
        }

        protected static string? SafeAttribute(IWebElement element, string name)
        {
            var value = element.GetAttribute(name)?.Trim();
            return string.IsNullOrWhiteSpace(value) ? null : value;
        }

        protected static string MakeAbsoluteUrl(string baseUrl, string href)
        {
            if (Uri.TryCreate(href, UriKind.Absolute, out var absolute))
                return absolute.ToString();

            return new Uri(new Uri(baseUrl), href).ToString();
        }

        protected static void WaitForBody(IWebDriver driver)
        {
            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(20));
            wait.Until(d => d.FindElement(By.TagName("body")));
        }
    }
}
