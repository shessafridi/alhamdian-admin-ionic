export interface LoginUser {
  Role: null;
  access_token: string;
  token_type: null;
  expires_in: number;
  client_id: null;
  userName: string;
  ID: string;
  Accountid: string;
  me: null;
  IsConsumer: boolean;
  IsCustomerPanel: boolean;
  IsAdmin: boolean;
  IsEmployee: boolean;
  issued: null;
  expires: string;
  portalUserProfile: PortalUserProfile;
}

export interface PortalUserProfile {
  Email: null;
  AppUserID: number;
  FullName: string;
  Gender: null;
  MobileNo: null;
  Address: null;
  PushNotificationID: null;
}
