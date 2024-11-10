import { AxiosRequestConfig } from 'axios';

type ClientOptions = {
    apikey: string;
    panel: string;
};
declare class BaseClient {
    protected apikey: string;
    panel: string;
    api: (config: AxiosRequestConfig, errorSet?: Array<{
        code: number;
        message: string;
    }>, ignoredErrors?: Array<string>) => Promise<any>;
    constructor(options: ClientOptions);
}

declare class LocationBuilder {
    private short;
    private long?;
    constructor();
    setShort(short: string): this;
    setDescription(long: string): this;
}

type ServerStatus = 'starting' | 'stopping' | 'online' | 'offline';
declare const ServerSignal: {
    START: string;
    STOP: string;
    RESTART: string;
    KILL: string;
};
type ServerSignalOption = 'start' | 'stop' | 'restart' | 'kill';

interface RawServerDatabaseList {
    object: 'list';
    data: Array<RawServerDatabase$1>;
}
interface RawServerDatabase$1 {
    object: 'server_database';
    attributes: ServerDatabaseAttributes$1;
}
interface ServerDatabaseAttributes$1 {
    readonly id: number;
    readonly server: number;
    readonly host: number;
    readonly database: string;
    readonly username: string;
    readonly remote: string;
    readonly max_connections: number;
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly relationships?: {
        readonly password: {
            readonly object: 'database_password';
            readonly attributes: {
                password: string;
            };
        };
        readonly host?: {
            readonly object: 'database_host';
            readonly attributes: {
                readonly id: number;
                readonly name: string;
                readonly host: string;
                readonly port: number;
                readonly username: string;
                readonly node: number;
                readonly created_at: string;
                readonly updated_at: string;
            };
        };
    };
}

interface RawPanelNest {
    object: 'nest';
    attributes: PanelNestAttributes;
}
interface PanelNestAttributes {
    readonly id: number;
    readonly uuid: string;
    readonly author: string;
    name: string;
    description?: null | string;
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly relationships?: {
        readonly eggs?: RawPanelEggList;
        readonly servers?: RawServerList;
    };
}

interface RawServerVariableList {
    object: 'list';
    data: Array<RawServerVariable>;
}
interface RawServerVariable {
    object: 'server_variable';
    attributes: ServerVariableAttributes;
}
interface ServerVariableAttributes {
    readonly id: number;
    readonly egg_id: number;
    readonly name: string;
    readonly description?: number;
    readonly env_variable: string;
    readonly default_value: string;
    readonly user_viewable: boolean;
    readonly user_editable: boolean;
    readonly rules: string;
    readonly created_at: string | Date;
    updated_at: string | Date;
    server_value: string;
}

interface RawPanelEggList {
    object: 'list';
    data: Array<RawPanelEgg>;
}
interface RawPanelEgg {
    object: 'egg';
    attributes: PanelEggAttributes;
}
interface PanelEggAttributes {
    readonly id: number;
    readonly uuid: string;
    readonly name: string;
    readonly nest: number;
    readonly author: string;
    description?: null | string;
    docker_image: string;
    docker_images: {
        [key: string]: string;
    };
    readonly config: {
        files: {
            [key: string]: {
                parser: string;
                find: {
                    [key: string]: string;
                };
            };
        };
        startup: {
            done: string;
            userInteraction: Array<unknown>;
        };
        stop: string;
        logs: Array<unknown>;
        file_denylist: Array<unknown>;
        extends?: null | string;
    };
    startup: string;
    script: {
        privileged: boolean;
        install: string;
        entry: string;
        container: string;
        extends?: null | string;
    };
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly relationships?: {
        readonly nest?: RawPanelNest;
        readonly servers?: RawServerList;
        readonly variables?: RawServerVariableList;
    };
}

type UserPermission = 'control.restart' | 'control.start' | 'control.stop' | 'user.delete' | 'websocket.connect' | 'control.console' | 'user.create' | 'user.read' | 'user.update' | 'file.create' | 'file.read' | 'file.read-content' | 'file.update' | 'file.delete' | 'file.archive' | 'file.sftp' | 'backup.create' | 'backup.read' | 'backup.delete' | 'backup.download' | 'backup.restore' | 'allocation.read' | 'allocation.create' | 'allocation.update' | 'allocation.delete' | 'startup.read' | 'startup.update' | 'startup.docker-image' | 'database.create' | 'database.read' | 'database.update' | 'database.delete' | 'database.view_password' | 'schedule.create' | 'schedule.read' | 'schedule.update' | 'schedule.delete' | 'settings.rename' | 'settings.reinstall' | 'activity.read';

interface RawServerSubUserList {
    object: 'list';
    data: Array<RawServerSubUser>;
}
interface RawServerSubUser {
    object: 'subuser';
    attributes: ServerSubUserAttributes;
}
interface ServerSubUserAttributes {
    readonly id: number;
    readonly user_id: number;
    readonly server_id: number;
    permissions: Array<UserPermission>;
    readonly created_at: string | Date;
    updated_at: string | Date;
}

interface RawUser$1 {
    object: 'user';
    attributes: UserAttributes$1;
}
interface UserAttributes$1 {
    readonly id: number;
    external_id?: string | null;
    readonly uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: 'en' | string;
    root_admin: boolean;
    readonly '2fa': boolean;
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly relationships?: {
        readonly servers?: RawServerList;
    };
}

interface RawServerList {
    object: 'list';
    data: Array<RawServer$1>;
}
interface RawServer$1 {
    object: 'server';
    attributes: ServerAttributes$1;
}
interface ServerAttributes$1 {
    readonly id: number;
    external_id?: string | null;
    readonly uuid: string;
    identifier: string;
    name: string;
    description: string;
    status: ServerStatus;
    suspended: boolean;
    limits: {
        memory: 0 | number;
        swap: 0 | number;
        disk: 0 | number;
        io: 500 | number;
        cpu: 0 | number;
        threads: null | string;
        oom_disabled: true | boolean;
    };
    feature_limits: {
        databases: 0 | number;
        allocations: 0 | number;
        backups: 0 | number;
    };
    user: number;
    node: number;
    allocation: number;
    readonly nest: number;
    readonly egg: number;
    container: {
        startup_command: string;
        image: string;
        readonly installed: 1 | 0;
        environment: {
            [key: string]: string | number | boolean | null;
        };
    };
    updated_at: string | Date;
    readonly created_at: string | Date;
    readonly relationships?: {
        readonly allocations?: RawNodeAllocationList;
        readonly user?: RawUser$1;
        readonly subusers?: RawServerSubUserList;
        readonly nest?: RawPanelNest;
        readonly egg?: RawPanelEgg;
        readonly variables?: RawServerVariableList;
        readonly location?: RawLocation;
        readonly node?: RawPanelNode;
        readonly databases?: RawServerDatabaseList;
    };
}

interface RawNodeAllocationList {
    object: 'list';
    data: Array<RawNodeAllocation>;
}
interface RawNodeAllocation {
    object: 'allocation';
    attributes: NodeAllocationAttributes;
}
interface NodeAllocationAttributes {
    readonly id: number;
    readonly ip: string;
    readonly alias?: null | string;
    readonly port: number;
    notes?: null | string;
    assigned: boolean;
    is_default?: boolean;
    readonly relationships?: {
        node?: RawPanelNode;
        server?: RawServer$1;
    };
}

interface RawPanelNodeList {
    object: 'list';
    data: Array<RawPanelNode>;
}
interface RawPanelNode {
    object: 'node';
    attributes: PanelNodeAttributes;
}
interface PanelNodeAttributes {
    readonly id: number;
    readonly uuid: string;
    public: boolean;
    name: string;
    description?: null | string;
    readonly location_id: number;
    fqdn: string;
    scheme: 'http' | 'https';
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: 100 | number;
    daemon_listen: 8080 | number;
    daemon_sftp: 2022 | number;
    daemon_base: '/var/lib/pterodactyl/volumes' | string;
    readonly created_at: string | Date;
    updated_at: string | Date;
    allocated_resources: {
        memory: number;
        disk: number;
    };
    readonly relationships?: {
        readonly allocations?: RawNodeAllocationList;
        readonly location?: RawLocation;
        readonly servers?: RawServerList;
    };
}

interface RawLocation {
    object: 'location';
    attributes: LocationAttributes;
}
interface LocationAttributes {
    readonly id: number;
    short: string;
    long?: null | string;
    updated_at: string | Date;
    readonly created_at: string | Date;
    readonly relationships?: {
        nodes?: RawPanelNodeList;
        servers?: RawServerList;
    };
}

declare class PanelLocation implements LocationAttributes {
    readonly id: number;
    short: string;
    long?: string | null;
    updated_at: Date;
    readonly created_at: Date;
    constructor(applicationClient: ApplicationClient, locationProps: RawLocation);
    private updateProps;
    private updateThis;
    /**
     * Set the new short name for this location
     * @param short The new name
     */
    setShort(short: string): Promise<void>;
    /**
     * Set the new description for this location
     * @param long The new description, can be an empty string
     */
    setDescription(long: string): Promise<void>;
    /**
     * Delete this location
     */
    delete(): Promise<void>;
}

declare class NodeBuilder {
    private name;
    private description?;
    private location_id;
    private public;
    private fqdn;
    private scheme;
    private behind_proxy;
    private daemonBase;
    private memory;
    private memory_overallocate;
    private disk;
    private disk_overallocate;
    private daemon_listen;
    private daemon_sftp;
    constructor();
    /**
     * Set the name for this node
     * @required
     */
    setName(name: string): NodeBuilder;
    /**
     * Set the description for this node
     */
    setDescription(description: string): NodeBuilder;
    /**
     * Set the location id for this node
     * @required
     */
    setLocationId(locationId: number): NodeBuilder;
    /**
     * Set the location by PanelLocation
     * @required
     */
    setLocation(location: PanelLocation): NodeBuilder;
    /**
     * Set the public status for this node
     * @required
     */
    setPublic(publicNode: boolean): NodeBuilder;
    /**
     * Set the fqdn for this node
     * Should be a domain or ip-address
     * @required
     */
    setFqdn(fqdn: string): NodeBuilder;
    /**
     * Set the scheme for this node
     * If you use an ip-address you can only use http
     * @required
     */
    setScheme(scheme: 'https' | 'http'): NodeBuilder;
    /**
     * Set the behind proxy for this node
     * @required
     */
    setBehindProxy(behindProxy: boolean): NodeBuilder;
    /**
     * Set the daemon base for this node
     * @default daemonBase /var/lib/pterodactyl/volumes
     * @optional
     */
    setDaemonBase(daemonBase: string): NodeBuilder;
    /**
     * Set the memory for this node (in MiB)
     * @required
     */
    setMemory(memory: number): NodeBuilder;
    /**
     * Set the memory overallocate for this node (in %)
     * Use -1 to disable overallocation check
     * Use 0 to prevent new servers if memory limit is reached
     * @default memoryOverallocate 0
     * @required
     */
    setMemoryOverallocate(memoryOverallocate: -1 | 0 | number): NodeBuilder;
    /**
     * Set the disk for this node (in MiB)
     * @required
     */
    setDisk(disk: number): NodeBuilder;
    /**
     * Set the disk overallocate for this node (in %)
     * Use -1 to disable overallocation check
     * Use 0 to prevent new servers if disk limit is reached
     * @default diskOverallocate 0
     * @optional
     */
    setDiskOverallocate(diskOverallocate: number): NodeBuilder;
    /**
     * Set the daemon port
     * @default daemonPort 8080
     * @optional
     */
    setDaemonPort(daemonPort: number): NodeBuilder;
    /**
     * Set the daemon sftp port
     * @default daemon_sftpPort 2022
     * @optional
     */
    setDaemonSftp(daemon_sftpPort: number): NodeBuilder;
}

declare class DatabaseBuilder {
    private database;
    private remote;
    constructor();
    /**
     * Set the name for this database
     */
    setName(name: string): DatabaseBuilder;
    /**
     * Define which ip addresses will be allowed to connect to your database.
     * @default remote % (every)
     */
    setAllowedRemote(remote: string): DatabaseBuilder;
}

declare class AllocationBuilder {
    private ip;
    private ports;
    private alias?;
    constructor();
    /**
     * Set the ip address for this allocation
     * @argument ip Ip address to bind on
     */
    setIp(ip: string): AllocationBuilder;
    /**
     * Add a port to this allocation
     * @argument port Port to bind on | Range: 1024 <= 65535
     */
    addPort(port: number | string): AllocationBuilder;
    /**
     * Add ports to this allocation
     * You can use 25565-25570 as range
     * @argument ports Ports to bin on | Range: 1024 <= 65535
     */
    addPorts(ports: Array<number | string>): AllocationBuilder;
    /**
     * Set the alias for this allocation
     * @argument alias Alias to bind on
     */
    setAlias(alias: string): AllocationBuilder;
}

interface RawNodeConfiguration {
    readonly debug: boolean;
    readonly uuid: string;
    readonly token_id: string;
    readonly token: string;
    readonly api: {
        readonly host: string;
        readonly port: 8080 | number;
        readonly ssl: {
            readonly enabled: boolean;
            readonly cert: string;
            readonly key: string;
        };
        readonly upload_limit: number;
    };
    readonly system: {
        readonly data: string;
        readonly sftp: {
            readonly bind_port: 2022 | number;
        };
    };
    readonly allowed_mounts: Array<unknown>;
    readonly remote: string;
}

declare class PanelNode implements PanelNodeAttributes {
    readonly id: number;
    readonly uuid: string;
    public: boolean;
    name: string;
    description?: string | null;
    location_id: number;
    fqdn: string;
    scheme: 'http' | 'https';
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: 100 | number;
    daemon_listen: 8080 | number;
    daemon_sftp: 2022 | number;
    daemon_base: string;
    readonly created_at: Date;
    updated_at: Date;
    readonly allocated_resources: {
        memory: number;
        disk: number;
    };
    nodeConfiguration?: RawNodeConfiguration;
    allocations?: Array<NodeAllocation>;
    location?: PanelLocation;
    servers?: Array<PanelServer>;
    constructor(applicationClient: ApplicationClient, nodeProps: RawPanelNode);
    /**
     * Get the config of this node
     */
    getConfiguration(): Promise<RawNodeConfiguration>;
    private updateProps;
    private updateThisNode;
    /**
     * Update this nodes name
     * @param name The new name of this node
     */
    setName(name: string): Promise<void>;
    /**
     * Update this nodes description
     * @param description The new description of this node
     */
    setDescription(description: string): Promise<void>;
    /**
     * Update the location for this nodes
     * @param location The new location of this node
     */
    setLocation(location: PanelLocation | number): Promise<void>;
    /**
     * Update weather this node is public or not
     * @param isPublic Should this node be public
     */
    setPublic(isPublic: boolean): Promise<void>;
    /**
     * Update this nodes fqdn
     * @param fqdn The new fqdn of this node
     */
    setFqdn(fqdn: string): Promise<void>;
    /**
     * Update this nodes scheme
     * @param scheme The new scheme of this node
     */
    setScheme(scheme: 'http' | 'https'): Promise<void>;
    /**
     * Update weather this node is behind a proxy or not
     * @param behindProxy Is this node behind a proxy
     */
    setBehindProxy(behindProxy: boolean): Promise<void>;
    /**
     * Update this nodes maintenance state
     * @param maintenanceActive Should this node be in maintenance mode
     */
    setMaintenance(maintenanceActive: boolean): Promise<void>;
    /**
     * Update this nodes memory
     * @param memory The new memory limit of this node (in MiB)
     */
    setMemory(memory: number): Promise<void>;
    /**
     * Set the memory overallocate for this node
     * Use -1 to disable overallocation check
     * Use 0 to prevent new servers if memory limit is reached
     * @param overAllocation in %
     */
    setMemoryOverAllocation(overAllocation: -1 | 0 | number): Promise<void>;
    /**
     * Update this nodes disk
     * @param disk The new disk limit of this node (in MiB)
     */
    setDisk(disk: number): Promise<void>;
    /**
     * Set the disk overallocate for this node
     * Use -1 to disable overallocation check
     * Use 0 to prevent new servers if disk limit is reached
     * @param overAllocation in %
     */
    setDiskOverAllocation(overAllocation: -1 | 0 | number): Promise<void>;
    /**
     * Update this nodes upload size limit
     * [Cloudflare allows 100 MiB on the free tier]
     * @param limit The new upload size limit of this node (in MiB)
     */
    setUploadSizeLimit(limit: 100 | number): Promise<void>;
    /**
     * Set the daemon port for this node
     *
     * -----------------------------
     * If you use Cloudflare with the proxy feature, you'll need to use 8443
     * More information: https://pterodactyl.io/wings/1.0/configuration.html#enabling-cloudflare-proxy
     * -----------------------------
     * @param port The new port for the daemon
     * @default port 8080
     */
    setDaemonPort(port: number): Promise<void>;
    /**
     * Set the daemon sftp port for this node
     * DO NOT use the same port as your servers SSH port!
     * ---------------------------------
     * If you use Cloudflare with the proxy feature, you'll need to use the enterprise plan!
     * More information: https://pterodactyl.io/wings/1.0/configuration.html#enabling-cloudflare-proxy
     * ---------------------------------
     * @param port The new port for the daemon sftp
     * @default port 2022
     */
    setDaemonSftpPort(port: number): Promise<void>;
    /**
     * Resets the Daemon Master Key
     * This key is used for communication between the panel and the node(s)
     * Pterodactyl suggests to rotate this secret regularly
     */
    resetDaemonMasterKey(): Promise<void>;
    /**
     * Delete this node
     */
    delete(): Promise<void>;
    /**
     * Get the allocations of this node
     */
    getAllocations(): Promise<Array<NodeAllocation>>;
    /**
     * Create a allocation for this node
     */
    createAllocation(allocationProperties: AllocationBuilder): Promise<void>;
}

declare class NodeAllocation implements NodeAllocationAttributes {
    protected nodeId: number;
    readonly id: number;
    readonly ip: string;
    readonly alias?: null | string;
    readonly port: number;
    readonly notes?: null | string;
    readonly assigned: boolean;
    constructor(applicationClient: ApplicationClient, allocationProps: RawNodeAllocation, node: PanelNode | number);
    /**
     * Delete this allocation
     */
    delete(): Promise<void>;
}

declare class PanelUser implements UserAttributes$1 {
    readonly id: number;
    external_id?: string | null;
    readonly uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: 'en' | string;
    root_admin: boolean;
    readonly '2fa': boolean;
    readonly created_at: Date;
    updated_at: Date;
    servers?: Array<PanelServer>;
    constructor(applicationClient: ApplicationClient, userData: RawUser$1);
    /**
     * Delete this user from the panel
     */
    delete(): Promise<void>;
    private updateProps;
    private updateThisUser;
    /**
     * Update this user's email address on the panel
     * @param email The new email address
     */
    setEmail(email: string): Promise<void>;
    /**
     * Update this user's username on the panel
     * @param username The new username
     */
    setUsername(username: string): Promise<void>;
    /**
     * Update this user's first name on the panel
     * @param firstName The new first name
     */
    setFirstName(firstName: string): Promise<void>;
    /**
     * Update this user's last name on the panel
     * @param lastName The new last name
     */
    setLastName(lastName: string): Promise<void>;
    /**
     * Update this user's language on the panel
     * @param language The new language
     * @default language en
     */
    setLanguage(language: string): Promise<void>;
    /**
     * Update this user's password on the panel
     * @param password The new password
     */
    setPassword(password: string): Promise<void>;
    /**
     * Update this user's admin status on the panel
     * @param panelAdmin Should the user be an admin
     * @default panelAdmin false
     */
    setPanelAdmin(panelAdmin: boolean): Promise<void>;
}

declare class ServerDatabase implements ServerDatabaseAttributes$1 {
    readonly id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    max_connections: number;
    created_at: Date;
    updated_at: Date;
    password?: string;
    dbHost?: {
        id: number;
        name: string;
        host: string;
        port: number;
        username: string;
        node: number;
        created_at: Date;
        updated_at: Date;
    };
    constructor(applicationClient: ApplicationClient, dbProperties: RawServerDatabase$1);
    /**
     * Resets the password for the database
     */
    resetPassword(): Promise<void>;
    /**
     * Delete this database
     */
    delete(): Promise<void>;
}

declare class ServerSubUser implements ServerSubUserAttributes {
    id: number;
    user_id: number;
    server_id: number;
    permissions: Array<UserPermission>;
    created_at: Date;
    updated_at: Date;
    constructor(data: RawServerSubUser);
}

declare class ServerVariable implements ServerVariableAttributes {
    readonly id: number;
    readonly egg_id: number;
    readonly name: string;
    readonly description?: number | undefined;
    readonly env_variable: string;
    readonly default_value: string;
    readonly user_viewable: boolean;
    readonly user_editable: boolean;
    readonly rules: string;
    readonly created_at: string | Date;
    updated_at: string | Date;
    server_value: string;
    constructor(variableProps: RawServerVariable);
}

declare class PanelServer implements ServerAttributes$1 {
    readonly id: number;
    external_id?: null | string;
    readonly uuid: string;
    identifier: string;
    name: string;
    description: string;
    status: ServerStatus;
    suspended: boolean;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
        threads: null | string;
        oom_disabled: boolean;
    };
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    user: number;
    node: number;
    allocation: number;
    nest: number;
    egg: number;
    eggData?: RawPanelEgg;
    container: {
        startup_command: string;
        image: string;
        installed: 0 | 1;
        environment: {
            [key: string]: string | number | boolean | null;
        };
    };
    updated_at: Date;
    readonly created_at: Date;
    readonly allocations?: Array<NodeAllocation>;
    readonly owner?: PanelUser;
    readonly subusers?: Array<ServerSubUser>;
    readonly associatedNest?: Nest;
    readonly associatedEgg?: Egg;
    readonly variables?: Array<ServerVariable>;
    readonly location?: PanelLocation;
    readonly associatedNode?: PanelNode;
    readonly databases?: Array<ServerDatabase>;
    constructor(applicationClient: ApplicationClient, serverProperties: RawServer$1);
    private updateEggData;
    private updateProps;
    private updateThisProps;
    /**
     * Set the name for this server
     * @param name The new name for this server
     */
    setName(name: string): Promise<void>;
    /**
     * Set the external id for this server
     * @param externalId The new external id for this server
     */
    setExternalId(externalId: string): Promise<void>;
    /**
     * Set the owner for this server
     * @param owner The ownerId or the User object
     */
    setOwner(owner: number | PanelUser): Promise<void>;
    /**
     * Set the description for this server
     * @param description The new description for this server
     */
    setDescription(description: string): Promise<void>;
    private updateBuild;
    private updateThisBuild;
    /**
     * Set the maximum cpu usage for this server
     * Set this to 0 for no cpu limit
     * ------------------------
     * If you have 4 cores and want to allow to use all of them you'll need to use 400
     * Example: 4 * 100 = 400 | Cores * 100 = Max for this node
     * ------------------------
     * @param limit The new cpu limit in %
     */
    setCpuLimit(limit: number): Promise<void>;
    /**
     * Set which cores can be used by a server
     * Example: 0; 1-3; 4,5,6;
     * @param limit The new cpu limit in %
     */
    setCpuPinning(pinning: Array<string | number> | string): Promise<void>;
    /**
     * Set the new memory limit
     * @param limit The new memory limit in MiB
     */
    setMemoryLimit(limit: number): Promise<void>;
    /**
     * Set the new swap limit
     * @param limit The new swap limit in MiB
     */
    setSwapLimit(limit: number): Promise<void>;
    /**
     * Set the new disk limit
     * @param limit The new disk limit in MiB
     */
    setDiskLimit(limit: number): Promise<void>;
    /**
     * [ADVANCED]
     * Set the io limit for this server
     * Documentation: https://docs.docker.com/engine/reference/run/#block-io-bandwidth-blkio-constraint
     * @param limit The new io limit, number between 10 and 1000
     */
    setIoLimit(limit: number): Promise<void>;
    /**
     * Enable the OOM killer
     * This will kill the server if it exceeds the memory limit
     * This may cause the server processes to exit unexpectedly
     * This CAN cause to data corruption
     * @param active Should the oom killer be active
     */
    setOomKillerState(active: boolean): Promise<void>;
    /**
     * Set the new database limit
     * @param limit How many databases can be created for this server
     */
    setDatabaseLimit(limit: number): Promise<void>;
    /**
     * Set the new backup limit
     * @param limit How many backups can be created for this server
     */
    setBackupLimit(limit: number): Promise<void>;
    /**
     * Set the new allocation limit
     * @param limit How many allocations can be created for this server
     */
    setAllocationLimit(limit: number): Promise<void>;
    /**
     * Add a allocation to this server
     * @param allocation The allocation id or the NodeAllocation object
     */
    addAllocation(allocation: number | NodeAllocation): Promise<void>;
    /**
     * Remove a allocation from this server
     * @param allocation The allocation id or the NodeAllocation object
     */
    removeAllocation(allocation: number | NodeAllocation): Promise<void>;
    private updateStartup;
    private updateThisStartup;
    /**
     * Set the startup command with which the server will start
     * This can include environment vars via {{ VAR_NAME }}
     * @default startup This will use the default startup command if you set the egg via .setEgg(egg: PanelEgg)
     */
    setStartupCommand(startup: string): Promise<void>;
    /**
     * Set the new nest for this server
     * @param nest The new nest for this server
     * @param egg The new egg for this server
     */
    setNestAndEgg(nest: number | Nest, egg: number | Egg): Promise<void>;
    /**
     * Skip install script
     * @param skip Whether the install script should be skipped
     */
    setSkipInstall(skip: boolean): Promise<void>;
    /**
     * Set the docker image for this server
     * @param image The new image for this container
     */
    setDockerImage(image: string): Promise<void>;
    /**
     * Set the environment vars with which the server will start
     * @param environment Overwrites all current variables
     */
    setEnvironment(environment: {
        [environment: string]: string;
    }): Promise<void>;
    /**
     * Add environment vars with which the server will start
     * @param environment Add a variable and value to the current variables
     */
    addEnvironmentVariable(key: string, value: string): Promise<void>;
    /**
     * Set the custom docker image for this server
     * @param image The new image for this container
     */
    setCustomDockerImage(image: string): Promise<void>;
    /**
     * Suspend this server
     */
    suspend(): Promise<void>;
    /**
     * Unsuspend this server
     */
    unsuspend(): Promise<void>;
    /**
     * Reinstall this server
     */
    reinstall(): Promise<void>;
    /**
     * Delete this server
     * @param force Should the server be force-deleted
     */
    delete(force?: boolean): Promise<void>;
    /**
     * Get the databases for this server
     */
    getDatabases(): Promise<Array<ServerDatabase>>;
    /**
     * Get a database for this server
     */
    getDatabase(databaseId: number): Promise<ServerDatabase>;
    /**
     * Create a database for this server
     */
    createDatabase(databaseCreateProperties: DatabaseBuilder): Promise<void>;
}

declare class Nest implements PanelNestAttributes {
    readonly id: number;
    readonly uuid: string;
    readonly author: string;
    name: string;
    description?: string | null;
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly associatedEggs?: Array<Egg>;
    readonly associatedServers?: Array<PanelServer>;
    constructor(applicationClient: ApplicationClient, nestProps: RawPanelNest);
}

declare class Egg implements PanelEggAttributes {
    readonly id: number;
    readonly uuid: string;
    readonly name: string;
    readonly nest: number;
    readonly author: string;
    description?: string | null | undefined;
    docker_image: string;
    docker_images: {
        [key: string]: string;
    };
    readonly config: {
        files: {
            [key: string]: {
                parser: string;
                find: {
                    [key: string]: string;
                };
            };
        };
        startup: {
            done: string;
            userInteraction: unknown[];
        };
        stop: string;
        logs: unknown[];
        file_denylist: unknown[];
        extends?: string | null | undefined;
    };
    startup: string;
    script: {
        privileged: boolean;
        install: string;
        entry: string;
        container: string;
        extends?: string | null | undefined;
    };
    readonly created_at: string | Date;
    updated_at: string | Date;
    parentNest?: Nest;
    associatedServers?: Array<PanelServer>;
    associatedVariables?: Array<ServerVariable>;
    constructor(applicationClient: ApplicationClient, eggProps: RawPanelEgg);
}

declare class ServerBuilder {
    private name;
    private user;
    private description?;
    private start_on_completion;
    private node_id?;
    private allocation;
    private feature_limits;
    private limits;
    private oom_disabled;
    private nest_id?;
    private egg;
    private skip_scripts;
    private docker_image;
    private custom_image?;
    private startup;
    private environment;
    constructor();
    /**
     * @param name The name for this server
     */
    setName(name: string): ServerBuilder;
    /**
     * @optional @param description Set the description for this server
     */
    setDescription(description: string): ServerBuilder;
    /**
     * @param user The user that will own this server
     */
    setOwner(user: PanelUser): ServerBuilder;
    /**
     * @param user The user's id that will own this server
     */
    setOwnerId(user: number): ServerBuilder;
    /**
     * Should the server autostart when the server is done with the install process
     * @optional
     * @default start true
     */
    startServerWhenInstalled(start: boolean): ServerBuilder;
    /**
     * Set the node for this server
     * @optional
     * @deprecated You'll set the node by the allocation (id)
     */
    setNodeId(node_id: number): ServerBuilder;
    /**
     * The default allocation for this server
     * @param allocation The allocation you want to assign
     */
    setAllocation(allocation: NodeAllocation): ServerBuilder;
    /**
     * The default allocation for this server
     * @param allocation_id The allocation id you want to assign
     */
    setAllocationId(allocation_id: number): ServerBuilder;
    /**
     * Add additional allocations to this server
     * @optional
     */
    setAdditionalAllocations(allocations: Array<NodeAllocation>): ServerBuilder;
    /**
     * Add additional allocation ids to this server
     * @optional
     */
    setAdditionalAllocationIds(allocationIds: Array<number>): ServerBuilder;
    /**
     * Add a allocation id to this server
     * @optional
     */
    addAdditionalAllocationId(id: number): ServerBuilder;
    /**
     * Add a allocation id to this server
     * @optional
     */
    addAdditionalAllocation(allocation: NodeAllocation): ServerBuilder;
    addSplits(splits: number): ServerBuilder;
    /**
     * Set how many databases can be created for this server
     * @default 0
     */
    setDatabaseLimit(maxDatabases: number): ServerBuilder;
    /**
     * Set how many allocations can be created for this server
     * @default 0
     */
    setAllocationLimit(maxAllocations: number): ServerBuilder;
    /**
     * Set how many backups can be created for this server
     * @default 0
     */
    setBackupLimit(maxBackups: number): ServerBuilder;
    /**
     * Set the maximum cpu usage for this server
     * Set this to 0 for no cpu limit
     * ------------------------
     * If you have 4 cores and want to allow to use all of them you'll need to use 400
     * Example: 4 * 100 = 400 | Cores * 100 = Max for this node
     * ------------------------
     * @param cpuLimit in %
     * @default 0
     */
    setCpuLimit(cpuLimit: number): ServerBuilder;
    /**
     * Set which cores can be used by a server
     * Example: 0; 1-3; 4,5,6;
     * @optional
     * @default undefined
     */
    setCpuPinning(pinning: Array<number | string> | string): ServerBuilder;
    /**
     * Set the memory limit for this server
     * @param memoryLimit in MiB
     * @default 0
     */
    setMemoryLimit(memoryLimit: number): ServerBuilder;
    /**
     * Set the swap limit for this server
     * @param swapLimit in MiB
     * @default 0
     */
    setSwapLimit(swapLimit: number): ServerBuilder;
    /**
     * Set the disk limit for this server
     * @param diskLimit in MiB
     * @default 0
     */
    setDiskLimit(diskLimit: number): ServerBuilder;
    /**
     * [ADVANCED]
     * Set the io limit for this server
     * Documentation: https://docs.docker.com/engine/reference/run/#block-io-bandwidth-blkio-constraint
     * @param ioLimit between 10 and 1000
     * @default 0
     */
    setIoLimit(ioLimit: number): ServerBuilder;
    /**
     * Enable the OOM killer
     * This will kill the server if it exceeds the memory limit
     * This may cause the server processes to exit unexpectedly
     * This CAN cause to data corruption
     * @default false
     */
    enableOOM(enabled: boolean): ServerBuilder;
    /**
     * Set the nest id for this server
     * @deprecated This will be set by the egg (id)
     */
    setNestId(nest_id: number): ServerBuilder;
    /**
     * Set the egg for this server
     * When not set as id this will also set the docker image, the startup command and the variables to their default values
     * @param egg The egg id or the egg as object
     */
    setEgg(egg: number | Egg): ServerBuilder;
    /**
     * Manually set the egg id
     */
    setEggId(egg: number): ServerBuilder;
    /**
     * Should the server skip the install process
     * Using this will likely prevent the server from starting after the creation
     * @default false
     */
    setSkipInstall(skip: boolean): ServerBuilder;
    /**
     * Set the docker image to in which the server will start
     * @default image This will use the default image if you set the egg via .setEgg(egg: PanelEgg)
     */
    setDockerImage(image: string): ServerBuilder;
    /**
     * Set a custom docker image
     * @default custom_image undefined
     */
    setCustomImage(custom_image: string): ServerBuilder;
    /**
     * Set the startup command with which the server will start
     * This can include environment vars via {{ VAR_NAME }}
     * @default startup This will use the default startup command if you set the egg via .setEgg(egg: PanelEgg)
     */
    setStartup(startup: string): ServerBuilder;
    /**
     * Set the environment vars with which the server will start
     * @default environment This will use the default environment if you set the egg via .setEgg(egg: PanelEgg)
     */
    setEnvironment(environment: {
        [environment: string]: string;
    }): ServerBuilder;
    /**
     * Add environment vars with which the server will start
     * @default environment This will use the default environment if you set the egg via .setEgg(egg: PanelEgg)
     */
    addEnvironmentVariable(key: string, value: string): ServerBuilder;
}

declare class UserBuilder {
    private email;
    private username;
    private first_name;
    private last_name;
    private password?;
    private root_admin?;
    constructor();
    /**
     * The email address of the user
     * Must be valid & unique!
     * @required
     */
    setEmail(email: string): UserBuilder;
    /**
     * The username of the user
     * Must be unique!
     * @required
     */
    setUsername(username: string): UserBuilder;
    /**
     * The first name of the user
     * @required
     */
    setFirstName(first_name: string): UserBuilder;
    /**
     * The last name of the user
     * @required
     */
    setLastName(last_name: string): UserBuilder;
    /**
     * The password for a user
     * If unset, the user will receive a setup email
     * @optional
     */
    setPassword(password: string): UserBuilder;
    /**
     * Should the user be an administrator
     * @optional
     */
    setAdmin(admin: boolean): UserBuilder;
}

declare class ApplicationClient extends BaseClient {
    constructor(options: ClientOptions);
    /**
     * Get all users associated to the panel
     * @param filter Filter users by email, uuid, username and/or externalId
     * @param sortBy Sort users by id oder uuid
     * @param reverseSort Reverse the sort @requires sortBy
     */
    getUsers(filter?: {
        email?: string;
        uuid?: string;
        username?: string;
        externalId?: string;
    }, sortBy?: 'id' | 'uuid', reverseSort?: boolean): Promise<Array<PanelUser>>;
    /**
     * Get a user via their userId
     * @param userId The id of a user
     */
    getUser(userId: number): Promise<PanelUser>;
    /**
     * Get a user via their external id
     * @param externalId The external id of a user
     */
    getExternalUser(externalId: string): Promise<PanelUser>;
    /**
     * Create a user
     * @param userProperties Construct a user via new UserBuilder()
     */
    createUser(userProperties: UserBuilder): Promise<PanelUser>;
    /**
     * Get all nodes of a panel
     */
    getNodes(): Promise<Array<PanelNode>>;
    /**
     * Get a specific Node by nodeId
     * @param nodeId The id of the specific node
     */
    getNode(nodeId: number): Promise<PanelNode>;
    /**
     * Create a node
     * @param nodeProperties The properties for the new node
     */
    createNode(nodeProperties: NodeBuilder): Promise<PanelNode>;
    /**
     * Get the locations of this panel
     */
    getLocations(): Promise<Array<PanelLocation>>;
    /**
     * Get a location of this panel
     */
    getLocation(locationId: number): Promise<PanelLocation>;
    /**
     * Create a location for this panel
     */
    createLocation(locationProperties: LocationBuilder): Promise<PanelLocation>;
    /**
     * Get servers for this panel
     */
    getServers(): Promise<Array<PanelServer>>;
    /**
     * Get a server for this panel
     * @param serverId The target server Id
     */
    getServer(serverId: number): Promise<PanelServer>;
    /**
     * Get a server by their external id
     * @prop externalId The target servers external id
     */
    getExternalServer(externalId: string): Promise<PanelServer>;
    /**
     * Create a server
     */
    createServer(serverProperties: ServerBuilder): Promise<PanelServer>;
    /**
     * Get the nests of this panel
     */
    getNests(): Promise<Array<Nest>>;
    /**
     * Get a nest by id of this panel
     * @param nestId The id of the nest you want to get
     */
    getNest(nestId: number): Promise<Nest>;
    /**
     * Get the eggs of this panel
     * @param nestId The if of the nest you want to get the eggs from
     */
    getEggs(nestId: number): Promise<Array<Egg>>;
    /**
     * Get a specific egg of this panel
     * @param nestId The if of the nest you want to get the egg from
     * @param eggId The egg you want to get
     */
    getEgg(nestId: number, eggId: number): Promise<Egg>;
}

interface RawAllocationList {
    object: 'list';
    data: Array<RawAllocation>;
}
interface RawAllocation {
    object: 'allocation';
    attributes: AllocationAttributes;
}
interface AllocationAttributes {
    readonly id: number;
    readonly ip: string;
    readonly ip_alias?: string;
    readonly port: number;
    notes?: null | string;
    is_default: boolean;
}

declare class BackupBuilder {
    name: string;
    ignored: string;
    is_locked: boolean;
    constructor();
    /**
     * Sets the name of the backup.
     * @param name The name of the backup.
     */
    setName(name: string): BackupBuilder;
    /**
     * Sets the ignored files or directories for the backup.
     * @param ignored An array of strings or a single string representing the ignored files or directories.
     */
    setIgnored(ignored: Array<string> | string): BackupBuilder;
    /**
     * Adds a file or directory to the ignored list for the backup.
     * @param ignored The file or directory to ignore.
     */
    addIgnored(ignored: string): BackupBuilder;
    /**
     * Sets whether the backup is locked.
     * @param is_locked Whether the backup is locked.
     */
    setLocked(is_locked: boolean): BackupBuilder;
}

declare class ScheduleBuilder {
    is_active: boolean;
    only_when_online: boolean;
    name: string;
    minute: string;
    hour: string;
    day_of_month: string;
    month: string;
    day_of_week: string;
    constructor();
    /**
     * Sets whether the schedule is active.
     * @param isActive Whether the schedule is active.
     */
    setActive(isActive: boolean): ScheduleBuilder;
    /**
     * Sets whether the schedule should only run when the server is online.
     * @param onlyWhenOnline Whether the schedule should only run when the server is online.
     */
    setOnlyWhenOnline(onlyWhenOnline: boolean): ScheduleBuilder;
    /**
     * Sets the name of the schedule.
     * @param name The name of the schedule.
     */
    setName(name: string): ScheduleBuilder;
    /**
     * Sets the minute of the schedule.
     * Example: *\/5: Every 5 minutes,
     * 0-59: Range of minutes
     * 1,3,5: Specific minutes
     * *\/5: Every 5 minutes
     * @param minute The minute of the schedule.
     */
    setMinute(minute: string): ScheduleBuilder;
    /**
     * Sets the hour of the schedule.
     * Example: *\/5: Every 5 hours
     * 0-23: Range of hours
     * 1,3,5: Specific hours
     * *\/5: Every 5 hours
     * @param hour The hour of the schedule.
     */
    setHour(hour: string): ScheduleBuilder;
    /**
     * Sets the day of the month of the schedule.
     * Example: *\/5: Every 5th day of the month
     * 1-31: Range of days
     * 1,3,5: Specific days
     * *\/5: Every 5th day of the month
     * @param dayOfMonth The day of the month of the schedule.
     */
    setDayOfMonth(dayOfMonth: string): ScheduleBuilder;
    /**
     * Sets the month of the schedule.
     * Example: *\/5: Every 5 months
     * 1-12: Range of months
     * 1,3,5: Specific months
     * *\/5: Every 5 months
     * @param month The month of the schedule.
     */
    setMonth(month: string): ScheduleBuilder;
    /**
     * Sets the day of the week of the schedule.
     * Example: *\/5: Every 5th day of the week
     * 0-6: Range of days (0 = Sunday, 6 = Saturday)
     * 0,2,4: Specific days
     * *\/5: Every 5th day of the week
     * @param dayOfWeek The day of the week of the schedule.
     */
    setDayOfWeek(dayOfWeek: string): ScheduleBuilder;
}

declare class SubUserBuilder {
    email: string;
    permissions: Array<UserPermission>;
    constructor();
    /**
     * Set the email address for the new subuser
     * If the subuser has no account, the'll receive a setup email
     */
    setEmail(email: string): SubUserBuilder;
    /**
     * Set the permissions for a user
     */
    setPermissions(permissions: Array<UserPermission>): SubUserBuilder;
    /**
     * Add a permission to a user
     */
    addPermission(permission: UserPermission): SubUserBuilder;
}

interface RawEgg {
    object: 'egg';
    attributes: EggAttributes;
}
interface EggAttributes {
    uuid: string;
    name: string;
}

interface RawEggVariableList {
    object: 'list';
    data: Array<RawEggVariable>;
    meta?: {
        startup_command: string;
        docker_images: {
            [key: string]: string;
        };
        raw_startup_command: string;
    };
}
interface RawEggVariable {
    object: 'egg_variable';
    attributes: EggVariableAttributes;
}
interface EggVariableAttributes {
    readonly name: string;
    readonly description: string;
    readonly env_variable: string;
    readonly default_value: string;
    server_value: string;
    readonly is_editable: boolean;
    readonly rules: string;
}

interface RawServerSubuserList {
    object: 'list';
    data: Array<RawServerSubuser>;
}
interface RawServerSubuser {
    object: 'server_subuser';
    attributes: ServerSubuserAttributes;
}
interface ServerSubuserAttributes {
    readonly uuid: string;
    readonly username: string;
    readonly email: string;
    readonly image: string;
    readonly '2fa_enabled': boolean;
    readonly created_at: string | Date;
    permissions: Array<UserPermission>;
}

interface RawServer {
    object: 'server';
    attributes: ServerAttributes;
}
interface ServerAttributes {
    readonly server_owner: boolean;
    readonly identifier: string;
    readonly internal_id: number | string;
    readonly uuid: string;
    name: string;
    readonly node: string;
    readonly is_node_under_maintenance: boolean;
    readonly sftp_details: {
        readonly ip: string;
        readonly port: 2022 | number;
    };
    description: string;
    readonly limits: {
        readonly memory: number;
        readonly swap: number;
        readonly disk: number;
        readonly io: number;
        readonly cpu: number;
        readonly threads?: null | string;
        readonly oom_disabled: boolean;
    };
    readonly invocation: string;
    docker_image: string;
    readonly egg_features: Array<string>;
    readonly feature_limits: {
        readonly databases: number;
        readonly allocations: number;
        readonly backups: number;
    };
    status: null | ServerStatus;
    readonly is_suspended: boolean;
    readonly is_installing: boolean;
    readonly is_transferring: boolean;
    readonly relationships?: {
        readonly allocations?: RawAllocationList;
        readonly variable?: RawEggVariableList;
        readonly egg?: RawEgg;
        readonly subusers?: RawServerSubuserList;
    };
}

interface StatsAttributes {
    current_state: ServerStatus;
    is_suspended: boolean;
    resources: {
        memory_bytes: number;
        cpu_absolute: number;
        disk_bytes: number;
        network_rx_bytes: number;
        network_tx_bytes: number;
        uptime: number;
    };
}

interface RawBackup {
    object: 'backup';
    attributes: BackupAttributes;
}
interface BackupAttributes {
    readonly uuid: string;
    readonly is_successful: true;
    readonly is_locked: false;
    readonly name: string;
    readonly ignored_files: Array<string>;
    readonly checksum: null | string;
    readonly bytes: number;
    readonly created_at: string | Date;
    readonly completed_at?: string | Date;
}

declare class ApiKeyBuilder {
    description: string;
    allowed_ips: Array<string>;
    constructor();
    /**
     * Add a ip that is allowed to use this api key
     */
    addAllowedIp(ip: string): ApiKeyBuilder;
    /**
     * Set which ip addresses are allowed to use this api key
     */
    setAllowedIps(ips: Array<string>): ApiKeyBuilder;
    /**
     * Set the description of this api key
     */
    setDescription(description: string): ApiKeyBuilder;
}

interface RecoveryTokensAttributes {
    tokens: [string, string, string, string, string, string, string, string, string, string];
}

interface RawUser {
    object: 'user';
    attributes: UserAttributes;
}
interface UserAttributes {
    readonly id: number;
    readonly admin: boolean;
    readonly username: string;
    email: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly language: 'en' | string;
}

interface RawApiKey {
    object: 'api_key';
    attributes: ApiKeyAttributes;
    meta?: {
        secret_token: string;
    };
}
interface ApiKeyAttributes {
    readonly identifier: string;
    readonly description: string;
    readonly allowed_ips: Array<string>;
    readonly last_used_at: string | Date;
    readonly created_at: string | Date;
}

declare class ApiKey implements ApiKeyAttributes {
    readonly identifier: string;
    readonly description: string;
    readonly allowed_ips: Array<string>;
    readonly last_used_at: Date;
    readonly created_at: Date;
    readonly secret?: string;
    constructor(userClient: UserClient, apiKeyProps: RawApiKey);
    /**
     * Delete this api key from this account
     * @throws Unknown api key error
     */
    delete(): Promise<void>;
}

declare class User implements UserAttributes {
    readonly id: number;
    readonly admin: boolean;
    readonly username: string;
    email: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly language: string;
    constructor(userClient: UserClient, userProps: RawUser);
    /**
     * Get the users mfa/2fa credentials to generate the auth codes
     */
    getMfaCredentials(): Promise<{
        image_url_data: string;
        secret: string;
    }>;
    /**
     * Enable the mfa/2fa for this account
     * @param code The 6 digit code generated from the mfs secret (via 'getMfaCredentials()')
     * @param password The account password
     * @throws Invalid code error
     */
    enableMfa(code: number, password: string): Promise<RecoveryTokensAttributes>;
    /**
     * Disable the mfs/2fa for this account
     * @param password The account password
     * @throws Invalid password error
     */
    disableMfa(password: string): Promise<void>;
    /**
     * Update this accounts email address
     * @param email A valid new email address
     * @param password The account password
     * @throws Invalid email and/or password error
     */
    updateEmail(email: string, password: string): Promise<void>;
    /**
     * Updates this accounts password
     * @param oldPassword The old password for this account
     */
    updatePassword(oldPassword: string, newPassword: string, repeatPassword?: string): Promise<void>;
    /**
     * Get the api keys for this account
     */
    getApiKeys(): Promise<Array<ApiKey>>;
    /**
     * Create a new api key for this account
     */
    createApiKey(builder: ApiKeyBuilder): Promise<ApiKey>;
}

declare class UserClient extends BaseClient {
    constructor(options: ClientOptions);
    /**
     * Get the account this api key is assigned to
     */
    getAccount(): Promise<User>;
    /**
     * Get all Servers on this account
     */
    getServers(): Promise<Array<Server>>;
    /**
     * Get a Server on this account
     */
    getServer(id: string): Promise<Server>;
}

declare class Backup implements BackupAttributes {
    readonly uuid: string;
    readonly is_successful: true;
    is_locked: false;
    readonly name: string;
    readonly ignored_files: string[];
    readonly checksum: string | null;
    readonly bytes: number;
    readonly created_at: string | Date;
    readonly completed_at?: string | Date | undefined;
    readonly parentServer: Server;
    constructor(userClient: UserClient, backupProps: RawBackup, parentServer: Server);
    /**
     * Get a one time download url this backup
     */
    downloadUrl(): Promise<URL>;
    /**
     * Download this backup
     */
    downloadStream(): Promise<Buffer>;
    /**
     * Restore this backup
     */
    restore(deleteFiles?: boolean): Promise<void>;
    private lockRequest;
    /**
     * Lock this backup
     */
    lock(): Promise<void>;
    /**
     * Unlock this backup
     */
    unlock(): Promise<void>;
    /**
     * Delete this backup
     */
    delete(): Promise<void>;
}

interface RawDatabasePassword {
    object: 'database_password';
    attributes: DatabasePasswordAttributes;
}
interface DatabasePasswordAttributes {
    password: string;
}

interface RawServerDatabase {
    object: 'server_database';
    attributes: ServerDatabaseAttributes;
}
interface ServerDatabaseAttributes {
    readonly id: string;
    readonly host: {
        readonly address: string;
        readonly port: 3306 | string;
    };
    readonly name: string;
    readonly username: string;
    readonly connections_from: '%' | string;
    readonly max_connections: number;
    readonly relationships?: {
        password?: RawDatabasePassword;
    };
}

declare class Database implements ServerDatabaseAttributes {
    readonly id: string;
    readonly host: {
        readonly address: string;
        readonly port: string | 3306;
    };
    readonly name: string;
    readonly username: string;
    readonly connections_from: string;
    readonly max_connections: number;
    password?: string;
    readonly parentServer: Server;
    constructor(userClient: UserClient, databaseProps: RawServerDatabase, parentServer: Server);
    /**
     * Rotates the password for this database
     * @returns The new generated password or undefined if the user doesn't have the permission to view the password
     */
    rotatePassword(): Promise<string | undefined>;
    /**
     * Deletes this database
     */
    delete(): Promise<void>;
}

interface RawFile {
    object: 'file_object';
    attributes: FileAttributes;
}
type MimeType = 'text/plain; charset=utf-8';
interface FileAttributes {
    name: string;
    readonly mode: string;
    readonly mode_bits: string;
    readonly size: number;
    readonly is_file: boolean;
    readonly is_symlink: boolean;
    mimetype: string | MimeType;
    readonly created_at: string | Date;
    modified_at: string | Date;
}

declare class File implements FileAttributes {
    name: string;
    readonly mode: string;
    readonly mode_bits: string;
    readonly size: number;
    readonly is_file: boolean;
    readonly is_symlink: boolean;
    mimetype: string;
    readonly created_at: Date;
    modified_at: Date;
    readonly parenServer: Server;
    readonly dir: string;
    constructor(userClient: UserClient, fileProps: RawFile, parentServer: Server, dir: string);
    /**
     * Get this files content
     */
    getContent(): Promise<string>;
    /**
     * Get a one time download url this file
     */
    downloadUrl(): Promise<URL>;
    /**
     * Download this file
     */
    downloadStream(): Promise<Buffer>;
    /**
     * Rename this file
     */
    rename(newName: string): Promise<void>;
    /**
     * Copy this file
     * When copied, 'copy' is appended to the file name.
     */
    copy(): Promise<void>;
    /**
     * Write new content to this file
     */
    write(content: string): Promise<string>;
    /**
     * Compress this file
     */
    compress(): Promise<File>;
    /**
     * Decompress this file
     */
    decompress(): Promise<void>;
    /**
     * Delete this file
     */
    delete(): Promise<void>;
}

interface RawScheduleTaskList {
    object: 'list';
    data: Array<RawScheduleTask>;
}
interface RawScheduleTask {
    object: 'schedule_task';
    attributes: ScheduleTaskAttributes;
}
interface ScheduleTaskAttributes {
    readonly id: number;
    readonly sequence_id: number;
    action: ScheduleActionType;
    payload: string | ServerSignalOption;
    time_offset: number;
    readonly is_queued: boolean;
    continue_on_failure: boolean;
    readonly created_at: string | Date;
    updated_at: string | Date;
}
type ScheduleActionType = 'command' | 'power' | 'backup';

declare class ScheduleTaskBuilder {
    action: ScheduleActionType;
    continue_on_failure: boolean;
    payload: string | ServerSignalOption;
    time_offset: number;
    constructor();
    /**
     * Sets the action type for the task.
     * @param action The action type.
     */
    setAction(action: ScheduleActionType): ScheduleTaskBuilder;
    /**
     * Sets whether the task should continue even if it fails.
     * @param continueOnFailure Whether the task should continue even if it fails.
     */
    setContinueOnFailure(continueOnFailure: boolean): ScheduleTaskBuilder;
    /**
     * Sets the payload for the task.
     * --------------------------
     * Depending on the action type the payload is
     * - the command that will be executed
     * - a ServerSignal
     * - a list of ignored files for a backup
     * --------------------------
     * @param payload The payload for the task.
     */
    setPayload(payload: string | ServerSignalOption): ScheduleTaskBuilder;
    /**
     * Sets the time offset for the task.
     * @param timeOffset The time offset for the task.
     */
    setTimeOffset(timeOffset: number): ScheduleTaskBuilder;
}

interface RawServerSchedule {
    object: 'server_schedule';
    attributes: ServerScheduleAttributes;
}
interface ServerScheduleAttributes {
    readonly id: number;
    name: string;
    cron: {
        day_of_week: '*' | string;
        day_of_month: '*' | string;
        month: '*' | string;
        hour: '*' | string;
        minute: '*' | string;
    };
    readonly is_active: boolean;
    readonly is_processing: boolean;
    only_when_online: boolean;
    last_run_at: null | string | Date;
    next_run_at: string | Date;
    readonly created_at: string | Date;
    updated_at: string | Date;
    readonly relationships: {
        readonly tasks: RawScheduleTaskList;
    };
}

declare class ScheduleTask implements ScheduleTaskAttributes {
    readonly id: number;
    readonly sequence_id: number;
    action: ScheduleActionType;
    payload: string | ServerSignalOption;
    time_offset: number;
    readonly is_queued: boolean;
    continue_on_failure: boolean;
    readonly created_at: Date;
    updated_at: Date;
    readonly parentSchedule: Schedule;
    constructor(userClient: UserClient, taskProps: RawScheduleTask, parentSchedule: Schedule);
    private updateProps;
    private updateThis;
    /**
     * Set the action type (and a new payload)
     */
    setAction(action: ScheduleActionType, payload?: string | ServerSignalOption): Promise<void>;
    /**
     * Update the payload of the task
     * @param payload The new payload
     */
    setPayload(payload: string | ServerSignalOption): Promise<void>;
    /**
     * Update the continue_on_failure flag of the task
     * @param continueOnFailure The new continue_on_failure flag
     */
    setContinueOnFailure(continueOnFailure: boolean): Promise<void>;
    /**
     * Update the time_offset of the task
     * @param timeOffset The new time_offset
     */
    setTimeOffset(timeOffset: number): Promise<void>;
    /**
     * Delete this task
     */
    delete(): Promise<void>;
}

declare class Schedule implements ServerScheduleAttributes {
    readonly id: number;
    name: string;
    cron: {
        day_of_week: string;
        day_of_month: string;
        month: string;
        hour: string;
        minute: string;
    };
    is_active: boolean;
    readonly is_processing: boolean;
    only_when_online: boolean;
    last_run_at: string | Date | null;
    next_run_at: string | Date;
    readonly created_at: Date;
    updated_at: Date;
    readonly relationships: {
        readonly tasks: RawScheduleTaskList;
    };
    tasks: Array<ScheduleTask>;
    readonly parentServer: Server;
    constructor(userClient: UserClient, scheduleProps: RawServerSchedule, parentServer: Server);
    private updateProps;
    private updateThis;
    /**
     * Set wether the schedule is active
     */
    setActive(active: boolean): Promise<void>;
    /**
     * Set wether the schedule should only run when the server is online
     */
    setOnlyWhenOnline(onlyWhenOnline: boolean): Promise<void>;
    /**
     * Set the name of the schedule
     */
    setName(name: string): Promise<void>;
    /**
     * Set the minute of the cron schedule
     */
    setMinute(minute: string): Promise<void>;
    /**
     * Set the hour of the cron schedule
     */
    setHour(hour: string): Promise<void>;
    /**
     * Set the day of month of the cron schedule
     */
    setDayOfMonth(dayOfMonth: string): Promise<void>;
    /**
     * Set the month of the cron schedule
     */
    setMonth(month: string): Promise<void>;
    /**
     * Set the day of week of the cron schedule
     */
    setDayOfWeek(dayOfWeek: string): Promise<void>;
    /**
     * Delete this schedule
     */
    delete(): Promise<void>;
    /**
     * Create a task for this schedule
     */
    createTask(task: ScheduleTaskBuilder): Promise<void>;
    /**
     * Executes this schedule
     */
    execute(): Promise<void>;
}

/**
 * Source: https://github.com/pterodactyl/panel/blob/1.0-develop/resources/scripts/components/server/events.ts
 */
declare enum SocketEvent {
    AUTH_SUCCESS = "auth success",
    DAEMON_MESSAGE = "daemon message",
    DAEMON_ERROR = "daemon error",
    INSTALL_OUTPUT = "install output",
    INSTALL_STARTED = "install started",
    INSTALL_COMPLETED = "install completed",
    CONSOLE_OUTPUT = "console output",
    STATUS = "status",
    STATS = "stats",
    TRANSFER_LOGS = "transfer logs",
    TRANSFER_STATUS = "transfer status",
    BACKUP_COMPLETED = "backup completed",
    BACKUP_RESTORE_COMPLETED = "backup restore completed",
    TOKEN_EXPIRING = "token expiring",
    TOKEN_EXPIRED = "token expired"
}
type BackupCompletedJson = {
    checksum: string;
    checksum_type: 'sha1';
    file_size: number;
    is_successful: boolean;
    uuid: string;
};
type PowerState = 'starting' | 'stopping' | 'online' | 'offline';
type StatsWsJson = {
    memory_bytes: number;
    memory_limit_bytes: number;
    cpu_absolute: number;
    network: {
        rx_bytes: number;
        tx_bytes: number;
    };
    state: PowerState;
    disk_bytes: number;
};

declare class ServerConsoleConnection {
    private endpoint;
    private socket?;
    private currentKey?;
    private debugLogging?;
    private eventEmitter;
    private prettyLogs;
    on(eventName: SocketEvent, listener: (arg?: PowerState | string | StatsWsJson | BackupCompletedJson) => void): void;
    private emit;
    constructor(server: Server, userClient: UserClient, prettyLogs: boolean);
    /**
     * Connect to a servers console.
     * You can then listen on the
     * @param debugLogging Debug enabled?
     */
    connect(debugLogging?: boolean): Promise<void>;
    private addListen;
    private setKey;
    private authSocket;
    private listen;
    /**
     * Disconnect from the server.
     */
    disconnect(): void;
    /**
     * Request the stats of this server
     */
    requestStats(): void;
    /**
     * Request the logs of this server
     */
    requestLogs(): void;
    /**
     * Get the stats of this server
     */
    getStats(): Promise<StatsWsJson>;
    /**
     * Get the logs of this server
     */
    getLogs(): Promise<Array<string>>;
    /**
     * Send a power action to this server
     */
    sendPoweraction(action: ServerSignalOption): void;
    /**
     * Send a command to this server
     */
    sendCommand(cmd: string): void;
}

declare class SubUser implements ServerSubuserAttributes {
    readonly uuid: string;
    readonly username: string;
    readonly email: string;
    readonly image: string;
    readonly '2fa_enabled': boolean;
    readonly created_at: Date;
    permissions: Array<UserPermission>;
    readonly parentServer: Server;
    constructor(userClient: UserClient, subuserProps: RawServerSubuser, parentServer: Server);
    /**
     * Updates the permissions of the subuser.
     * @param permissions The permissions to update the subuser with.
     */
    updatePermissions(permissions: Array<UserPermission>): Promise<void>;
    delete(): Promise<void>;
}

declare class Variable implements EggVariableAttributes {
    readonly name: string;
    readonly description: string;
    readonly env_variable: string;
    readonly default_value: string;
    server_value: string;
    readonly is_editable: boolean;
    readonly rules: string;
    readonly parentServer: Server;
    constructor(userClient: UserClient, variableProps: RawEggVariable, parentServer: Server);
    /**
     * Set a new value for this variable
     */
    setValue(value: any): Promise<void>;
}

declare class Server implements ServerAttributes {
    readonly server_owner: boolean;
    readonly identifier: string;
    readonly internal_id: string | number;
    readonly uuid: string;
    name: string;
    readonly node: string;
    readonly is_node_under_maintenance: boolean;
    readonly sftp_details: {
        readonly ip: string;
        readonly port: number;
    };
    description: string;
    readonly limits: {
        readonly memory: number;
        readonly swap: number;
        readonly disk: number;
        readonly io: number;
        readonly cpu: number;
        readonly threads?: string | null;
        readonly oom_disabled: boolean;
    };
    readonly invocation: string;
    docker_image: string;
    readonly egg_features: Array<string>;
    readonly feature_limits: {
        readonly databases: number;
        readonly allocations: number;
        readonly backups: number;
    };
    status: ServerStatus | null;
    readonly is_suspended: boolean;
    readonly is_installing: boolean;
    readonly is_transferring: boolean;
    allocations?: Array<Allocation>;
    variables?: Array<Variable>;
    egg?: RawEgg;
    subusers?: Array<SubUser>;
    constructor(userClient: UserClient, server: RawServer);
    /**
     * Get a console socket and automatically connects to it
     * @param prettyLogs Should the text NOT include color coding. This will make the logs better readable.
     */
    getConsoleSocket(prettyLogs?: boolean): Promise<ServerConsoleConnection>;
    /**
     * Get the server resource usage
     */
    getUsage(): Promise<StatsAttributes>;
    /**
     * Send a console command to this server
     */
    sendCommand(command: string): Promise<void>;
    /**
     * Start this server
     */
    start(): Promise<void>;
    /**
     * Stop this server
     */
    stop(): Promise<void>;
    /**
     * Restart this server
     */
    restart(): Promise<void>;
    /**
     * Kill this server
     * WARNING: This might cause data loss!
     */
    kill(): Promise<void>;
    /**
     * Get the databases of this server
     */
    getDatabases(): Promise<Array<Database>>;
    /**
     * Create a databases for this server
     */
    createDatabases(builder: DatabaseBuilder): Promise<Database>;
    /**
     * Gets the files of a specific directory
     */
    getFiles(dir?: string): Promise<Array<File>>;
    /**
     * Rename files in a specific directory
     */
    renameFiles(dir: string, files: Array<{
        from: string | File;
        to: string;
    }>): Promise<void>;
    /**
     * Compress files in a specific directory
     */
    compressFiles(dir: string, files: Array<string | File>): Promise<File>;
    /**
     * Decompress a archive
     */
    decompressFile(dir: string, file: string | File): Promise<void>;
    /**
     * Delete files in a specific directory
     */
    deleteFiles(dir: string, files: Array<string | File>): Promise<void>;
    /**
     * Create a folder in a specific directory
     */
    createFolder(dir: string, folderName: string): Promise<void>;
    /**
     * Get a upload url to upload files
     */
    uploadUrl(): Promise<URL>;
    /**
     * Upload a file
     * @file A buffer, blob or the path to the file
     */
    uploadFile(dir: string | undefined, file: Blob | Buffer | string, filename: string): Promise<void>;
    /**
     * Get the schedules of this server
     */
    getSchedules(): Promise<Array<Schedule>>;
    /**
     * Get the schedules of this server
     */
    getSchedule(id: number): Promise<Schedule>;
    /**
     * Create a new schedule
     */
    createSchedule(builder: ScheduleBuilder): Promise<Schedule>;
    /**
     * Get all allocation assigned to this server
     */
    getAllocations(): Promise<Array<Allocation>>;
    /**
     * Create a new allocation for this server
     */
    createAllocation(): Promise<Allocation>;
    /**
     * Get all subusers of this server
     */
    getSubusers(): Promise<Array<SubUser>>;
    /**
     * Get a subuser of this server
     */
    getSubuser(uuid: string): Promise<SubUser>;
    /**
     * Create a new subuser
     */
    createSubuser(builder: SubUserBuilder): Promise<SubUser>;
    /**
     * Get all backups of this server
     */
    getBackups(): Promise<Array<Backup>>;
    /**
     * Get a backup of this server
     */
    getBackup(uuid: string): Promise<Backup>;
    /**
     * Create a new backup
     */
    createBackup(builder: BackupBuilder): Promise<Backup>;
    /**
     * Get the variables of this server
     */
    getVariables(): Promise<Array<Variable>>;
    /**
     * Set the docker image for this server
     */
    setDockerImage(image: string): Promise<void>;
    /**
     * Set the name for this server
     */
    setName(name: string): Promise<void>;
    /**
     * Set the description for this server
     */
    setDescription(description: string): Promise<void>;
    /**
     * Reinstall this server
     */
    reinstall(): Promise<void>;
}

declare class Allocation implements AllocationAttributes {
    readonly id: number;
    readonly ip: string;
    readonly ip_alias?: string;
    readonly port: number;
    notes?: string | null;
    is_default: boolean;
    readonly parentServer: Server;
    constructor(userClient: UserClient, allocationProps: RawAllocation, parentServer: Server);
    /**
     * Set the notes of this allocation
     */
    setNotes(notes: string): Promise<void>;
    /**
     * Set the notes of this allocation
     */
    setPrimary(): Promise<void>;
    /**
     * Remove this allocation from this Server
     * To be able to unassign this allocation this CAN NOT be the primary allocation!
     */
    unassign(): Promise<void>;
}

declare function smartConvert(bytes: number, comma?: number): {
    value: number;
    unit: string;
    string: string;
};

export { Allocation, AllocationBuilder, ApiKey, ApiKeyBuilder, ApplicationClient, Backup, BackupBuilder, type BackupCompletedJson, Database, DatabaseBuilder, Egg, File, LocationBuilder, Nest, NodeAllocation, NodeBuilder, PanelLocation, PanelNode, PanelServer, PanelUser, type PowerState, Schedule, ScheduleBuilder, ScheduleTask, ScheduleTaskBuilder, Server, ServerBuilder, ServerConsoleConnection, ServerDatabase, ServerSignal, type ServerSignalOption, type ServerStatus, ServerSubUser, ServerVariable, SocketEvent, type StatsWsJson, SubUser, SubUserBuilder, User, UserBuilder, UserClient, type UserPermission, Variable, smartConvert };
