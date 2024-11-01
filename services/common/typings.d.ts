declare namespace API {
  type CheckUserParams = {
    email: string;
  };

  type CheckUserRequest = {
    email: string;
  };

  type CheckUserResponse = {
    exist: boolean;
  };

  type CurrencyConfig = {
    currency_unit: string;
    currency_symbol: string;
  };

  type GetGlobalConfigResponse = {
    site: SiteConfig;
    verify: VeifyConfig;
    register: RegisterConfig;
    invite: InviteConfig;
    currency: CurrencyConfig;
    subscribe: SubscribeConfig;
  };

  type InviteConfig = {
    forced_invite: boolean;
  };

  type LoginResponse = {
    token: string;
  };

  type RegisterConfig = {
    stop_register: boolean;
    enable_email_verify: boolean;
    enable_email_domain_suffix: boolean;
    email_domain_suffix_list: string;
  };

  type ResetPasswordRequest = {
    email: string;
    password: string;
    code?: string;
    cf_token?: string;
  };

  type Response = {
    /** 状态码 */
    code?: number;
    /** 消息 */
    msg?: string;
    /** 数据 */
    data?: Record<string, any>;
  };

  type SendCodeRequest = {
    email: string;
    type: number;
  };

  type SendCodeResponse = {
    status: boolean;
  };

  type SiteConfig = {
    host: string;
    site_name: string;
    site_desc: string;
    site_logo: string;
  };

  type SubscribeConfig = {
    single_model: boolean;
    subscribe_path: string;
    subscribe_domain: string;
    pan_domain: boolean;
  };

  type UserLoginRequest = {
    email: string;
    password: string;
    cf_token?: string;
  };

  type UserRegisterRequest = {
    email: string;
    password: string;
    invite?: string;
    code?: string;
    cf_token?: string;
  };

  type VeifyConfig = {
    turnstile_site_key: string;
    enable_login_verify: boolean;
    enable_register_verify: boolean;
    enable_reset_password_verify: boolean;
  };
}
