/* export interface ContextType {
    jobDate?: string; // example "2020-03-06 14:00"
    businessModel?: number;
    serviceId?: number;
    proBalance?: number;
    quoteId?: number;
    countryId?: number;
}

export interface JobContextType {
    operation?: string;
    commands?: Array<string | undefined>;
    commandContext?: Payload;
    proTestContext?: {};
}
export interface Payload {
    operation?: string;
    commands?: Array<string>;
    commandContext?: ContextType;
    jobTestContext?: JobContextType;
};

export const PayloadBase = {
    operation: "CREATEUSER",
    commands: ["WITHPHONECONFIRMATION", "WITHPASSWORD"],
    commandContext: {
        operation: "",
        commands: [""]
    },
    jobTestContext: {
        operation: "",
        commands: [""]
    },
}
 */


///////////////////////////


export enum Create {
    USER = "CREATEUSER",
    PRO = "CREATEPRO",
    JOB = "CREATEJOB",
    QUOTE = "PLACEQUOTE",
    DEAL = "CREATEDEAL",
    VERIFICATION = "ConfirmPhone"
};

export enum With {
    MODEL = "WITHMODEL",
    AUTHTOKEN = "WITHAUTHTOKEN",
    JOB = "WITHJOB",
    JOBDATE = "WITHJOBDATE",
    REPLACEANSWER = "WITHREPLACEANSWER",
    COUNTRY = "WITHCOUNTRYID",
    JOBSTATUS = "WITHSTATUS",
    BM = "WITHBUSINESSMODEL",
    SERVICEID = "WITHSERVICEID",
    QUOTES = "WITHQUOTES",
    QUOTEPRICE = "WITHQUOTEPRICE",
    QUOTECOUNT = "WITHQUOTECOUNT",
    QUOTEMESSAGE = "WITHQUOTEMESSAGE",
    QUOTEID = "WITHQUOTEID",
    CREDITCARD = "WITHCREDITCARD",
    BALANCE = "WITHBALANCE",
    DEAL = "WITHDEAL",
    PASSWORD = "WITHPASSWORD",
    PHONECONFIRMATION = "WITHPHONECONFIRMATON"
};

export interface ReplaceAnswer {
    controlId: number,
    values: Array<string>
}

export interface commandContext {
    jobStatus?: number,
    jobDate?: string, // example "2020-03-06 14:00"
    replaceAnswer?: Array<ReplaceAnswer>,
    businessModel?: number,
    serviceId?: number,
    quotePrice?: number,
    quoteCount?: number,
    proBalance?: number,
    quoteId?: number,
    quoteInitialMessage?: string,
    countryId?: number,
    authToken?: string,
}

export interface ResponseModel {
    model: string,
    operation?: string,
    accessToken?: string,
    refreshToken?: string,
    password?: string
}
export type corePayload = {
    operation: Create,
    commands?: Array<With>,
    commandContext?: commandContext
}
export type Payload = corePayload &
{
    jobTestContext?: corePayload & {
        proTestContext?: corePayload
    }
}
