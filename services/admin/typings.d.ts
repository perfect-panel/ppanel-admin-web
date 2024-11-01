declare namespace API {
  type Announcement = {
    id: number;
    title: string;
    content: string;
    enable: boolean;
    created_at: number;
    updated_at: number;
  };

  type Application = {
    id: number;
    name: string;
    platform: string;
    subscribe_type: string;
    icon: string;
    url: string;
  };

  type BatchDeleteCouponRequest = {
    ids: number[];
  };

  type BatchDeleteDocumentRequest = {
    ids: number[];
  };

  type BatchDeleteNodeGroupRequest = {
    ids: number[];
  };

  type BatchDeleteNodeRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeGroupRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeRequest = {
    ids: number[];
  };

  type BatchDeleteUserRequest = {
    ids: number[];
  };

  type Coupon = {
    id: number;
    name: string;
    code: string;
    count: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit: number;
    subscribe: number[];
    used_count: number;
    enable: boolean;
    created_at: number;
    updated_at: number;
  };

  type CreateAnnouncementRequest = {
    title: string;
    content: string;
  };

  type CreateApplicationRequest = {
    name: string;
    platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios';
    subscribe_type: string;
    icon: string;
    url: string;
  };

  type CreateCouponRequest = {
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type CreateDocumentRequest = {
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type CreateNodeGroupRequest = {
    name: string;
    description: string;
  };

  type CreateNodeRequest = {
    name: string;
    server_addr: string;
    speed_limit: number;
    traffic_ratio: number;
    groupId: number;
    protocol: string;
    enable: boolean;
    vmess?: Vmess;
    vless?: Vless;
    trojan?: Trojan;
    shadowsocks?: Shadowsocks;
  };

  type CreateOrderRequest = {
    user_id: number;
    type: number;
    price: number;
    amount: number;
    fee_amount: number;
    coupon?: string;
    reduction?: number;
    method?: string;
    trade_no?: string;
    status?: number;
    subscribe_id?: number;
  };

  type CreateSubscribeGroupRequest = {
    name: string;
    description: string;
  };

  type CreateSubscribeRequest = {
    name: string;
    description: string;
    unit_price: number;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
  };

  type CreateTicketFollowRequest = {
    ticket_id: number;
    from: string;
    type: number;
    content: string;
  };

  type CreateUserRequest = {
    email: string;
    password: string;
    product_id: number;
    duration: number;
    referer_user: string;
    refer_code: string;
    balance: number;
    is_admin: boolean;
  };

  type DeleteAnnouncementRequest = {
    id: number;
  };

  type DeleteApplicationRequest = {
    id: number;
  };

  type DeleteCouponRequest = {
    id: number;
  };

  type DeleteDocumentRequest = {
    id: number;
  };

  type DeleteNodeGroupRequest = {
    id: number;
  };

  type DeleteNodeRequest = {
    id: number;
  };

  type DeleteSubscribeGroupRequest = {
    id: number;
  };

  type DeleteSubscribeRequest = {
    id: number;
  };

  type DeleteUserParams = {
    id: number;
  };

  type Document = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    show: boolean;
    created_at: number;
    updated_at: number;
  };

  type Follow = {
    id: number;
    ticket_id: number;
    from: string;
    type: number;
    content: string;
    created_at: number;
  };

  type GetAllPaymentConfigResponse = {
    list: PaymentConfig[];
  };

  type GetAnnouncementListParams = {
    page: number;
    size: number;
    enable?: boolean;
    search?: string;
  };

  type GetAnnouncementListRequest = {
    page: number;
    size: number;
    enable?: boolean;
    search?: string;
  };

  type GetAnnouncementListResponse = {
    total: number;
    list: Announcement[];
  };

  type GetAnnouncementParams = {
    id: number;
  };

  type GetAnnouncementRequest = {
    id: number;
  };

  type GetApplicationResponse = {
    windows: Application[];
    mac: Application[];
    linux: Application[];
    android: Application[];
    ios: Application[];
  };

  type GetCouponListParams = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListRequest = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListResponse = {
    total: number;
    list: Coupon[];
  };

  type GetCurrencyConfigResponse = {
    currency_unit: string;
    currency_symbol: string;
    access_key: string;
  };

  type GetDetailRequest = {
    id: number;
  };

  type GetDocumentDetailRequest = {
    id: number;
  };

  type GetDocumentListParams = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListRequest = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListResponse = {
    total: number;
    list: Document[];
  };

  type GetEmailSmtpConfigResponse = {
    email_smtp_host: string;
    email_smtp_port: number;
    email_smtp_user: string;
    email_smtp_pass: string;
    email_smtp_from: string;
    email_smtp_ssl: boolean;
    verify_email_template: string;
    maintenance_email_template: string;
    expiration_email_template: string;
  };

  type GetInviteConfigResponse = {
    forced_invite: boolean;
    referral_percentage: number;
    only_first_purchase: boolean;
  };

  type GetNodeConfigResponse = {
    node_secret: string;
    node_pull_interval: number;
    node_push_interval: number;
  };

  type GetNodeDetailParams = {
    id: number;
  };

  type GetNodeDetailRequest = {
    id: number;
  };

  type GetNodeGroupListResponse = {
    total: number;
    list: ServerGroup[];
  };

  type GetNodeListParams = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetNodeServerListRequest = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetNodeServerListResponse = {
    total: number;
    list: Server[];
  };

  type GetOrderListParams = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    subscribe_id?: number;
    search?: string;
  };

  type GetOrderListRequest = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    subscribe_id?: number;
    search?: string;
  };

  type GetOrderListResponse = {
    total: number;
    list: Order[];
  };

  type GetRegisterConfigResponse = {
    stop_register: boolean;
    enable_trial: boolean;
    enable_email_verify: boolean;
    enable_email_domain_suffix: boolean;
    email_domain_suffix_list: string;
    enable_ip_register_limit: boolean;
    ip_register_limit: number;
    ip_register_limit_duration: number;
  };

  type GetSiteConfigResponse = {
    host: string;
    site_name: string;
    site_desc: string;
    site_logo: string;
  };

  type GetSubscribeConfigResponse = {
    single_model: boolean;
    subscribe_path: string;
    subscribe_domain: string;
    pan_domain: boolean;
  };

  type GetSubscribeDetailsParams = {
    id: number;
  };

  type GetSubscribeDetailsRequest = {
    id: number;
  };

  type GetSubscribeGroupListResponse = {
    list: SubscribeGroup[];
    total: number;
  };

  type GetSubscribeListParams = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetSubscribeListRequest = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetSubscribeListResponse = {
    list: Subscribe[];
    total: number;
  };

  type GetSubscribeTypeResponse = {
    subscribe_types: string[];
  };

  type GetTelegramConfigResponse = {
    telegram_bot_token: string;
    telegram_group_url: string;
    telegram_notify: boolean;
  };

  type GetTicketListParams = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListRequest = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListResponse = {
    total: number;
    list: Ticket[];
  };

  type GetTicketParams = {
    id: number;
  };

  type GetTicketRequest = {
    id: number;
  };

  type GetTosConfigResponse = {
    tos_content: string;
  };

  type GetUserDetailParams = {
    id: number;
  };

  type GetUserListParams = {
    page: number;
    size: number;
    search?: string;
  };

  type GetUserListRequest = {
    page: number;
    size: number;
    search?: string;
  };

  type GetUserListResponse = {
    total: number;
    list: User[];
  };

  type GetVerifyConfigResponse = {
    turnstile_site_key: string;
    turnstile_secret: string;
    enable_login_verify: boolean;
    enable_register_verify: boolean;
    enable_reset_password_verify: boolean;
  };

  type Order = {
    id: number;
    user_id: number;
    order_no: string;
    type: number;
    price: number;
    amount: number;
    fee_amount: number;
    coupon: string;
    reduction: number;
    method: string;
    trade_no: string;
    status: number;
    subscribe_id: number;
    created_at: number;
    updated_at: number;
  };

  type PaymentConfig = {
    id: number;
    name: string;
    mark: string;
    icon?: string;
    domain?: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent?: number;
    fee_amount?: number;
    enable: boolean;
  };

  type Response = {
    /** 状态码 */
    code?: number;
    /** 消息 */
    msg?: string;
    /** 数据 */
    data?: Record<string, any>;
  };

  type Server = {
    id: number;
    name: string;
    server_addr: string;
    speed_limit: number;
    traffic_ratio: number;
    groupId: number;
    protocol: string;
    enable: boolean;
    vmess?: Vmess;
    vless?: Vless;
    trojan?: Trojan;
    shadowsocks?: Shadowsocks;
    created_at: number;
    updated_at: number;
  };

  type ServerGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type Shadowsocks = {
    method: string;
    port: number;
    enable_relay: boolean;
    relay_host: string;
    relay_port: number;
  };

  type Subscribe = {
    id: number;
    name: string;
    description: string;
    unit_price: number;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
    created_at: number;
    updated_at: number;
  };

  type SubscribeDiscount = {
    months: number;
    discount: number;
  };

  type SubscribeGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type TestEmailSmtpRequest = {
    email: string;
  };

  type Ticket = {
    id: number;
    title: string;
    description: string;
    user_id: number;
    follow?: Follow[];
    status: number;
    created_at: number;
    updated_at: number;
  };

  type Trojan = {
    network: string;
    port: number;
    host: string;
    sni: string;
    allow_insecure: boolean;
    transport: Record<string, any>;
    enable_relay: boolean;
    relay_host: string;
    relay_rort: number;
  };

  type UpdateAnnouncementEnableRequest = {
    id: number;
    enable: boolean;
  };

  type UpdateAnnouncementRequest = {
    id: number;
    title: string;
    content: string;
    enable: boolean;
  };

  type UpdateApplicationRequest = {
    id: number;
    name: string;
    subscribe_type: string;
    icon: string;
    url: string;
  };

  type UpdateCouponRequest = {
    id: number;
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type UpdateCurrencyConfigRequest = {
    currency_unit: string;
    currency_symbol: string;
    access_key: string;
  };

  type UpdateDocumentRequest = {
    id: number;
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type UpdateEmailSmtpConfigRequest = {
    email_smtp_host: string;
    email_smtp_port: number;
    email_smtp_user: string;
    email_smtp_pass: string;
    email_smtp_from: string;
    email_smtp_ssl: boolean;
    email_template: string;
  };

  type UpdateInviteConfigRequest = {
    forced_invite: boolean;
    referral_percentage: number;
    only_first_purchase: boolean;
  };

  type UpdateNodeConfigRequest = {
    node_secret: string;
    node_pull_interval: number;
    node_push_interval: number;
  };

  type UpdateNodeGroupRequest = {
    id: number;
    name: string;
    description: string;
  };

  type UpdateNodeRequest = {
    id: number;
    name: string;
    server_addr: string;
    speed_limit: number;
    traffic_ratio: number;
    groupId: number;
    protocol: string;
    enable: boolean;
    vmess?: Vmess;
    vless?: Vless;
    trojan?: Trojan;
    shadowsocks?: Shadowsocks;
  };

  type UpdateOrderStatusRequest = {
    id: number;
    status: number;
    method?: string;
    trade_no?: string;
  };

  type UpdateRegisterConfigRequest = {
    stop_register: boolean;
    enable_trial: boolean;
    enable_email_verify: boolean;
    enable_email_domain_suffix: boolean;
    email_domain_suffix_list: string;
    enable_ip_register_limit: boolean;
    ip_register_limit: number;
    ip_register_limit_duration: number;
  };

  type UpdateSiteConfigRequest = {
    host: string;
    site_name: string;
    site_desc: string;
    site_logo: string;
  };

  type UpdateSubscribeConfigRequest = {
    single_model: boolean;
    subscribe_path: string;
    subscribe_domain: string;
    pan_domain: boolean;
  };

  type UpdateSubscribeGroupRequest = {
    id: number;
    name: string;
    description: string;
  };

  type UpdateSubscribeRequest = {
    id: number;
    name: string;
    description: string;
    unit_price: number;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
  };

  type UpdateTelegramConfigRequest = {
    telegram_bot_token: string;
    telegram_group_url: string;
    telegram_notify: boolean;
  };

  type UpdateTicketStatusRequest = {
    id: number;
    status: number;
  };

  type UpdateTosConfigRequest = {
    tos_content: string;
  };

  type UpdateUserRequest = {
    id: number;
    email: string;
    password: string;
    avatar: string;
    balance: number;
    telegram: number;
    refer_code: string;
    referer_id: number;
    enable: boolean;
    is_admin: boolean;
    valid_email: boolean;
    enable_email_notify: boolean;
    enable_telegram_notify: boolean;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
  };

  type UpdateVerifyConfigRequest = {
    turnstile_site_key: string;
    turnstile_secret: string;
    enable_login_verify: boolean;
    enable_register_verify: boolean;
    enable_reset_password_verify: boolean;
  };

  type User = {
    id: number;
    email: string;
    avatar: string;
    balance: number;
    telegram: number;
    refer_code: string;
    referer_id: number;
    enable: boolean;
    is_admin?: boolean;
    valid_email: boolean;
    enable_email_notify: boolean;
    enable_telegram_notify: boolean;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    is_del?: boolean;
  };

  type Vless = {
    host: string;
    port: number;
    network: string;
    transport: Record<string, any>;
    security: string;
    security_config: Record<string, any>;
    xtls: string;
    enable_relay: boolean;
    relay_host: string;
    relay_port: number;
  };

  type Vmess = {
    host: string;
    port: number;
    enable_tls: boolean;
    tls_config: Record<string, any>;
    network: string;
    transport: Record<string, any>;
    enable_relay: boolean;
    relay_host: string;
    relay_port: number;
  };
}
