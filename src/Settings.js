class Settings {

    // Media Query sizes
    static minDesktopWidth = 1225;
    static maxTabletWidth = 1224;
    static maxPhoneWidth = 420;

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