interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function cookieController() {
  const getCookie = (name: string) => {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
  ) => {
    const processedOptions: Record<string, any> = {
      path: "/",
      ...options,
    };

    if (processedOptions.expires instanceof Date) {
      processedOptions.expires = processedOptions.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in processedOptions) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  };

  const deleteCookie = (
    name: string,
    options?: Pick<CookieOptions, "path" | "domain" | "sameSite">
  ) => {
    setCookie(name, "", {
      ...options,
      maxAge: -1,
    });
  };

  return { getCookie, setCookie, deleteCookie };
}
