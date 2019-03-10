class Settings {

    // Media Query sizes
    static minDesktopWidth = 1225;
    static maxTabletWidth = 1224;
    static maxPhoneWidth = 420;

    // Schedule settings
    static classScheduleInterval = 30; // minutes
    static classScheduleIntervalCount = 30; // intervals per day
    static classScheduleStart = "05:00";
    static dayStart = 10; // Sunday starts at 10 px
    static dayMultiple = 133; // 133px between each day
    static timeStart = 10; // 05:00 starts at 10px
    static timeMultiple = 25; // 25 px between every 30 minutes
    static initialHeight = 15; // first "30 minute" section of a class
    static regularHeight = 25; // every "30 minute" section after first
    
    //
    static getApiUrl() {

        let urlMap = {
            // .Net Api
            localhost: 'http://localhost:56598/api/'
        }

        return (urlMap[window.location.hostname]);
    }
}

export default Settings;