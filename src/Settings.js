class Settings {

    // Media Query sizes
    static minDesktopWidth = 1225;
    static maxTabletWidth = 1224;
    static maxPhoneWidth = 420;

    // Schedule settings
    static classScheduleInterval = 30;
    static classScheduleIntervalCount = 30;
    static classScheduleStart = "05:00";

    // 
    static getApiUrl() {

        let urlMap = {
            // Azure Functions
            //localhost: 'http://localhost:7071/api/',

            // .Net Api
            localhost: 'http://localhost:56598/api/'
        }

        return (urlMap[window.location.hostname]);
    }
}

export default Settings;