export interface ListenerProperties {
    secret: string;
    onAuthorizedCall: Function;
}
export declare const createGithubHookListener: ({ secret, onAuthorizedCall, }: ListenerProperties) => import("express-serve-static-core").Express;
