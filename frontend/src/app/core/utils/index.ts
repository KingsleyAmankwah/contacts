export const cookie = {
  set: ({
    name,
    value,
    days,
  }: {
    name: string;
    value: string;
    days: number;
  }): void => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = '; expires=' + expireDate.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
  },

  get: (name: string): string | null => {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  },

  remove: (name: string): void => {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
};
