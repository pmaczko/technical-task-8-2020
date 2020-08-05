import {Injectable} from '@angular/core';
import {environment} from '@env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authInstance: gapi.auth2.GoogleAuth = null;

    constructor() {
    }

    async initGoogleApiAuth(): Promise<gapi.auth2.GoogleUser> {
        return (new Promise((resolve) => {
            gapi.load('auth2', resolve);
        })).then(async () => {
            return await gapi.auth2
                .init({client_id: environment.googleApiKey})
                .then(auth => {
                    this.authInstance = auth;
                    return this.authInstance.currentUser.get();
                });
        });
    }

    private get googleApiLoaded(): boolean {
        return !!this.authInstance;
    }

    async authenticate(): Promise<gapi.auth2.GoogleUser> {
        if (!this.googleApiLoaded) {
            await this.initGoogleApiAuth();
        }

        return await this.authInstance.signIn();
    }

    logout(): void {
        if (this.googleApiLoaded) {
            this.authInstance.signOut();
        }
    }
}
