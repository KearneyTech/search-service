/**
 * Manage logging app-wide
 * Scenario: Turn on/off low level logging
 * Scenario: Turn off app logging, except specific modules
 * 
 * TODOs:
 * Log levels at the top app level - Trace,Info,Error set by env
 * Module override - can log regardless of app config
 * env variables to rule them all?
 * Error messages?
 */
export class smartLogging {
    constructor(private contextLevel1: string, private isLogging: boolean) {}

    logMessages(flag: boolean) {
        this.isLogging = flag;
    }

    log(contextLevel2: string, message: string) {
        if(this.isLogging) {
            console.log(`${this.contextLevel1} ${contextLevel2} : ${message}`);
        }
    }

    error(message: string) {
        console.error(message);
    }
};