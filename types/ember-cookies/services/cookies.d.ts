import Service from '@ember/service';

export default class CookiesService extends Service {
  read(name: string, options?: { raw?: boolean }): any; //reads the cookie with the given name, returns its value as a String; options can be used to set raw (boolean, disables URL-decoding the value).
  write(
    name: string,
    value: any,
    options?: {
      path: string;
      secure: boolean;
      raw: boolean;
    }
  ): void; // writes a cookie with the given name and value; options can be used to set domain, expires (Date), maxAge (time in seconds), path, secure, and raw (boolean, disables URL-encoding the value).
  clear(
    name: string,
    options?: {
      domain: string;
      path: string;
      secure: boolean;
    }
  ): void; // clears the cookie so that future reads do not return a value; options can be used to specify domain, path or secure.
  exists(name: string): boolean; // checks whether a cookie exists at all (even with a falsy value) and returns true if that is the case or false otherwise.
}
