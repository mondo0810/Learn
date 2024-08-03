interface IConfigSetting {
  name: string;
  title?: string;
  description?: string;
  keyword?: string;
  email?: string;
  maintenance: number;
  notification?: string;
  event?: string;
  webapi: any;
  banner?: string[];
  copyright?: string;
  version?: string;
}
