
/**
 * @public
 */
export declare type DIRECTORY = "directory";

/**
 * @public
 */
export declare type FILE = "file";

/**
 * @public
 */
export declare type FILESYSTEM_ERRORS =
  "E_INVALID_ARG" |
  "E_NETWORK" |
  "E_INTERNAL_ERROR" |
  "E_TIMEOUT" |
  "E_LOCKED" |
  "E_NOT_EXISTS" |
  "E_PARENT_DIRECTORY_NOT_EXISTS" |
  "E_ALREADY_EXISTS" |
  "E_ACCESS_DENIED" |
  "E_NOT_EMPTY" |
  "E_NOT_DIRECTORY" |
  "E_IS_DIRECTORY" |
  "E_NO_MORE_SPACE";

/**
 * @public
 */
export declare interface ICharsetOptions {
  charset?: string;
}

/**
 * @public
 */
export declare interface IDeepOptions {
  deep?: boolean;
}

/**
 * @public
 */
export declare interface IDirectory extends IItemBase<DIRECTORY> {
  readonly parent: IDirectory | null;

  mkdir(): IRequest<void>;
  list(options?: IListNormalOptions): IRequest<IListEntry[]>;
  list(options: IListDeepOptions): IRequest<Array<IFile & IStatsItem>>;

  newDirectory(relativePath: string): IDirectory;
  newFile(relativePath: string): IFile;
}

/**
 * @public
 */
export declare interface IFile extends IItemBase<FILE> {
  readonly parent: IDirectory;

  write(data: ArrayBuffer | Blob | Document, options: IOverwriteOptions): IRequest<void>;
  write(data: string | object, options: IWriteJsonOptions): IRequest<void>;

  read(options: IReadArrayBufferOptions): IRequest<ArrayBuffer>;
  read(options: IReadBlobOptions): IRequest<Blob>;
  read(options: IReadDocumentOptions): IRequest<Document>;
  read(options: IReadJsonOptions): IRequest<object>;
  read(options: IReadTextOptions): IRequest<string>;
}

/**
 * @public
 */
export declare type IItem = IFile | IDirectory;

/**
 * @public
 */
export declare interface IItemBase<T extends DIRECTORY | FILE> {
  readonly type: T;
  readonly label: string; // Bracket path in PlugnCast.
  readonly name: string;
  readonly path: string;
  readonly uri: string;
  move(dest: IDirectory, name: string, options: IOverwriteOptions): IRequest<IItem>;
  copy(dest: IDirectory, name: string, options: IOverwriteOptions): IRequest<IItem>;
  copy(dest: IDirectory, options: IOverwriteOptions): IRequest<IItem>;
  unlink(options: IDeepOptions): IRequest<void>;
  stat(): IRequest<IStats>;
}

/**
 * @public
 */
export declare interface IListDeepOptions extends IListOptions {
  deep: true;
}

/**
 * @public
 */
export declare type IListEntry = (IDirectory | IFile) & IStatsItem;

/**
 * @public
 */
export declare interface IListNormalOptions extends IListOptions {
  deep: false;
}

/**
 * @public
 */
export declare interface IListOptions {
  deep?: boolean;
}

/**
 * @public
 */
export declare interface IOverwriteOptions {
  overwrite?: boolean;
}

/**
 * @public
 */
export declare interface IReadArrayBufferOptions extends IReadOptions {
  responseType: "arraybuffer";
}

/**
 * @public
 */
export declare interface IReadBlobOptions extends IReadOptions {
  responseType: "blob";
}

/**
 * @public
 */
export declare interface IReadDocumentOptions extends IReadOptions, ICharsetOptions {
  responseType: "document";
}

/**
 * @public
 */
export declare interface IReadJsonOptions extends IReadOptions, ICharsetOptions {
  responseType: "json";
}

/**
 * @public
 */
export declare interface IReadOptions {
  responseType: "arraybuffer" | "blob" | "text" | "document" | "json";
}

/**
 * @public
 */
export declare interface IReadTextOptions extends IReadOptions, ICharsetOptions {
  responseType: "text";
}

/**
 * @public
 */
export declare interface IRequest<T> {
  execute(): Promise<T>;
  cancel(): boolean;
  addListener(name: ListenerName, listener: Listener): void;
  removeListener(name: ListenerName): void;
  removeListeners(): void;
}

/**
 * @public
 */
export declare interface IStats {
  readonly id: string;
  readonly contentLength?: number;
  readonly contentType?: string;
  readonly lastModified?: Date;
  readonly etag?: string;
  readonly owner?: string;
  readonly hiddenResources?: boolean;
}

/**
 * @public
 */
export declare interface IStatsItem {
  readonly stats?: IStats;
}

/**
 * @public
 */
export declare interface IWriteJsonOptions extends IOverwriteOptions, ICharsetOptions {
}

/**
 * @public
 */
export declare interface IWriteTextOptions extends IOverwriteOptions, ICharsetOptions {
}

/**
 * @public
 */
export declare type Listener = (...args: any[]) => void;

/**
 * @public
 */
export declare type ListenerName = "progress";

/**
 * Get the root of the filesystem
 * @returns the root directory of the filesystem
 * @public
 */
export declare function root(): IDirectory;

export { }
