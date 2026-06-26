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

            // On Linux containers Chrome/Chromium is installed at a known path.
            // On Windows local dev, leave BinaryLocation unset so Selenium Manager finds the installed Chrome.
            var chromeBinary = ResolveExistingPath(
                Environment.GetEnvironmentVariable("CHROME_BIN"),
                "/usr/bin/chromium",
                "/usr/bin/chromium-browser",
                "/usr/bin/google-chrome",
                "/usr/bin/google-chrome-stable");

            if (!string.IsNullOrWhiteSpace(chromeBinary))
                options.BinaryLocation = chromeBinary;

            options.PageLoadStrategy = PageLoadStrategy.Eager;
            options.AddArgument("--headless=new");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--window-size=1440,1200");
            options.AddArgument("--lang=vi-VN");
            options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");
            options.AddArgument($"--user-data-dir={Path.Combine(Path.GetTempPath(), $"qktravel-chrome-{Guid.NewGuid():N}")}");

            // Resolve an explicit driver path (Linux container, or the chromedriver.exe copied into the output dir).
            // If none is found, fall back to the default service so Selenium Manager auto-provisions the driver.
            var chromeDriverPath = ResolveExistingPath(
                Environment.GetEnvironmentVariable("CHROMEDRIVER_PATH"),
                "/usr/bin/chromedriver",
                "/usr/lib/chromium/chromedriver",
                "/usr/lib/chromium-browser/chromedriver",
                Path.Combine(AppContext.BaseDirectory, "chromedriver"),
                Path.Combine(AppContext.BaseDirectory, "chromedriver.exe"));

            var service = string.IsNullOrWhiteSpace(chromeDriverPath)
                ? ChromeDriverService.CreateDefaultService()
                : ChromeDriverService.CreateDefaultService(
                    Path.GetDirectoryName(chromeDriverPath),
                    Path.GetFileName(chromeDriverPath));
            service.HideCommandPromptWindow = true;

            var driver = new ChromeDriver(service, options, TimeSpan.FromSeconds(60));
            driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
            driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(15);
            return driver;
        }

        private static string? ResolveExistingPath(params string?[] paths)
        {
            return paths
                .Where(path => !string.IsNullOrWhiteSpace(path))
                .FirstOrDefault(System.IO.File.Exists);
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
