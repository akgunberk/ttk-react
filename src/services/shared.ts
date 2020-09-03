import { Create, With, Payload, corePayload } from './models'
export interface UserModelDetails {
    jobStatus: number, /*   1:NoJob 
                            2:JobWithNoQuote 
                            3:JobWith2Quotes 
                            4:JobWithDeal 
                            5:JobDone 
                            8:Reviewed 
                            11:PleaseSelectQuote */
    bmType?: number
    serviceId?: number /* Boya Badana :32 
                          Evden Eve Nakliye:142 
                          Psikolog:156 
                          İngilizce Özel Ders:64 
                          Haşere İlaçlama:31 
                          Pokemon Destek:1 */
    isRepeat?: boolean,
    jobDate?: string,  /* 'YY-MM-DD HH:MM' */
    response?: {
        // by default returns userToken as first value
        emailPassword?: boolean,
        verificationCode?: boolean,
    }
}
export interface ProModelDetails {
    // will be implemented when ttk is ready.
    bmType?: number,
    callPreferences?: number,
    serviceId?: number
    photoDetail?: boolean,
    jobLocation?: boolean,
    jobDate?: string
}

export const DefaultProDetails: corePayload = {
    operation: Create.PRO,
    commands: [With.PASSWORD, With.CREDITCARD, With.BALANCE], //"WITHPASSWORD", "PHONECONFIRMATON" should be added for create-pro function.
    commandContext: { proBalance: 10000 }
}

export const DefaultJobDetails: Payload["jobTestContext"] = {
    operation: Create.JOB,
    commands: [With.SERVICEID, With.QUOTES],
    commandContext: { serviceId: 156 },
    proTestContext: DefaultProDetails
}

export const DefaultPayload: Payload = {
    operation: Create.USER,
    commands: [With.PHONECONFIRMATION, With.PASSWORD, With.JOB],
    jobTestContext: DefaultJobDetails
}