import Settings from 'Settings';
// import JSEncrypt from 'jsencrypt';
// import jwt_decode from 'jwt-decode';

class GymManagementApiService {

    static apiUrl = null;
    static userToken = null;

    static async request(uri, body, method) {
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GymManagementApiService.userToken}`
        }

        let options = {
            headers: headers,
            body: method === 'GET' ? null : JSON.stringify(body),
            method: method,
        }

        let url = `${GymManagementApiService.apiUrl}${uri}`;

        console.log("url / options:", url, options);

        let response = await fetch(url, options);
        response = await response.json();
        console.log("response:", response);
        return response;
    }

    // Setup Methods

    static setApiUrl() {
        GymManagementApiService.apiUrl = Settings.getApiUrl();
    }

    static setUserToken() {

    }

    // Login/Logout Methods

    static async login(credentials) {

        // TODO: Setup Encryption on the API
        // let key = await this.request('Auth/Key', null, 'POST');
        
        // var encrypt = new JSEncrypt();
        // encrypt.setPublicKey(key.publicKey);
        // let encryptedUser = encrypt.encrypt(credentials.user);
        // let encryptedPassword = encrypt.encrypt(credentials.password);

        // let encryptedCredentials = {
        //     UserName: encryptedUser,
        //     Password: encryptedPassword
        // };

        let token = await this.request('Auth/Token', credentials, 'POST');
        GymManagementApiService.userToken = token.token;
        console.log("Token:", token);

        // TODO: Token from api says invalid

        // try {
        //     token = jwt_decode(token);
        //     console.log("Decoded:", token);
        // }
        // catch(error) {
        //     return error;
        // }

        return token;
    }

    // Contact Methods

    static async getContacts() {

        // let filter = ``;
        //return await this.request('GetContacts', null, 'GET');
        return await this.request('Contact', null, 'GET');
    }

    static async createContact(contact) {
        return await this.request('Contact', contact, 'POST');
    }

    static async updateContact(contact) {
        return await this.request('Contact', contact, 'PATCH');
    }

    // Source Methods

    static async getSources() {

        // let filter = ``;
        return await this.request('Source', null, 'GET');
    }

    // Status Methods

    static async getStatuses() {

        // let filter = '';
        return await this.request('Status', null, 'GET');
    }

    // Interest Methods 
    
    static async getInterests() {

        // let filter = '';
        return await this.request('Interest', null, 'GET');
    }

    static async createInterests(interests) {
        return await this.request('Interest', interests, 'POST');
    }

    static async updateInterests(interests) {
        return await this.request('Interest', interests, 'PATCH');
    }

    // Type Methods

    static async getTypes() {
        return await this.request('Type', null, 'GET');
    }

    static async getTypesByCategory(category) {
        return await this.request(`Type/${category}`, null, 'GET');
    }

    static async createType(type) {
        return await this.request('Type', type, 'POST');
    }

    static async updateTypes(types) {
        return await this.request('Type', types, 'PATCH');
    }

    // Class Methods

    static async getClassInstances() {
        return await this.request('Class', null, 'GET');
    }

    // Class Schedule Methods

    static async getClassSchedules() {
        return await this.request('ClassSchedule', null, 'GET');
    }

    static async createClassSchedule(schedule) {
        return await this.request('ClassSchedule', schedule, 'POST');
    }

    static async updateClassSchedule(schedule) {
        return await this.request('ClassSchedule', schedule, 'PATCH');
    }

    static async deleteClassSchedule(id) {
        return await this.request(`ClassSchedule/${id}`, null, 'POST');
    }
}

export default GymManagementApiService;